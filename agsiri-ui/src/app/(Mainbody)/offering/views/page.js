"use client";
import React, { Fragment } from "react";
import NavbarThree from "@/layout/headers/NavbarThree";
import FooterThree from "@/layout/footers/FooterThree";
import dynamic from "next/dynamic";
import Breadcrumb2 from "@/layout/Breadcrumb/BreadCrumb2";
import { useSearchParams } from "next/navigation";
const BodyContent = dynamic(() => import("@/components/pages/offeringPanel"), {
  ssr: false,
});

const MyProfile = () => {
  const searchParams = useSearchParams();
  const data =
    JSON.parse(searchParams?.get("data")) || searchParams?.get("data");

  return (
    <Fragment>
      <NavbarThree />
      <Breadcrumb2 data={data} kpisFlag={true} />
      <BodyContent active={"Investment Highlights"} />
      <FooterThree />
    </Fragment>
  );
};

export default MyProfile;
