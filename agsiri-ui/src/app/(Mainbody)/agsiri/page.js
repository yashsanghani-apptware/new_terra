/**
 * It takes the locale from the context and returns the translated strings for the given namespaces
 * @returns a React component.
 */
"use client";
import React, { Fragment } from "react";
import BodyContent from "@/components/pages/blogPage/sidebarPage";
import Breadcrumb from "@/layout/Breadcrumb/Breadcrumb";
import FooterThree from "@/layout/footers/FooterThree";
import NavbarThree from "@/layout/headers/NavbarThree";
import { Logo4 } from "@/components/elements/Logo";
import { useRouter } from "next/navigation";

const NoSidebar = () => {
  const router = useRouter();

  const token = localStorage.getItem("token");
  const userDetails = localStorage.getItem("userDetails");
  if (token && userDetails) {
    router.push("/listings");
    return;
  }
  return (
    <Fragment>
      <NavbarThree logo={<Logo4/>} landingPage={true}/>
      <Breadcrumb />
      <BodyContent side={"left"} />
      <FooterThree />
    </Fragment>
  );
};

export default NoSidebar;
