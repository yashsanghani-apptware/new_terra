"use client";
import React, { useState } from "react";
import { User, Lock } from "react-feather";
import { Col, Container, Row } from "reactstrap";
import Link from "next/link";
import Breadcrumb from "@/layout/Breadcrumb/Breadcrumb";
import FooterThree from "@/layout/footers/FooterThree";
import { login, verifyOtp } from "@/utils/postData"; // Replace with appropriate API calls
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { TextField, Button, IconButton, InputAdornment } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { socialLogin } from "@/utils/getData";
import { useTranslation } from "react-i18next";
import NavbarThree from "@/layout/headers/NavbarThree";
import { Logo4 } from "@/components/elements/Logo";

const Login = () => {
  const { t } = useTranslation("common");

  const [activeTab, setActiveTab] = useState(0); // 0 = Login with Password, 1 = Login with OTP
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [otpError, setOtpError] = useState("");
  const router = useRouter();
  const dispatch = useDispatch();

  const validateForm = () => {
    if (activeTab === 0) {
      let valid = true;

      if (username.trim().length < 3) {
        setUsernameError(t("EMAIL_MIN_LIMIT"));
        valid = false;
      } else {
        setUsernameError("");
      }

      if (password.trim().length < 8) {
        setPasswordError(t("PASSWORD_MIN_LIMIT"));
        valid = false;
      } else {
        setPasswordError("");
      }

      return valid;
    } else {
      if (!otp.trim()) {
        setOtpError(t("OTP_REQUIRED"));
        return false;
      }
      setOtpError("");
      return true;
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      if (activeTab === 0) {
        // Login with password
        const loginData = { username, password };
        try {
          const response = await login(loginData);
          if (response.status === 200) {
            handleSuccess(response);
          } else {
            toast.error(response.data.message);
          }
        } catch (error) {
          console.error("Error during login:", error);
          toast.error(t("LOGIN_FAILED"));
        }
      }
      // LOGIN WITH OTP FUNCTIONALITY DISABLED FOR NOW
      // else {
      //   // Login with OTP
      //   try {
      //     const response = await verifyOtp({ email: username, otp });
      //     if (response.status === 200) {
      //       handleSuccess(response);
      //     } else {
      //       toast.error(t("OTP_INVALID"));
      //     }
      //   } catch (error) {
      //     console.error("Error during OTP login:", error);
      //     toast.error("Login failed. Please try again.");
      //   }
      // }
    }
  };

  const handleSuccess = (response) => {
    localStorage.setItem("token", response.data.token);
    localStorage.setItem(
      "userDetails",
      JSON.stringify(response.data.user_details)
    );
    dispatch({ type: "setToken", payload: response.data.token });
    toast.success(t("LOGGED_IN_SUCCESS"));
    router.push("/listings");
  };

  const handleSocialLogin = async (loginFrom) => {
    try {
      const response = await socialLogin(loginFrom);
      window.location.href = response.data.url;
    } catch (error) {}
  };
  const handleClickShowPassword = () => setShowPassword(!showPassword);

  // WE CAN ENABLE THIS IF WE WANT TO INTEGRATE THE LOIN WITH OTP FEATURE
  // const handleTabChange = (event, newValue) => {
  //   setActiveTab(newValue);
  //   setUsername("");
  //   setPassword("");
  //   setOtp("");
  //   setOtpSent(false);
  //   setUsernameError("");
  //   setPasswordError("");
  //   setOtpError("");
  // };

  // WE CAN ENABLE THIS IF WE WANT TO INTEGRATE THE LOIN WITH OTP FEATURE
  // const handleSendOtp = async () => {
  //   if (!username.trim()) {
  //     setUsernameError("Email is required");
  //     return;
  //   }
  //   setOtpSent(true);

  //   setUsernameError("");
  //   try {
  //     const response = await requestOtp({ email: username });
  //     if (response.status === 200) {
  //       setOtpSent(true);
  //       toast.success("OTP sent successfully!");
  //     } else {
  //       toast.error(response.data.message);
  //     }
  //   } catch (error) {
  //     console.error("Error sending OTP:", error);
  //     toast.error("Failed to send OTP. Please try again.");
  //   }
  // };

  return (
    <>
      <NavbarThree logo={<Logo4 />} landingPage={true} />
      <Breadcrumb />
      <section className="login-wrap">
        <Container>
          <Row className=" log-in">
            <Col xl="5" lg="6" md="8" sm="10">
              <div className="theme-card">
                <div className="">
                  <h2>{t("LOGIN")}</h2>
                </div>
                {/* THIS WE CAN USE IF WE WANT TO SHOW LOGIN WITH PASSWORD AND OTP */}
                {/* <Tabs value={activeTab} onChange={handleTabChange} centered>
                  <Tab label="Login with Password" />
                  <Tab label="Login with OTP" />
                </Tabs> */}
                <form onSubmit={handleLogin} style={{ marginTop: "2em" }}>
                  {/* {activeTab === 0 && ( */}
                  <>
                    <TextField
                      fullWidth
                      required
                      variant="standard"
                      label={t("EMAIL")}
                      placeholder={t("ENTER_EMAIL")}
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      error={Boolean(usernameError)}
                      helperText={usernameError}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <User />
                          </InputAdornment>
                        ),
                      }}
                      sx={{ mb: 3 }}
                    />
                    <TextField
                      fullWidth
                      required
                      variant="standard"
                      type={showPassword ? "text" : "password"}
                      label={t("PASSWORD")}
                      placeholder={t("ENTER_PASSWORD")}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      error={Boolean(passwordError)}
                      helperText={passwordError}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <Lock />
                          </InputAdornment>
                        ),
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton
                              onClick={handleClickShowPassword}
                              edge="end"
                            >
                              {showPassword ? (
                                <VisibilityOff />
                              ) : (
                                <Visibility />
                              )}
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                      sx={{ mb: 3 }}
                    />
                  </>
                  {/* )} */}

                  {/* THIS WE CAN USE IF WE WANT TO SHOW LOGIN OTP */}
                  {/* {activeTab === 1 && (
                    <>
                      <TextField
                        fullWidth
                        required
                        variant="standard"
                        label="Email"
                        placeholder="Enter Email"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        error={Boolean(usernameError)}
                        helperText={usernameError}
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <User />
                            </InputAdornment>
                          ),
                        }}
                        sx={{ mb: 3 }}
                      />
                      {otpSent && (
                        <TextField
                          fullWidth
                          required
                          variant="standard"
                          label="OTP"
                          placeholder="Enter OTP"
                          value={otp}
                          onChange={(e) => setOtp(e.target.value)}
                          error={Boolean(otpError)}
                          helperText={otpError}
                          sx={{ mb: 3 }}
                        />
                      )}
                      {!otpSent && (
                        <Button
                          fullWidth
                          variant="contained"
                          color="primary"
                          onClick={handleSendOtp}
                          sx={{ mb: 3 }}
                        >
                          Send OTP
                        </Button>
                      )}
                    </>
                  )} */}

                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                  >
                    {activeTab === 0 ? t("LOGIN") : t("VERIFY_OTP")}
                  </Button>
                </form>

                {/* Social Login Buttons */}
                <div className="social-login">
                  <h5 style={{ textAlign: "center", margin: "1em 0" }}>OR</h5>
                  <Button
                    fullWidth
                    variant="outlined"
                    color="primary"
                    sx={{ mb: 2 }}
                    onClick={() => handleSocialLogin("google")}
                    startIcon={
                      <img
                        src="/assets/images/icon/google.png"
                        alt="Google"
                        style={{ width: 20, height: 20 }}
                      />
                    }
                  >
                    {t("LOGIN_WITH_GOOGLE")}
                  </Button>
                  <Button
                    fullWidth
                    variant="outlined"
                    color="secondary"
                    onClick={() => handleSocialLogin("microsoft")}
                    startIcon={
                      <img
                        src="/assets/images/icon/microsoft.png"
                        alt="Microsoft"
                        style={{ width: 20, height: 20 }}
                      />
                    }
                  >
                    {t("LOGIN_WITH_MICROSOFT")}
                  </Button>
                </div>

                <div className="d-flex justify-content-between mt-3">
                  <Link href="/auth/forgot-password">
                    {t("FOROGOT_PASSWORD")}
                  </Link>
                  <Link href="/auth/signup">{t("CREATE_ACCOUNT")}</Link>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
      <FooterThree />
    </>
  );
};

export default Login;
