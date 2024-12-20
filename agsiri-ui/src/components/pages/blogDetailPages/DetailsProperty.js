import React from "react";
import { Row } from "reactstrap";
import parse from "html-react-parser";
import DOMPurify from "dompurify";
const DetailsProperty = ({ blogDetails }) => {
  const cleanContent = DOMPurify.sanitize(blogDetails?.content);
  return (
    <div className="details-property">
      <Row>
        {/* <p>{stripHtmlTags(blogDetails?.content)}</p> */}

        <p>{parse(cleanContent)}</p>
        {/* <p className='col-xl-4'>
          Residences can be classified by and how they are connected to neighbouring residences and land. Different types of housing tenure can be used for the same physical type. For example,
          connected residences might be owned by a single entity and leased out, or owned separately with an agreement covering the relationship between units and common areas and concerns
        </p>
        <p className='col-xl-4'>
          Residential real estate may contain either a single family or multifamily structure that is available for occupation or for non-business purposes. Residences can be classified by and how
          they are connected to neighbouring residences and land. Different types of housing tenure can be used for the same physical type
        </p>
        <p className='col-xl-4'>
          This rate of profitability occurred off the back of Australia’s longest housing market upswing on record, which was almost uninterrupted from September 1995 to January 2004, and saw housing
          values nationally increase by 109.7%.
        </p> */}
      </Row>
    </div>
  );
};

export default DetailsProperty;
