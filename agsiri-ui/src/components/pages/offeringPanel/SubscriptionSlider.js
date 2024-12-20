import React, { useEffect, useState } from "react";
import { Box, Button, Slider, Typography, Stack } from "@mui/material";
import { createData } from "@/utils/postData";
import { BASE_URL } from "@/config/apiBaseUrls";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { Row } from "reactstrap";
import CurrencyFormatter from "@/utils/currencyFormatter";

const SubscriptionSlider = ({ offeringData }) => {
  const [investment, setInvestment] = useState(26);
  const router = useRouter();
  const userDetails = JSON.parse(localStorage.getItem("userDetails"));
  const priceUnit = Number(offeringData?.details?.price_unit);

  useEffect(() => {
    setInvestment(priceUnit);
  }, [priceUnit]);

  const minInvestment = priceUnit;
  const maxInvestment = 10 * priceUnit;
  const step = priceUnit;
  // Generate price steps dynamically
  const priceSteps = Array.from(
    { length: maxInvestment / priceUnit },
    (_, index) => (index + 1) * priceUnit
  );

  const handleSliderChange = (event, newValue) => {
    setInvestment(newValue);
  };

  const calculateTargetReturns = (amount) => {
    return Math.round(amount * Number(offeringData?.details?.target_net_moic));
  };

  const handleSuscriptionSubmit = async () => {
    const payload = {
      offering_id: offeringData.offering_id,
      user_id: userDetails._id,
      shares_subscribed: Math.round(
        investment / offeringData.details.price_unit
      ),
      investment_amount: investment,
    };

    await createData(
      payload,
      `${BASE_URL.OFFERING}/offerings/${offeringData.offering_id}/subscriptions`
    );
    toast.success("Invested Succesfully");
    router.push("/offering");
  };
  return (
    <Box
      sx={{
        p: 4,
        maxWidth: "50%",
        margin: "auto",
        boxShadow: 3,
        borderRadius: 2,
        backgroundColor: "#ffffff",
        position: "absolute",
        zIndex: 99,
        top: "30em",
      }}
    >
      <Typography variant="h5" align="center" gutterBottom>
        Your Investment Amount
      </Typography>
      <Typography variant="body1" align="center" sx={{ color: "gray", mb: 3 }}>
        To get started, confirm your investment amount using the slider below.
        Investments can be made in increments of{" "}
        <CurrencyFormatter
          value={Number(step)}
          locale="en-US"
          currency={"USD"}
        />
        , ranging from{" "}
        <CurrencyFormatter
          value={Number(minInvestment)}
          locale="en-US"
          currency={"USD"}
        />{" "}
        to{" "}
        <CurrencyFormatter
          value={Number(maxInvestment)}
          locale="en-US"
          currency={"USD"}
        />
        .
      </Typography>
      <Stack direction="row" justifyContent="space-between" sx={{ mb: 2 }}>
        <Typography variant="h6">
          <CurrencyFormatter value={investment} locale="en-US" currency="USD" />
          *
          <Typography variant="body2" color="textSecondary">
            Your Investment
          </Typography>
        </Typography>
        <Typography variant="h6">
          <CurrencyFormatter
            value={calculateTargetReturns(investment)}
            locale="en-US"
            currency="USD"
          />
          <Typography variant="body2" color="textSecondary">
            Total Target Net Returns
          </Typography>
        </Typography>
      </Stack>
      <Slider
        value={investment}
        min={minInvestment}
        max={maxInvestment}
        step={step}
        onChange={handleSliderChange}
        sx={{
          "& .MuiSlider-thumb": {
            backgroundColor: "darkgreen",
            border: "3px solid white",
          },
          "& .MuiSlider-track": {
            backgroundColor: "darkgreen",
          },
        }}
      />
      <Stack direction="row" justifyContent="space-between" sx={{ mt: 1 }}>
        {priceSteps.map((step) => (
          <Typography variant="body2">
            <CurrencyFormatter
              value={Number(step)}
              locale="en-US"
              currency={"USD"}
            />
          </Typography>
        ))}
      </Stack>
      <Row style={{ justifySelf: "end" }}>
        <Button
          variant="contained"
          color="success"
          sx={{ mt: 3 }}
          onClick={handleSuscriptionSubmit}
        >
          Confirm & Invest
        </Button>
      </Row>
      <Typography
        variant="caption"
        color="textSecondary"
        sx={{ mt: 2, display: "block", textAlign: "center" }}
      >
        *The final amount required for funding will be slightly larger than your
        investment amount as it will include the one-time fee.
      </Typography>
    </Box>
  );
};

export default SubscriptionSlider;
