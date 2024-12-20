"use client";
import React, { useEffect, useState } from "react";
import { Container, Row, Col } from "reactstrap";
import Breadcrumb from "@/layout/Breadcrumb/Breadcrumb";
import FooterThree from "@/layout/footers/FooterThree";
import { useRouter } from "next/navigation";
import { createData, signIn, updateData } from "@/utils/postData";
import { toast } from "react-toastify";
import {
  TextField,
  Button,
  Checkbox,
  FormControlLabel,
  Box,
  Typography,
  InputAdornment,
  IconButton,
} from "@mui/material";
import Link from "next/link";
import { accreditationStatusvalues } from "@/constValues/constValues";
import { BASE_URL } from "@/config/apiBaseUrls";
import { validateEmail, validatePassword } from "@/utils/validations/validate";
import Accreditation from "./accreditation";
import { useTranslation } from "react-i18next";
import EmailInput from "@/utils/inputFields/EmailInput";
import { Lock } from "react-feather";
import { Visibility, VisibilityOff } from "@mui/icons-material";

const SignUp = () => {
  const { t } = useTranslation("common");

  const router = useRouter();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [agreed, setAgreed] = useState(false);
  const [accreditationStatusVisible, setAccreditationStatusVisible] =
    useState(false);
  const [passwordScreen, setPasswordScreen] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState();
  const [password, setPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [phoneError, setPhoneError] = useState(false);
  const [otpSection, setOtpSection] = useState(false);
  const [otp, setOtp] = useState("");
  const [isResendDisabled, setIsResendDisabled] = useState(true);
  const [timer, setTimer] = useState(60);
  const [passwordError, setPasswordError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  useEffect(() => {
    if (otpSection && timer > 0) {
      const countdown = setTimeout(() => {
        setTimer((prev) => prev - 1);
      }, 1000);

      return () => clearTimeout(countdown); // Cleanup timer
    } else {
      setIsResendDisabled(false);
    }
  }, [timer, otpSection]);
  const handleSignup = async () => {
    // Handle form submission logic
    const signInDetails = {
      firstName: firstName,
      lastName: lastName,
      familyName: lastName,
      email: email,
      telephone: phoneNumber,
      username: email,
      password: password,
      isEmailVerified: true,
      address: {
        streetAddress: "",
        addressLocality: "",
        addressRegion: "",
        postalCode: "",
        addressCountry: "",
      },
      contactPoint: {
        telephone: "+12365451285",
        contactType: "Default Contact type",
        email: "default@email.com",
      },
      organization: "60b5ed9b9c25d532dc4a6f35",
      attr: {
        department: "ADMIN",
      },
      isAccredited:
        selectedOptions && selectedOptions === "none" ? true : false,
      accreditationList: [selectedOptions],
    };
    if (passwordError || phoneError) {
      toast.error(t("SET_PASSWORD_AND_PHONE"));
      return;
    }
    try {
      const response = await signIn(signInDetails);
      if (response.status === 201) {
        toast.success("Signup successful");
        router.push("/auth/login");
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(t("SIGNUP_ERROR"));
    }
  };

  const handleContinue = (type = "skip") => {
    if (type === "skip") {
      setSelectedOptions();
    }
    if (type === "continue" && !selectedOptions) {
      toast.error(t("SELECT_ACCR_EDIT"));
      return;
    }
    setPasswordScreen(true);
    setAccreditationStatusVisible(false);
  };

  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setPassword(value);

    if (!validatePassword(value)) {
      setPasswordError(t("PASSWORD_VALIDATION"));
    } else {
      setPasswordError(""); // Clear the error if valid
    }
  };
  const handleOTPSection = async (e) => {
    e.preventDefault();
    setIsResendDisabled(true);

    // Validate form values
    if (!firstName || !lastName || !email || !agreed) {
      toast.error(t("COMPLETE_ALL_REQUIRED_FIELDS"));
      return;
    }
    if (emailError) {
      toast.error(t("INVALID_EMAIL_FORMAT"));
      return;
    }
    const response = await createData(
      { email: email },
      `${BASE_URL.POLICY}/users/email/verify/otp`
    );
    if (response.status == 200 || response.status == 201) {
      toast.success(t("EMAIL_OTP_SENT_SUCCESS"));
      setOtpSection(true);
    } else {
      toast.error(response.data.message);
    }
  };
  const handleAccreditationStatus = async (e) => {
    e.preventDefault();

    // Validate form values
    if (!otp) {
      toast.error(t("OTP_VERIFIED_SUCCESSFULLY"));
      return;
    }
    const response = await updateData(
      { email: email, otp: otp },
      `${BASE_URL.POLICY}/users/email/verify/otp`
    );
    if (response.status == 200 || response.status == 201) {
      toast.success(t("OTP_VERIFIED_SUCCESSFULLY"));
      setOtpSection(false);
      setAccreditationStatusVisible(true);
    } else {
      toast.error(response.data.message);
    }
  };

  const handleResendOtp = async (e) => {
    e.preventDefault();
    const response = await createData(
      { email: email },
      `${BASE_URL.POLICY}/users/email/verify/otp`
    );
    if (response.status == 200 || response.status == 201) {
      toast.success(t("EMAIL_OTP_SENT_SUCCESS"));
    } else {
      toast.error(response.data.message);
    }
  };
  const handlePhoneNumberChange = (e) => {
    const input = e.target.value;
    setPhoneNumber(input);
    // Regex to check if input contains only numbers, spaces, dashes, and optional leading +
    const phonePattern = /^[+]?[\d\s-]+$/;
    // Set error if the input doesn't match the pattern
    setPhoneError(!phonePattern.test(input));
  };
  const handleEmailBlur = () => {
    if (!validateEmail(email)) {
      setEmailError("Invalid email format");
    } else {
      setEmailError("");
    }
  };
  const handleClickShowPassword = () => setShowPassword(!showPassword);

  return (
    <>
      {otpSection ? (
        <div className="signup-form" style={{ display: "flex" }}>
          <Breadcrumb customStyle={true} showPath={true} />
          <section
            style={{
              width: "50%",
              padding: "4em 0",
            }}
          >
            <Container style={{ padding: "4em 0", maxWidth: "600px" }}>
              <Box sx={{ textAlign: "center", mb: 4 }}>
                <Typography
                  variant="h4"
                  sx={{
                    fontWeight: "bold",
                    mb: 1,
                    color: "#333",
                  }}
                >
                  {t("VERIFY_OTP")}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    color: "#666",
                  }}
                >
                  {t("VERIFY_OTP_INFO")}
                </Typography>
              </Box>

              <Box component="form" sx={{ mt: 2 }}>
                <TextField
                  fullWidth
                  required
                  label={t("OTP")}
                  placeholder={t("ENTER_OTP")}
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  sx={{
                    mb: 3,
                  }}
                  variant="standard"
                />

                <Button
                  fullWidth
                  variant="contained"
                  color="primary"
                  sx={{
                    mt: 1,
                    textTransform: "capitalize",
                    height: "48px",
                    fontSize: "16px",
                    backgroundColor: "#007BFF",
                    ":hover": { backgroundColor: "#0056b3" },
                  }}
                  onClick={handleAccreditationStatus}
                >
                  {t("VERIFY")}
                </Button>

                <Button
                  fullWidth
                  variant="outlined"
                  color="primary"
                  sx={{
                    mt: 2,
                    textTransform: "capitalize",
                    height: "48px",
                    fontSize: "16px",
                    borderColor: "#007BFF",
                    color: isResendDisabled ? "#999" : "#007BFF",
                    ":hover": isResendDisabled
                      ? {}
                      : { borderColor: "#0056b3", backgroundColor: "#e7f0ff" },
                  }}
                  onClick={handleResendOtp}
                  disabled={isResendDisabled}
                >
                  {isResendDisabled
                    ? t("RESEND_OTP_TIMER", { timer })
                    : t("RESEND_OTP")}
                </Button>
              </Box>

              <Box
                sx={{
                  textAlign: "center",
                  mt: 4,
                  color: "#999",
                }}
              >
                <Typography
                  variant="caption"
                  sx={{
                    fontSize: "12px",
                  }}
                >
                  {t("DATA_PROTECTION_NOTE")}
                </Typography>
              </Box>
            </Container>
          </section>
        </div>
      ) : accreditationStatusVisible ? (
        <Accreditation
          selectedOptions={selectedOptions}
          setSelectedOptions={setSelectedOptions}
          handleContinue={handleContinue}
        />
      ) : passwordScreen ? (
        <div className="signup-form" style={{ display: "flex" }}>
          <Breadcrumb customStyle={true} showPath={true} />
          <section style={{ width: "50%", padding: "4em 0" }}>
            <Container style={{ padding: "4em 0", maxWidth: "600px" }}>
              <Box sx={{ textAlign: "center", mb: 4 }}>
                <Typography variant="h4" sx={{ fontWeight: "bold", mb: 2 }}>
                  {t("COMPLETE_YOUR_ACCOUNT")}
                </Typography>
              </Box>

              <Box component="form" sx={{ mt: 1 }}>
                <TextField
                  fullWidth
                  required
                  variant="standard"
                  type={showPassword ? "text" : "password"}
                  label={t("PASSWORD")}
                  placeholder={t("PASSWORD_PLACEHOLDER")}
                  value={password}
                  onChange={handlePasswordChange}
                  sx={{ mb: 3 }}
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
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />

                <TextField
                  fullWidth
                  required
                  label={t("PHONE_NUMBER")}
                  type="tel"
                  placeholder={t("ENTER_PHONE_NUMBER")}
                  value={phoneNumber}
                  onChange={handlePhoneNumberChange}
                  error={phoneError}
                  helperText={phoneError ? t("INVALID_PHONE_NUMBER") : ""}
                  sx={{ mb: 3 }}
                  variant="standard"
                />

                {/* <FormControlLabel
                  control={
                    <Switch
                      checked={twoFactorAuth}
                      onChange={() => setTwoFactorAuth(!twoFactorAuth)}
                      color="primary"
                    />
                  }
                  label="Turn on two-factor authentication"
                  labelPlacement="end"
                /> */}

                <Button
                  fullWidth
                  variant="contained"
                  color="primary"
                  sx={{ mt: 3 }}
                  onClick={handleSignup}
                >
                  {t("SIGN_UP")}
                </Button>
              </Box>

              <Box sx={{ textAlign: "center", mt: 2 }}>
                <Typography variant="caption">
                  {t("DATA_PROTECTION_NOTE")}
                </Typography>
              </Box>
            </Container>
          </section>
        </div>
      ) : (
        <div className="signup-form" style={{ display: "flex" }}>
          <Breadcrumb customStyle={true} showPath={true} />
          <section style={{ width: "50%", padding: "4em 0" }}>
            <Container style={{ maxWidth: "100%" }}>
              <Row className="log-in sign-up">
                <Col xl="6" lg="8" md="10" sm="12">
                  <div className="theme-card">
                    <div className="title-3 text-start">
                      <h2>{t("SIGN_UP")}</h2>
                    </div>
                    <form>
                      <div className="form-group">
                        <TextField
                          required
                          fullWidth
                          id="first-name"
                          label={t("FIRST_NAME")}
                          value={firstName}
                          onChange={(e) => setFirstName(e.target.value)}
                          variant="standard"
                          margin="normal"
                        />
                      </div>
                      <div className="form-group">
                        <TextField
                          required
                          fullWidth
                          id="last-name"
                          label={t("LAST_NAME")}
                          value={lastName}
                          onChange={(e) => setLastName(e.target.value)}
                          variant="standard"
                          margin="normal"
                        />
                      </div>
                      <div className="form-group">
                        <EmailInput
                          label={t("EMAIL_ADDRESS")}
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          onBlur={handleEmailBlur}
                          emailError={emailError}
                          required={true}
                        />
                      </div>
                      <div className="form-group">
                        <FormControlLabel
                          control={
                            <Checkbox
                              checked={agreed}
                              onChange={(e) => setAgreed(e.target.checked)}
                              name="terms"
                            />
                          }
                          label={
                            <>
                              I agree to Agsiri's <a href="#">Terms of Use</a>{" "}
                              and <a href="#">Privacy Policy</a>. I also agree
                              to Agsiri's <a href="#">Terms of Service</a> and{" "}
                              <a href="#">Privacy Policy</a>.
                            </>
                          }
                        />
                      </div>
                      <Button
                        variant="contained"
                        color="primary"
                        fullWidth
                        sx={{
                          backgroundColor: "#0070f3",
                          "&:hover": { backgroundColor: "#005bb5" },
                          mb: 2,
                        }}
                        onClick={handleOTPSection}
                      >
                        {t("VERIFY_EMAIL")}
                      </Button>

                      <div
                        style={{
                          textAlign: "center",
                          margin: "16px 0",
                          fontSize: "14px",
                          color: "#777",
                        }}
                      >
                        {t("OR")}
                      </div>

                      <Button
                        variant="standard"
                        fullWidth
                        component={Link}
                        href="/auth/login"
                        sx={{
                          borderColor: "#0070f3",
                          color: "#0070f3",
                          "&:hover": {
                            borderColor: "#005bb5",
                            backgroundColor: "#f0f0f0",
                          },
                        }}
                      >
                        {t("LOGIN")}
                      </Button>
                    </form>
                  </div>
                </Col>
              </Row>
            </Container>
          </section>
        </div>
      )}
      <FooterThree />
    </>
  );
};

export default SignUp;
