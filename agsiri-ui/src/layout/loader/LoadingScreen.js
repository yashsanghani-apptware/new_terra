import { Box, CircularProgress } from "@mui/material";
import React from "react";

const LoadingScreen = () => {
  return (
    <div className="loader-wrapper">
      <div className="row loader-text">
        <div className="col-12">
          <img src="/assets/images/loader/loader.gif" className="img-fluid" alt="" />
        </div>
        <div className="col-12">
          <div>
            <h3 className="mb-0">Please wait Real estate Template loading...</h3>
          </div>
        </div>
      </div>
    </div>
  );
};

const LoadingScreen2 = () => {
  return (
    <div className="loader-wrapper img-gif">
      <img src="/assets/images/loader/loader-4.gif" className="img-fluid" alt="" />
    </div>
  );
};

const LoadingScreen3 = () => {
  return (
    <div className="loader-wrapper">
      <div className="row loader-img">
        <div className="col-12">
          <img src="/assets/images/loader/loader-2.gif" className="img-fluid" alt="" />
        </div>
      </div>
    </div>
  );
};

const LoadingScreen4 = () => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "300px",
      }}
    >
      <CircularProgress />
    </Box>
  );
}
export { LoadingScreen, LoadingScreen2, LoadingScreen3, LoadingScreen4 };
