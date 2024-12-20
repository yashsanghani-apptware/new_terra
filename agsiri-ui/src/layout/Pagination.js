/**
 * It takes in the current page number, the total number of pages, and the function to set the current
 * page number, and returns a list of page numbers to display in the pagination
 * @returns A pagination component that is being used to navigate through the pages of the application.
 */
"use client";
import React from "react";
import UsePagination from "../utils/UsePagination";

const Pagination = ({ headerRef, toPage,
  setToPage,
  totalPages,
  setTotalPages,
  productCount,
  setProductCount ,
  handlePageChange }) => {
  const pages = UsePagination({ toPage: toPage, totalPages: totalPages });

  const handleScroll = () => {
    if (headerRef && headerRef.current) {
      const headerOffset = headerRef.current.getBoundingClientRect().top + window.pageYOffset; // Get header position
      const offset = 50; 

      window.scrollTo({
        top: headerOffset - offset, 
        behavior: "smooth",
      });
    }
  };

  if (1 !== totalPages && totalPages !== 0) {
    return (
      <nav className="theme-pagination">
        <ul className="pagination">
          <li className="page-item">
            <div className="page-link" aria-label="Previous" onClick={() => {handleScroll(); handlePageChange(1)}}>
              <span aria-hidden="true">«</span>
              <span className="sr-only">Previous</span>
            </div>
          </li>
          <li className="page-item">
            <div
              className="page-link"
              aria-label="Previous"
              onClick={() => {handleScroll(); handlePageChange(toPage > 1 ? toPage - 1 : toPage)}}>
              <span aria-hidden="true">{"<"}</span>
              <span className="sr-only">Previous</span>
            </div>
          </li>
          {pages.map((data, i) => (
            <li
              className={`page-item ${data === toPage ? "active" : ""}`}
              key={i}
              onClick={() => {handleScroll(); handlePageChange(data)}}>
              <div className="page-link">{data}</div>
            </li>
          ))}

          <li className="page-item">
            <div
              className="page-link"
              aria-label="Next"
              onClick={() => {handleScroll(); handlePageChange(toPage < totalPages ? toPage + 1 : toPage)}}>
              <span aria-hidden="true">{">"}</span>
              <span className="sr-only">Next</span>
            </div>
          </li>
          <li className="page-item">
            <div className="page-link" aria-label="Next" onClick={() => {handleScroll(); handlePageChange(totalPages)}}>
              <span aria-hidden="true">»</span>
              <span className="sr-only">Next</span>
            </div>
          </li>
        </ul>
      </nav>
    );
  }
};

export default Pagination;
