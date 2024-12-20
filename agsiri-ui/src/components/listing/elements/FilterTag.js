import { clearFilter } from "@/redux-toolkit/reducers/inputsReducer";
import { Fragment } from "react";
import { X } from "react-feather";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";

const FilterTag = ({ categoryId, tagId }) => {
  const filterTag = useSelector((state) => state.inputsReducer);
  const dispatch = useDispatch();
  const router = useRouter();

  const clearFilterhandle = (filterType) => {
    dispatch(clearFilter(filterType));
  };
  const clearCategoryOrTag = () => {
    router.push("/blogs/");
  };

  const StringConvert = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };
  return (
    <div className="filter-tag-div">
      {categoryId ? (
        <Fragment>
          <div className="filter-tag">
                {"Category - " + StringConvert(categoryId)}{" "}<X onClick={() => clearCategoryOrTag()} style={{ cursor: "pointer" }}/>
              </div>
        </Fragment>
      ) : tagId ? (
        <Fragment>
          <div className="filter-tag">
                {"Tag - " + StringConvert(tagId)}{" "}<X onClick={() => clearCategoryOrTag()} style={{ cursor: "pointer" }}/>
              </div>
        </Fragment>
      ) : (
        filterTag &&
        Object.keys(filterTag).map((data, i) => (
          <Fragment key={i}>
            {filterTag[data] &&
              (!Array.isArray(filterTag[data]) ? (
                StringConvert(data).trim() !== filterTag[data] && (
                  <div className='filter-tag'>
                    {StringConvert(data)} : {filterTag[data]} <X onClick={() => clearFilterhandle(data)} />
                  </div>
                )
              ) : (
                <div className='filter-tag'>
                  {StringConvert(data)} : {filterTag[data][0] + "-" + filterTag[data][1]} <span onClick={() => dispatch({ type: data, dispatch: [] })}></span>
                </div>
              ))}
          </Fragment>
        ))
      )}
    </div>
  );
};

export default FilterTag;
