"use client";
import { Fragment } from "react";
import BodyContent from "@/components/pages/blogDetailPages";
import Breadcrumb from "@/layout/Breadcrumb/Breadcrumb";
import FooterThree from "@/layout/footers/FooterThree";
import NavbarThree from "@/layout/headers/NavbarThree";
import Img from "@/utils/BackgroundImageRatio";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from 'react';
import { getBlogsData } from "@/utils/getData";

const LeftSidebar = () => {
  const searchParams = useSearchParams()

  const [blogData, setBlogData] = useState(null);

  useEffect(() => {
    const dataId = searchParams.get('id');
    getBlogsData('postId', dataId).then((res) => {
          setBlogData(res)
    })
  }, [searchParams]);

  return (
    <Fragment>
      <NavbarThree />
      {/* <Breadcrumb /> */}
      <BodyContent side={"left"} blogDetails={blogData}>
        <div className='blog-detail-image'>
          <Img src={blogData?.post_thumbnail.URL || '/assets/images/parallax/4.jpg'} className='bg-img img-fluid' alt='' />
        </div>
      </BodyContent>
      <FooterThree />
    </Fragment>
  );
};
export default LeftSidebar;
