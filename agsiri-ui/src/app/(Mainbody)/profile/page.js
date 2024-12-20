"use client";
import React, { Fragment } from "react";
import NavbarThree from "@/layout/headers/NavbarThree";
import FooterThree from "@/layout/footers/FooterThree";
import dynamic from "next/dynamic";
import Breadcrumb from "@/layout/Breadcrumb/Breadcrumb";
import { useSearchParams } from "next/navigation";
import { PROFILE_TABS } from "@/constValues/constValues";
const BodyContent = dynamic(() => import("@/components/pages/profilePanel"), {
  ssr: false,
});

const MyProfile = () => {
    const searchParams = useSearchParams();
  const data = JSON.parse(searchParams?.get('data')) || searchParams?.get('data');
  return (
    <Fragment>
      <NavbarThree />
      <Breadcrumb/>
      <BodyContent active={PROFILE_TABS[0].id} />
      <FooterThree />
    </Fragment>
  );
};

export default MyProfile;
