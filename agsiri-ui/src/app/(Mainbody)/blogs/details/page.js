"use client";
import { Fragment } from "react";
import BodyContent from "@/components/pages/blogDetailPages";
import Breadcrumb from "@/layout/Breadcrumb/Breadcrumb";
import FooterThree from "@/layout/footers/FooterThree";
import NavbarThree from "@/layout/headers/NavbarThree";
import Img from "@/utils/BackgroundImageRatio";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from 'react';
import { getAllPostsCategoriesTags, getBlogsData } from "@/utils/getData";
import { toast } from "react-toastify";

const LeftSidebar = () => {
  const searchParams = useSearchParams()
  const [categories, setCategories] = useState([]);
  const [tags, setTags] = useState([]);
  const [recentlyAdded, setRecentlyAdded] = useState([]);
  const [blogData, setBlogData] = useState(null);

  useEffect(() => {
    const dataId = searchParams.get('id');
    getBlogsData('postId', dataId).then((res) => {
          setBlogData(res)
    })
  }, [searchParams]);


  useEffect(() => {
    getAllPostsCategoriesTags("categories").then(response => {
      if (response.status == 200) {
        setCategories(response.data);
      } else {
        toast.error("Failed to fetch categories");
      }
    });
    getAllPostsCategoriesTags("tags").then((response) => {
      if (response.status == 200) {
        setTags(response.data);
      } else {
        toast.error("Failed to fetch tags");
      }
    });
    getBlogsData().then((res) => {
      setRecentlyAdded(res.posts);
    });
  }, []);

  return (
    <Fragment>
      <NavbarThree />
      <Breadcrumb />
      <BodyContent side={"left"} blogDetails={blogData} categories={categories} tags={tags} recentlyAdded={recentlyAdded}>
        <div className='blog-detail-image'>
          <Img src={blogData?.post_thumbnail.URL || '/assets/images/parallax/4.jpg'} className='bg-img img-fluid' alt='' />
        </div>
      </BodyContent>
      <FooterThree />
    </Fragment>
  );
};
export default LeftSidebar;
