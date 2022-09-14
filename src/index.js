require("file-loader?name=[name].[ext]!./index.html");
import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import store from "./store";
import App from "./App";
import { USER_SESSION } from "./constants";

// if (USER_SESSION) {
//   ReactDOM.render(
//     <Provider store={store}>
//       <App />
//     </Provider>,
//     document.getElementById("app")
//   );
// } else {
//   window.location.href = "http://103.90.86.151:100/";
// }

sessionStorage.setItem(
  "blueberrytoken",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiJhMDI0N2Y3OS1jODhjLTQ0NjgtYTY0NC0yYzcwZGRhMTYwNjQiLCJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1lIjoiMTUyMDQiLCJJRFVzZXIiOiIxNTIwNCIsIklEUm9sZSI6IjIiLCJNYXJrQXNBZG1pbiI6IlRydWUiLCJJREhSQnJhbmNoIjoiMSIsIklERGVwYXJ0bWVudCI6IjEiLCJjb21wYW55IjoiMTMiLCJJc1RlbXBvcmFyeVNlc3Npb25FbmFibGVkIjoiRmFsc2UiLCJJc05ld2x5QWRlZCI6IkZhbHNlIiwiSXNEZXBhcnRtZW50SGVhZCI6IkZhbHNlIiwiUmVtZW1iZXJNZSI6IkZhbHNlIiwiRnVsbE5hbWUiOiJCaXJhdCAgU2Nob29sIiwicGlkUmVmRm9yRWRpdCI6ImJpcmF0QGFkbWluIiwiZXhwIjoxNjYzOTk5NzUzLCJpc3MiOiJodHRwOi8vbXlzaXRlLmNvbSIsImF1ZCI6Imh0dHA6Ly9teXNpdGUuY29tIn0.zAwwWUDHMpAWTNL49ouOiSHc2IZNZpcrpegRvEu17qw"
);
sessionStorage.setItem(
  "blueberryrefreshtoken",
  "5qN8MQsl+JJvxiV6glR4/Sz4ZPDIdTK+i9Zy/TRVRM4="
);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("app")
);
