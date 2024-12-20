import React from "react";
import Link from "next/link";

const RecentlyAdded = ({ value }) => {
  return (
    <div className="advance-card">
      <h6>Recently Added</h6>
      <div className="recent-property">
        <ul>
          {value
            ?.sort((post1, post2) => {
              // Sorting by the modified date, descending
              let date1 = new Date(post1.modified);
              let date2 = new Date(post2.modified);
              return date2 - date1;
            })
            ?.slice(0, 3) // Limit to the first 3 posts
            ?.map((data, i) => (
              <li key={i}>
                <div className="media">
                  <img
                    src={data.featured_image}
                    className="img-fluid"
                    alt={data.title}
                  />
                  <Link href={`/blogs/details?id=${data.ID}`}>
                    <div className="media-body">
                      <h5>{data.title}</h5>
                      Read More
                    </div>
                  </Link>
                </div>
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
};

export default RecentlyAdded;
