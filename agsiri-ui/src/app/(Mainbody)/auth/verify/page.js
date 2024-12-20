"use client";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { BASE_URL } from "@/config/apiBaseUrls";
import { updateAccreditationData, verifyLogin } from "@/utils/postData";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import Accreditation from "../signup/accreditation";
import { useTranslation } from "react-i18next";

const VerifyAuth = () => {
  const { t } = useTranslation("common");

  const router = useRouter();
  const dispatch = useDispatch();
  const searchParams = useSearchParams();
  const code = searchParams?.get("code");

  const [accreditationStatusVisible, setAccreditationStatusVisible] =
    useState(false);
  const [accreditationStatus, setAccreditationStatus] = useState("normal");
  const [passwordScreen, setPasswordScreen] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState();
  const [userData, setUserData] = useState({});
  useEffect(() => {
    const verify = async () => {
      if (!code) {
        toast.error(t("NO_CODE_IN_URL"));
        window.location.href = "/auth/login";
        return;
      }

      try {
        const response = await verifyLogin(
          `${BASE_URL.POLICY}/users/socialLogin/verify`,
          code
        );
        if (response?.status == 200 && response?.data) {
          setUserData(response.data);
          if (response.data.user_details.isExistingUser) {
            handleSuccess(response.data);
          } else {
            setAccreditationStatusVisible(true);
          }
        } else {
          toast.error(t("LOGIN_FAILED"), response?.data?.message);
          window.location.href = "/auth/login";
        }
      } catch (error) {
        toast.error(t("ERROR_VERIFYING_LOGIN"), error);
        window.location.href = "/auth/login";
      }
    };

    verify();
  }, [router.query]);

  const handleSuccess = (data) => {
    localStorage.setItem("token", data.token);
    localStorage.setItem("userDetails", JSON.stringify(data.user_details));
    dispatch({ type: "setToken", payload: data.token });
    toast.success(t("LOGGED_IN_SUCCESS"));
    router.push("/listings");
  };

  const handleContinue = async (type = "skip") => {
    try {
      if (type === "skip") {
        // Skip accreditation and proceed
        setAccreditationStatusVisible(false);
        handleSuccess(userData);
      } else {
        // Validate selected options
        if (!selectedOptions) {
          toast.error(t("SELECT_ACCR_EDIT"));
          return;
        }

        // Prepare payload with updated user_details
        const payload = {
          ...userData,
          user_details: {
            ...userData.user_details,
            accreditationList: selectedOptions == "none" ? [] : [selectedOptions],
            isAccredited: true,
          },
        };

        // Update user accreditation details
        const response = await updateAccreditationData(
          payload.user_details,
          `${BASE_URL.POLICY}/users/${userData.user_details._id}`,
          payload.token
        );

        if (response.status === 200 || response.status === 201) {
          setAccreditationStatusVisible(false);
          handleSuccess({ ...userData, user_details: payload.user_details });
        } else {
          toast.error(
            response.data?.message || t("FAILED_UPDATE_ACCRED")
          );
        }
      }
    } catch (error) {
      console.error(t("ERROR_UPDATING_ACCRED"), error);
      toast.error(t("ERROR_OCCURRED"));
    }
  };

  return (
    <>
      {accreditationStatusVisible ? (
        <Accreditation
          selectedOptions={selectedOptions}
          setSelectedOptions={setSelectedOptions}
          handleContinue={handleContinue}
        />
      ) : (
        <div style={{ textAlign: "center", marginTop: "50px" }}>
          <h1>{t("AUTHENTICATING")}</h1>
        </div>
      )}
    </>
  );
};

export default VerifyAuth;
