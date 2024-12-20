import React, { useEffect, useState } from "react";
import Img from "@/utils/BackgroundImageRatio";
import { getBlogComments } from "@/utils/getData";
import DOMPurify from "dompurify";
import parse from "html-react-parser";
import { toast } from "react-toastify";

const CommentSection = ({blogDetails}) => {
  const [comments, setCommentsDetails] = useState([]);
  useEffect(() => {
    if (blogDetails?.ID) {
        getBlogComments(blogDetails?.meta.links.replies).then((res) => {
          if (res.status == 200) {
            setCommentsDetails(res.data.comments);
          } else {
            toast.error("Unable to fetch comments");
          }
      })
    }
  }, [blogDetails?.ID]);

  const convertDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  };
  return (
    <>
    {
      comments.length ? (
        <div className='comment-section'>
      <h4>Comments:</h4>
      {
        comments && comments.map((comment, index) => (
          <div className='comment-box'>
          <div className='media'>
            <Img src={comment?.author?.avatar_URL ? comment?.author?.avatar_URL : '/assets/images/avatar/4.jpg'} className='img-fluid' alt='' />
            <div className='media-body'>
              <div className='comment-title'>
                <div className='comment-user'>
                  <i className='fa fa-user'></i>
                  <h6>{comment.author.first_name ? comment.author.first_name + " " + comment.author.last_name : comment.author.name}</h6>
                </div>
                <div className='comment-date'>
                  <i className='fas fa-clock'></i>
                  <h6>{convertDate(comment.date)}</h6>
                </div>
              </div>
              <div className='comment-detail'>
                <p className='font-roboto'>
                  {parse(DOMPurify.sanitize(comment?.content))}
                </p>
              </div>
              <div className='text-end'>
                <a>
                  <i className='fa fa-reply pe-2'></i> Reply
                </a>
              </div>
            </div>
          </div>
        </div>    
        ))
      }
    </div>
      ) :
      <></>
    }
    </>
    
  );
};

export default CommentSection;
