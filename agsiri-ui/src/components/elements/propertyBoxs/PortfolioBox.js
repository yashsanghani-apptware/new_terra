/**
 * It returns a div with a class of property-box, which contains a div with a class of property-image,
 * which contains an ImageSlider component, which contains an array of images, which are passed in as a
 * prop
 * @returns A React component.
 */
import Link from "next/link";
import React, { useEffect, useState } from "react";
import ContentLoader from "react-content-loader";
import ImageSlider from "../ImageSlider";
import PropertyLabel from "../PropertyLabel";
import { getListingMedia } from "@/utils/getData";
import CurrencyFormatter from "@/utils/currencyFormatter";
import { CardContent, Typography, Divider } from "@mui/material";
import Grid from "@mui/material/Grid2";

const PortfolioBox = ({ data, relativeSlider, video, toPage }) => {
  const [load, setLoad] = useState(true);
  const [images, setImages] = useState();
  const [imagesMeta, setImagesMeta] = useState();
  const [videos, setVideos] = useState();

  useEffect(() => {
    getListingMedia(
      `/listings/image/${data?.listingDetails?.listing_id}?limit=1`
    ).then((res) => {
      setImages(res.data.images);
      setImagesMeta(res.data.imagesMeta);
      setVideos(res.data.videos);
    });
  }, [data?.listingDetails?.listing_id]);

  function formatDate(dateString) {
    const date = new Date(dateString);

    const day = String(date.getDate()).padStart(2, "0"); // Get the day and pad with 0 if needed
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Get the month (0-based, so add 1)
    const year = date.getFullYear(); // Get the full year

    return `${day}/${month}/${year}`;
  }
  return (
    <>
      {!load ? (
        <div className="property-box">
          <div className="property-image">
            {images && images.length > 0 ? (
              <ImageSlider images={images.slice(0, 1)} />
            ) : (
              <img
                src="/assets/images/parallax/3.jpg"
                className="bg-img img-fluid"
                alt=""
              />
            )}
            <div className="labels-left">
              <PropertyLabel labels={data?.offering?.name} />
            </div>
          </div>
          <div className="property-details">
            <span className="font-roboto">
              {data?.listingDetails?.address?.city || "USA"}{" "}
            </span>
            <Link href="#">
              <h3>{data?.offering?.name}</h3>
            </Link>
            {data?.offering?.financial_details?.total_cost_of_farm
              ?.cost_of_farmland && (
              <>
                <h6>
                  <CurrencyFormatter
                    value={Number(
                      data?.offering?.financial_details?.total_cost_of_farm
                        ?.cost_of_farmland
                    )}
                    locale="en-US"
                    currency={
                      data?.offering?.financial_details?.total_cost_of_farm
                        ?.cost_of_farmland ?? "USD"
                    }
                  />
                </h6>
              </>
            )}
            <CardContent style={{ padding: "10px 0px" }}>
              <Grid container spacing={2} sx={{ mb: 2 }}>
                <Grid size={{ xs: 12, md: 6 }} className="grid-investment-kpi">
                  <Typography variant="body2" sx={{ fontWeight: "bold" }}>
                    {data?.offering?.details?.total_acres || "-"}
                  </Typography>
                  <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                    Total Acres
                  </Typography>
                </Grid>
                <Grid size={{ xs: 12, md: 6 }} className="grid-investment-kpi">
                  <Typography variant="body2" sx={{ fontWeight: "bold" }}>
                    {data?.portfolio?.holding_period + " years" || "-"}
                  </Typography>
                  <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                    Holding Period
                  </Typography>
                </Grid>
                <Grid size={{ xs: 12, md: 6 }} className="grid-investment-kpi">
                  <Typography variant="body2" sx={{ fontWeight: "bold" }}>
                    <CurrencyFormatter
                      value={Number(data?.portfolio?.share_price)}
                      locale="en-US"
                      currency={data?.portfolio?.share_price ?? "USD"}
                    />
                  </Typography>
                  <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                    Share Price
                  </Typography>
                </Grid>
                <Grid size={{ xs: 12, md: 6 }} className="grid-investment-kpi">
                  <Typography variant="body2" sx={{ fontWeight: "bold" }}>
                    <CurrencyFormatter
                      value={
                        Number(data?.portfolio?.number_of_shares) *
                        Number(data?.portfolio?.share_price)
                      }
                      locale="en-US"
                      currency={
                        Number(data?.portfolio?.number_of_shares) *
                          Number(data?.portfolio?.share_price) ?? "USD"
                      }
                    />
                  </Typography>
                  <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                    Investments
                  </Typography>
                </Grid>
                <Grid size={{ xs: 12, md: 6 }} className="grid-investment-kpi">
                  <Typography variant="body2" sx={{ fontWeight: "bold" }}>
                    {data?.offering?.details.target_net_irr + "%" || "-"}
                  </Typography>
                  <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                    Target Net IRR
                  </Typography>
                </Grid>
                <Grid size={{ xs: 12, md: 6 }} className="grid-investment-kpi">
                  <Typography variant="body2" sx={{ fontWeight: "bold" }}>
                    {data?.portfolio?.hp_annotation || "-"}
                  </Typography>
                  <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                    Holding Period Annotation
                  </Typography>
                </Grid>
              </Grid>
              <Divider sx={{ my: 2 }} />
            </CardContent>
            <div className="property-btn d-flex">
              <span>{formatDate(data?.listingDetails?.built_on)}</span>
              <Link href="#">
                <button type="button" className="btn btn-dashed btn-pill">
                  Details
                </button>
              </Link>
            </div>
          </div>
        </div>
      ) : (
        <>
          <ContentLoader className="skeleton-svg">
            {setTimeout(() => {
              setLoad(false);
            }, 1000)}
            <rect className="skeleton-img" />
            <rect className="skeleton-c1" />
            <rect className="skeleton-c2" />
            <rect className="skeleton-c3" />
          </ContentLoader>
        </>
      )}
    </>
  );
};

export default PortfolioBox;
