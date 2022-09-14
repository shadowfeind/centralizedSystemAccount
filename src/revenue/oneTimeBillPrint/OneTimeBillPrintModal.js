import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, DialogContent, Grid } from "@material-ui/core";
import { useReactToPrint } from "react-to-print";
import OneTimeBillPrintDesign from "./OneTimeBillPrintDesign";
import { GET_HEADER_BANNER_RESET } from "../../dashboard/DashboardConstants";
import Notification from "../../components/Notification";
import { getHeaderBannerAction } from "../../dashboard/DashboardActions";
import DialogFooter from "../../components/controls/DialogFooter";

const OneTimeBillPrintModal = ({
  printOneTimeBill,
  date,
  classDdl,
  classId,
  ddlAcaYear,
  acaYear,
  monthDdl,
  monthId,
  setOpenPopup,
}) => {
  const [notify, setNotify] = useState({
    isOpen: false,
    message: "",
    type: "",
  });
  const dispatch = useDispatch();
  const { headerBanners, error: headerBannersError } = useSelector(
    (state) => state.getHeaderBanner
  );

  useEffect(() => {
    if (!headerBanners) {
      dispatch(getHeaderBannerAction());
    }
  }, [headerBanners, dispatch]);

  if (headerBannersError) {
    dispatch({ type: GET_HEADER_BANNER_RESET });
    setNotify({
      isOpen: true,
      message: headerBannersError,
      type: "error",
    });
  }
  const componentRef = useRef();
  const printPdf = useReactToPrint({
    content: () => componentRef.current,
  });

  const year = ddlAcaYear?.filter((x) => x.Key === acaYear);
  const level = classDdl?.filter((x) => x.Key === classId);
  const month = monthDdl?.filter((x) => x.Key === monthId);

  return (
    <>
    <DialogContent>
    <div ref={componentRef}>
        <div style={{ margin: "10px" }}>
          <Grid container>
            {printOneTimeBill?.dbModelLstForAdmissionRegistrationForOneTime?.map(
              (student, i) => {
                let currentStudentBill =
                  printOneTimeBill?.dbModelLstForOneTimeBill?.filter(
                    (x) =>
                      x.RegistrationKey == student.RegistrationKey &&
                      x.IDMonth == printOneTimeBill.IDMonth
                  );

                return (
                  <Grid item xs={6}>
                    <OneTimeBillPrintDesign
                      currentStudentBill={currentStudentBill}
                      year={year}
                      level={level}
                      month={month}
                      date={printOneTimeBill?.Datetime}
                      headerBanners={headerBanners}
                      voucherBillNo={printOneTimeBill?.voucherBillNo + i}
                      student={student}
                    />
                  </Grid>
                );
              }
            )}
          </Grid>
        </div>
      </div>
      

    </DialogContent>
    <DialogFooter>
    
        <Button
          onClick={() => setOpenPopup(false)}
          className="print-button-hide"
          variant="contained"
          color="primary"
          style={{ marginRight: "16px" }}
        >
          CANCEL
        </Button>
        <Button
          onClick={printPdf}
          className="print-button-hide"
          variant="contained"
          color="primary"
        >
          PRINT
        </Button>
      
    </DialogFooter>
      
      <Notification notify={notify} setNotify={setNotify} />
    </>
  );
};

export default OneTimeBillPrintModal;
