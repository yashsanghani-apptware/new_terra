import React, { useState } from "react";
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from "reactstrap";
import Link from "next/link";

const PopularTags = ({ tagDetails, initialDisplayCount = 5 }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const toggle = () => setDropdownOpen((prevState) => !prevState);

  const sortedTags = tagDetails?.tags
    ? tagDetails.tags.sort((a, b) => b.post_count - a.post_count)
    : [];

  // Display the first 'n' tags
  const displayTags = sortedTags.slice(0, initialDisplayCount);
  const dropdownTags = sortedTags.slice(initialDisplayCount);

  return (
    <>
      {sortedTags.length > 0 ? (
        <div className="advance-card">
          <h6>Popular Tags</h6>
          <div className="category-property">
          <ul className="category-property">
            {displayTags.map((tag, index) => (
              <li key={index}>
                <Link
                  href={{
                    pathname: "/blogs/",
                    query: { tag: tag.slug },
                  }}
                >
                  <i className="fas fa-arrow-right me-2"></i> {tag.name}{" "}
                  <span className="float-end">{tag.post_count}</span>
                </Link>
              </li>
            ))}
          </ul>

          {/* Dropdown for additional tags */}
          {dropdownTags.length > 0 && (
            <Dropdown isOpen={dropdownOpen} toggle={toggle} style={{marginTop: "1em"}}>
              <DropdownToggle caret>More Tags</DropdownToggle>
              <DropdownMenu style={{ maxHeight: "200px", overflowY: "auto" }}>
                {dropdownTags.map((tag, index) => (
                  <DropdownItem key={index}>
                    <Link
                      href={{
                        pathname: "/blogs/",
                        query: { tag: tag.slug },
                      }}
                    >
                      {tag.name}{" "}
                      <span className="float-end">{tag.post_count}</span>
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

export default PopularTags;
