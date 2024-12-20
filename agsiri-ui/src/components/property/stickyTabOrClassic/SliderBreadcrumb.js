/**
 * It renders a slider with a background image and a title
 * @returns The return statement is used to return a value from a function.
 */
import React, { Fragment, useState, useEffect } from "react";
import Slider from "react-slick";
import { mainPropertySlider } from "@/data/slickSlider";
import Img from "@/utils/BackgroundImageRatio";
import NoSsr from "@/utils/NoSsr";
import TopTitle from "./TopTitle";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

const SliderBreadcrumbSection = ({ singleListingData, images, videos, currentPage, offerDetails, fromOfferScreen }) => {
  const pathname = usePathname();
  const router = useRouter();
  const [path, setPath] = useState();

  useEffect(() => {
    setPath(pathname.split("/"));
  }, [router.pathname]);

  return (
    <section className="ratio_40 breadcrumb-section p-0 single-property-images" style={fromOfferScreen ? {height: "auto"} : {}}>
      <NoSsr>
        <Slider
          className="main-property-slider arrow-image"
          {...mainPropertySlider}
        >
          {images?.length < 1 ? (
            <div>
              <Img src="/assets/images/property/4.jpg" className="bg-img" />
            </div>
          ) : (
            Array(images?.[0]).map((item, index) => (
              <div key={index} className="image-wrapper">
                <Img src={item?.url} className="bg-img" />
              </div>
            ))
          )}
        </Slider>
      </NoSsr>
      <TopTitle singleListingData={singleListingData} currentPage={currentPage} offerDetails={offerDetails} fromOfferScreen={fromOfferScreen}/>
    </section>
  );
};

export default SliderBreadcrumbSection;
