"use client";
import React, { useEffect, useState } from "react";
import { Container } from "reactstrap";
import Breadcrumb from "@/layout/Breadcrumb/Breadcrumb";
import FooterThree from "@/layout/footers/FooterThree";
import {
  Button,
  FormControlLabel,
  Box,
  Typography,
  FormGroup,
  Radio,
} from "@mui/material";
import { getAPIData } from "@/utils/getData";
import { BASE_URL } from "@/config/apiBaseUrls";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";

const Accreditation = ({
  selectedOptions,
  setSelectedOptions,
  handleContinue,
}) => {
  const { t } = useTranslation("common");

  const [accreditationValues, setAccreditationValues] = useState([]);
  useEffect(() => {
    getAccrededitationValues();
  }, []);

  const getAccrededitationValues = async () => {
    try {
      const response = await getAPIData(
        `${BASE_URL.POLICY}/users/accreditations`
      );
      setAccreditationValues(response);
    } catch (error) {
      toast.error(t("UNABLE_TO_FETCH_ACCREDITATION_VALUES"));
      handleContinue("skip");
    }
  };
  return (
    <>
      <div className="signup-form" style={{ display: "flex" }}>
        <Breadcrumb customStyle={true} showPath={true} />
        <section style={{ width: "50%", padding: "4em 0" }}>
          <Container style={{ padding: "4em 0", maxWidth: "600px" }}>
            <Box sx={{ textAlign: "center", mb: 4 }}>
              <Typography variant="h4" component="h1" sx={{ fontWeight: 600 }}>
                {t("ACCREDITATION_STATUS")}
              </Typography>
              <Typography variant="body1" sx={{ mt: 2 }}>
                {t("ACCREDITATION_STATUS_INFO")}
              </Typography>
              <Typography variant="body2" sx={{ mt: 2 }}>
                {t("ACCREDITATION_STATUS_SELECTION_INFO")}
              </Typography>
            </Box>
            <FormGroup>
              {accreditationValues.length > 0 &&
                accreditationValues.map((accreditation, i) => (
                  <FormControlLabel
                    control={
                      <Radio
                        checked={selectedOptions === accreditation._id}
                        onChange={(e) => setSelectedOptions(accreditation._id)}
                        value={accreditation._id}
                        name="accreditationStatus"
                      />
                    }
                    label={accreditation.title}
                    key={i}
                  />
                ))}
              <FormControlLabel
                control={
                  <Radio
                    checked={selectedOptions === "none"}
                    onChange={(e) => setSelectedOptions("none")}
                    value="none"
                    name="accreditationStatus"
                  />
                }
                label={t("NONE_OF_THE_ABOVE")}
              />
            </FormGroup>

            <Box
              sx={{
                mt: 4,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Button
                variant="contained"
                color="primary"
                sx={{ width: "100%", mb: 2 }}
                onClick={() => handleContinue("continue")}
              >
                {t("CONTINUE")}
              </Button>
              <Button
                variant="text"
                color="secondary"
                sx={{ width: "100%" }}
                onClick={() => handleContinue("skip")}
              >
                {t("SKIP")}
              </Button>
            </Box>
          </Container>
        </section>
      </div>
      <FooterThree />
    </>
  );
};

export default Accreditation;
