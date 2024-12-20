"use client";
import React, { useState } from "react";
import { Fragment } from "react";
import {
  Container,
  TextField,
  Button,
  InputAdornment,
  IconButton,
} from "@mui/material";
import { User, Lock } from "react-feather";
import Breadcrumb from "@/layout/Breadcrumb/Breadcrumb";
import FooterThree from "@/layout/footers/FooterThree";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "react-toastify";
import { updateData } from "@/utils/postData"; // Replace with actual API
import { validateEmail, validatePassword } from "@/utils/validations/validate";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { BASE_URL } from "@/config/apiBaseUrls";
import { useTranslation } from "react-i18next";

const ResetPassword = () => {
  const { t } = useTranslation("common");

  const router = useRouter();
  const searchParams = useSearchParams();
  const reset_token = searchParams?.get("t") || "";

  const [email, setEmail] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");

  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setPassword(value);

    if (!validatePassword(value)) {
      setPasswordError(t("PASSWORD_VALIDATION"));
    } else {
      setPasswordError(""); // Clear the error if valid
    }
  };
  const handleConfirmPasswordChange = (e) => {
    const value = e.target.value;
    setConfirmPassword(value);
  };
  const validateForm = () => {
    if (!password) {
      setPasswordError(t("NEW_PASSWORD_REQUIRED"));
      return true;
    }
    if (!confirmPassword) {
      setConfirmPasswordError(t("CONFIRM_PASSWORD_REQUIRED"));
      return true;
    }
    if (password !== confirmPassword) {
      setConfirmPasswordError(t("PASSWORDS_DO_NOT_MATCH"));
      return true;
    }
    return false;
  };
  const handleUpdatePassword = async () => {
    if (validateForm()) {
      return;
    }
    setPasswordError("");
    setConfirmPasswordError("");
    const payload = {
      password: password,
      token: reset_token,
    };

    try {
      const response = await updateData(
        payload,
        `${BASE_URL.POLICY}/users/reset_password`
      ); // Replace with your API call
      if (response.status === 200 || response.status === 201) {
        toast.success(t("PASSWORD_UPDATE_SUCCESS"));
        router.push("/auth/login");
      } else {
        toast.error(response.data.message || t("PASSWORD_UPDATE_FAILED"));
      }
    } catch (err) {
      toast.error(t("ERROR_OCCURRED"));
    }
  };
  const handleClickShowPassword = () => setShowPassword(!showPassword);

  const handleBlur = () => {
    if (!validateEmail(email)) {
      setError("Invalid email format");
    } else {
      setError("");
    }
  };
  return (
    <Fragment>
      <Breadcrumb showPath={true} />
      <section className="login-wrap">
        <Container>
          <div className="row log-in">
            <div className="col-xl-5 col-lg-6 col-md-8 col-sm-10 col-12">
              <div className="theme-card">
                <div className="title-3 text-start">
                  <h2>{t("RESET_PASSWORD")}</h2>
                  <p
                    style={{
                      fontSize: "14px",
                      color: "#666",
                      marginTop: "3em",
                    }}
                  >
                    {t("RESET_PASSWORD_INFO")}
                  </p>
                </div>
                <form>
                  <div className="form-group">
                    <div className="input-group">
                      <TextField
                        fullWidth
                        required
                        variant="standard"
                        type={showPassword ? "text" : "password"}
                        label={t("NEW_PASSWORD")}
                        placeholder={t("ENTER_NEW_PASSWORD")}
                        value={password}
                        onChange={handlePasswordChange}
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
                    </div>
                  </div>

                  <div className="form-group">
                    <div className="input-group">
                      <TextField
                        fullWidth
                        required
                        variant="standard"
                        type={showConfirmPassword ? "text" : "password"}
                        label={t("CONFIRM_PASSWORD")}
                        placeholder={t("ENTER_CONFIRM_PASSWORD")}
                        value={confirmPassword}
                        onChange={handleConfirmPasswordChange}
                        error={Boolean(confirmPasswordError)}
                        helperText={confirmPasswordError}
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <Lock />
                            </InputAdornment>
                          ),
                          endAdornment: (
                            <InputAdornment position="end">
                              <IconButton
                                onClick={() =>
                                  setShowConfirmPassword(!showConfirmPassword)
                                }
                                edge="end"
                              >
                                {showConfirmPassword ? (
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
                    </div>
                  </div>

                  <div>
                    <Button
                      type="button"
                      fullWidth
                      variant="contained"
                      color="primary"
                      onClick={handleUpdatePassword}
                      sx={{
                        backgroundColor: "#0070f3",
                        "&:hover": { backgroundColor: "#005bb5" },
                      }}
                    >
                      {t("UPDATE_PASSWORD")}
                    </Button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </Container>
      </section>
      <FooterThree />
    </Fragment>
  );
};

export default ResetPassword;
