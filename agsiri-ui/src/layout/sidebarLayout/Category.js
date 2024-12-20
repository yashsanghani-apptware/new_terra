import React, { useState } from "react";
import Link from "next/link";
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from "reactstrap";

const Category = ({ value, blogDetails, initialDisplayCount = 5 }) => {
  // State to handle dropdown visibility
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const toggle = () => setDropdownOpen(!dropdownOpen);

  // Sorting categories based on post_count (descending)
  const sortedCategories = blogDetails?.categories
    ? blogDetails.categories.sort((a, b) => b.post_count - a.post_count)
    : [];

  // Slicing the array for display
  const displayCategories = sortedCategories.slice(0, initialDisplayCount);
  const dropdownCategories = sortedCategories.slice(initialDisplayCount);

  return (
    <>
      {sortedCategories.length > 0 ? (
        <div className="advance-card">
          <h6>Categories</h6>

          <div className="category-property">
            <ul>
              {displayCategories.map((category, i) => (
                <li key={i}>
                  <Link
                    href={{
                      pathname: "/blogs/",
                      query: { category: category.slug },
                    }}
                  >
                    <i className="fas fa-arrow-right me-2"></i>
                    {category.name}{" "}
                    <span className="float-end">{category.post_count}</span>
                  </Link>
                </li>
              ))}
            </ul>

            {/* Dropdown for additional categories */}
            {dropdownCategories.length > 0 && (
              <Dropdown isOpen={dropdownOpen} toggle={toggle} style={{marginTop: "1em"}}>
                <DropdownToggle caret>
                  More Categories
                </DropdownToggle>
                <DropdownMenu>
                  {dropdownCategories.map((category, i) => (
                    <DropdownItem key={i}>
                      <Link
                        href={{
                          pathname: "/blogs/",
                          query: { category: category.slug },
                        }}
                      >
                        {category.name}{" "}
                        <span className="float-end">
                          {category.post_count}
                        </span>
                      </Link>
                    </DropdownItem>
                  ))}
                </DropdownMenu>
              </Dropdown>
            )}
          </div>
        </div>
      ) : (
        <></>
      )}
    </>
  );
};

export default Category;
