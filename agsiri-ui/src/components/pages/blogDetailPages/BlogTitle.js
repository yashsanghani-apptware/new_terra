import { getAPIData } from "@/utils/getData";
import React from "react";

const BlogTitle = ({blogDetails}) => {
  const convertDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  };
  return (
    <div className='blog-title'>
      <ul className='post-detail'>
        <li>{convertDate(blogDetails?.date)}</li>

        <li>Posted By : {blogDetails?.author?.name}</li>
        <li>
          <i className='fa fa-heart me-2'></i>{blogDetails?.like_count} likes
        </li>
        <li>
          <i className='fa fa-comments me-2'></i>{blogDetails?.discussion?.comment_count} Comment
        </li>
      </ul>
      <h3>{blogDetails?.title}</h3>
    </div>
  );
};

export default BlogTitle;
