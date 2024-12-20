/**
 * It takes a number of items per page and a total number of items and returns the total number of
 * pages
 * @returns The return value of the function is the value of the last expression executed in the
 * function.
 */
import React, { useEffect, useRef, useState } from "react";
import { Col, Container, Row } from "reactstrap";
import Sidebar from "@/layout/sidebarLayout/Sidebar";
import SearchBar from "@/layout/sidebarLayout/SearchBar";
import Category from "@/layout/sidebarLayout/Category";
import RecentlyAdded from "@/layout/sidebarLayout/RecentlyAdded";
import PopularTags from "@/layout/sidebarLayout/PopularTags";
import { getAllPostsCategoriesTags, getBlogsData, searchBlogs } from "@/utils/getData";
import Pagination from "@/layout/Pagination";
import BlogWrapBox from "../../../elements/propertyBoxs/BlogWrapBox";
import {
  gridReducer,
  initialGrid,
} from "../../../listing/gridView/grid/gridReducer";
import { useSearchParams } from "next/navigation";
import FilterTag from "@/components/listing/elements/FilterTag";
import { toast } from "react-toastify";

const BodyContent = ({ side }) => {
  const [toPage, setToPage] = useState(1);
  const [totalPages, setTotalPages] = useState();
  const [blogData, setBlogData] = useState(null);
  const [categories, setCategories] = useState([]);
  const [tags, setTags] = useState([]);
  const [recentlyAdded, setRecentlyAdded] = useState([]);
  const [searchTerm, setSearchTerm] = useState(""); // State for search term
  const [filteredBlogData, setFilteredBlogData] = useState([]); // New state for filtered data
  const headerRef = useRef(null);
  const searchParams = useSearchParams();
  const categoryId = searchParams.get("category");
  const tagId = searchParams.get("tag");

  useEffect(() => {
    if (categoryId) {
      getBlogsData("category", categoryId).then((res) => {
        setBlogData(res.posts);
        setFilteredBlogData(res.posts);
        setTotalPages(Math.ceil(res.posts.length / 6));
      });
    } else if (tagId) {
      getBlogsData("tag", tagId).then((res) => {
        setBlogData(res.posts);
        setFilteredBlogData(res.posts);
        setTotalPages(Math.ceil(res.posts.length / 6));
      });
    } else {
      getBlogsData().then((res) => {
        setBlogData(res.posts);
        setFilteredBlogData(res.posts);
        setTotalPages(Math.ceil(res.posts.length / 6));
      });
    }
  }, [categoryId, tagId]);

  useEffect(() => {
    getAllPostsCategoriesTags("categories").then((response) => {
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

  // Function to handle search and filter blogData
  const handleSearch = (searchTerm) => {
    setSearchTerm(searchTerm);
    if (searchTerm === "") {
      setFilteredBlogData(blogData); // Show all data if no search term
    } else {
      searchBlogs(searchTerm).then((res) => {
        if (res.status === 200 ) {
          setFilteredBlogData(res.data.posts);
          setTotalPages(Math.ceil(res.data.posts.length / 6));
        }
      });
    }
  };
  const handlePageChange = async (newPage) => {
    setToPage(newPage);
  };
  return (
    <section className="ratio2_1">
      <Container>
        <Row>
          {side && (
            <Sidebar side={side}>
              <SearchBar onSearch={handleSearch}/>
              <Category blogDetails={categories} />
              <PopularTags tagDetails={tags} />
              <RecentlyAdded value={recentlyAdded} />
            </Sidebar>
          )}
          <Col xl={side ? "9" : "12"} lg={side ? "8" : "12"}>
            {(categoryId || tagId) && (
              <FilterTag categoryId={categoryId} tagId={tagId} />
            )}

            <Row className="blog-grid ">
              {filteredBlogData &&
                filteredBlogData
                  ?.slice(toPage * 6 - 6, toPage * 6)
                  .map((data, i) => (
                    <Col
                      md="6"
                      lg={side === "right" || side === "left" ? "6" : "4"}
                      key={i}
                    >
                      <BlogWrapBox data={data} blogData={blogData} />
                    </Col>
                  ))}
            </Row>
            <Pagination
              headerRef={headerRef}
              toPage={toPage}
              setToPage={setToPage}
              totalPages={totalPages}
              handlePageChange={handlePageChange}
            />
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default BodyContent;
