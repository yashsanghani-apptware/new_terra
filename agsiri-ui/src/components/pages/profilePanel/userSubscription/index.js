import React, { useEffect, useState } from "react";
import { Box, Checkbox, FormControlLabel, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";
import { getAPIData } from "@/utils/getData";
import { BASE_URL } from "@/config/apiBaseUrls";
import { toast } from "react-toastify";
import { createData } from "@/utils/postData";

const SubscriptionForm = ({ userDetails }) => {
  const [formValues, setFormValues] = useState({});
  const [subscriptionCategories, setSubscriptionCategories] = useState([]);

  useEffect(() => {
    fetchSubscriptionCategories();
  }, []);

  useEffect(() => {
    if (subscriptionCategories.length > 0 && userDetails) {
      fetchUserSubscriptions(userDetails._id);
    }
  }, [subscriptionCategories, userDetails]);

  // Fetch all subscription categories
  const fetchSubscriptionCategories = async () => {
    try {
      const categories = await getAPIData(`${BASE_URL.POLICY}/users/subscriptions/categories`);
      setSubscriptionCategories(categories);
    } catch (error) {
      console.error("Error fetching subscription categories:", error);
    }
  };

  // Fetch the user's current subscription selections
  const fetchUserSubscriptions = async (userId) => {
    try {
      const userSubscriptions = await getAPIData(
        `${BASE_URL.POLICY}/users/${userId}/subscriptions/categories/`
      );

      const subscriptionValues = {};
      userSubscriptions.forEach((sub) => {
        subscriptionValues[sub.categoryId.name] = sub.isSubscribed;
      });

      setFormValues(subscriptionValues);
    } catch (error) {
      console.error("Error fetching user subscriptions:", error);
    }
  };

  // Handle checkbox state change
  const handleCheckboxChange = async (event, categoryId) => {
    const { checked } = event.target;
    // Update local state
    setFormValues((prevValues) => ({
      ...prevValues,
      [event.target.name]: checked,
    }));

    // Update subscription via API
    try {
      const res = createData({ isSubscribed: checked }, `${BASE_URL.POLICY}/users/${userDetails._id}/subscriptions/categories/${categoryId}`);
      if (res) {
        toast.success("Subscription updated successfully");
      }
    } catch (error) {
      console.error("Error updating subscription:", error);
      toast.error("Failed to update subscription");
    }
  };

  return (
    <div className="dashboard-content">
      <div className="editor-wrapper">
        <Box
          sx={{
            p: 3,
            borderRadius: 2,
            boxShadow: 3,
          }}
        >
          <Typography variant="h5" sx={{ mb: 2 }} style={{ margin: "0px" }}>
            Subscription Preferences
          </Typography>
          <Typography variant="body1" sx={{ mb: 3, color: "gray" }}>
            Select the types of updates you'd like to receive:
          </Typography>

          <Grid container spacing={2}>
            {subscriptionCategories.map((category) => (
              <Grid size={{ xs: 12, md: 12 }} key={category._id}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={formValues[category.name] || false}
                      onChange={(event) => handleCheckboxChange(event, category._id)}
                      name={category.name}
                    />
                  }
                  label={category.name}
                />
              </Grid>
            ))}
          </Grid>
        </Box>

        <div className="btn-save-next">
          <span
            className="btn btn-gradient btn-pill"
            onClick={() => toast.success("All changes saved successfully")}
          >
            Save
          </span>
        </div>
      </div>
    </div>
  );
};

export default SubscriptionForm;
