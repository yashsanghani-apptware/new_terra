"use client";
import React, { useState } from "react";
import { Container, Box, Typography, TextField, Button } from "@mui/material";
import Breadcrumb from "@/layout/Breadcrumb/Breadcrumb";
import FooterThree from "@/layout/footers/FooterThree";
import { createData } from "@/utils/postData";
import { BASE_URL } from "@/config/apiBaseUrls";
import { toast } from "react-toastify";
import { validateEmail } from "@/utils/validations/validate";
import { useTranslation } from "react-i18next";

const ForgotPassword = () => {
  const { t } = useTranslation("common");

  const [email, setEmail] = useState("");
  const [emailError, setError] = useState("");
  const [sendRequestDisabled, setSendRequestDisabled] = useState(false);

  const handleBlur = () => {
    if (!validateEmail(email)) {
      setError(t("INVALID_EMAIL_FORMAT"));
    } else {
      setError("");
    }
  };
  const sendRestRequest = async () => {
    try {
      if (emailError) {
        toast.error(t("INVALID_EMAIL_FORMAT"));
        return;
      }
      const response = await createData({email}, `${BASE_URL.POLICY}/users/forgot_password`);
      if (response.status == 200 || response.status == 201) {
        toast.success(t("EMAIL_OTP_SENT_SUCCESS"));
        setSendRequestDisabled(true);
      } else {
        toast.error(response.data.message);
      }

    } catch (error) {
      console.error("Error in forgot password:", error);
      toast.error(t("FAILED_TO_SEND_RESET_PASSWORD_REQUEST"));
    }
  };
  return (
    <>
      <Breadcrumb showPath={true} />
      <section className="login-wrap" style={{ padding: "4em 0" }}>
        <Container style={{ maxWidth: "600px" }}>
          <Box
            sx={{
              textAlign: "center",
              mb: 4,
            }}
          >
            <Typography variant="h4" sx={{ fontWeight: "bold", mb: 1 }}>
              {t("FORGOT_YOUR_PASSWORD")}
            </Typography>
            <Typography variant="body2" sx={{ color: "#666" }}>
              {t("FORGOT_PASSWORD_INFO")}
            </Typography>
          </Box>

          <Box component="form">
            <TextField
              fullWidth
              required
              label={t("EMAIL_ADDRESS")}
              type="email"
              placeholder={t("ENTER_EMAIL")}
              variant="standard"
              sx={{ mb: 3 }}
              onBlur={handleBlur}
              onChange={(e) => setEmail(e.target.value)}
              error={!!emailError}
              helperText={emailError}
            />

            <Button
              fullWidth
              variant="contained"
              color="primary"
              sx={{
                textTransform: "capitalize",
                height: "48px",
                fontSize: "16px",
                backgroundColor: sendRequestDisabled ? "#8080807a" : "#007BFF",
                ":hover": sendRequestDisabled ? {} : { backgroundColor: "#0056b3" },
              }}
              disabled={sendRequestDisabled}
              onClick={sendRestRequest}
            >
              {t("SEND_REQUEST")}
            </Button>
          </Box>

          <Box sx={{ textAlign: "center", mt: 4, color: "#999" }}>
            <Typography variant="caption" sx={{ fontSize: "12px" }}>
              {t("CONTACT_SUPPORT")}
            </Typography>
          </Box>
        </Container>
      </section>
      <FooterThree />
    </>
  );
};

export default ForgotPassword;
