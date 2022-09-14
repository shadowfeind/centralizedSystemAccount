import React, { useState, useEffect } from "react";
import { Button, DialogContent, Grid } from "@material-ui/core";
import InputControl from "../../components/controls/InputControl";
import { useForm, Form } from "../../customHooks/useForm";
import { useDispatch } from "react-redux";
import { putMonthlyFeeLinkAction } from "./MonthlyFeeLinkActions";
import { symbolsArr } from "../../helpers/excludeSymbol";
import DialogFooter from "../../components/controls/DialogFooter";

const initialFormValues = {
  IDAdmissionFacultyFeeStructure: 0,
  IDAdmissionFeeStructure: 0,
  IDYearFacultyLink: 0,
  FeeAmount: 0,
  IDHRCompany: 0,
  IdAccountGroup: 0,
  AccountName: "",
  IDAcademicYear: 0,
  Level: 0,
  IDAccountType: 0,
  IsActive: true,
  Created_On: "2022-06-03T04:41:16.702Z",
  Updated_On: "2022-06-03T04:41:16.702Z",
};

const MonthlyFeeLinkEditForm = ({ editForm, setOpenPopup }) => {
  const dispatch = useDispatch();
  const [activeButton, setActiveButton] = useState(false);
  const validate = (fieldValues = values) => {
    let temp = { ...errors };
    temp.FeeAmount = !fieldValues.FeeAmount ? "This Field is Required" : "";

    setErrors({ ...temp });
    return Object.values(temp).every((x) => x === "");
  };

  const { values, setValues, handleInputChange, errors, setErrors } =
    useForm(initialFormValues);
  const handleSubmit = (e) => {
    e.preventDefault();

    if (validate()) {
      setActiveButton(true);
      dispatch(putMonthlyFeeLinkAction(values));
    }
  };

  const test = [{ Key: "", Value: "" }];

  useEffect(() => {
    if (editForm) {
      setValues({ ...editForm?.dbModel });
    }
  }, [editForm]);
  return (
    <>
    <DialogContent>
    <Form onSubmit={handleSubmit}>
      <Grid container style={{ fontSize: "12px" }}>
        <Grid item xs={6}>
          {" "}
          <InputControl
            disabled
            name="AccountName"
            label="Account Name*"
            value={values.AccountName}
            onChange={handleInputChange}
            errors={errors.AccountName}
          />
          <InputControl
            name="FeeAmount"
            label="FeeAmount*"
            onWheelCapture={(e) => {
              e.target.blur();
            }}
            onKeyDown={(e) => symbolsArr.includes(e.key) && e.preventDefault()}
            type="number"
            value={values.FeeAmount}
            onChange={handleInputChange}
            errors={errors.FeeAmount}
          />
        </Grid>
      </Grid>
      
    </Form>

    </DialogContent>
    <DialogFooter>
    
        <Button
          variant="contained"
          color="secondary"
          onClick={() => setOpenPopup(false)}
          style={{ margin: "10px 0 0 10px" }}
        >
          CANCEL
        </Button>
        <Button
          variant="contained"
          color="primary"
          type="submit"
          disabled={activeButton}
          onClick={handleSubmit}
          style={{ margin: "10px 0 0 10px" }}
        >
          {activeButton ? "...PROCESSING" : "SUBMIT"}
        </Button>
      
    </DialogFooter>
    </>
    
  );
};

export default MonthlyFeeLinkEditForm;
