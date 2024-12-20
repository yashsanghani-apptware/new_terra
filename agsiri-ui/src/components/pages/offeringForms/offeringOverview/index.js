"use client";
import React, { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import "react-quill/dist/quill.snow.css";
import { editorDummydata } from "@/constValues/constValues";
import { Box } from "@mui/material";
let CustomEditor;
let CustomViewEditor;

const OfferingOverview = ({
  offeringDetails,
  handleSaveNext,
  overviewData,
  review,
  setOverviewFlag,
  id
}) => {
  const editorRef = useRef(null);
  const editorRef1 = useRef(null);

  const [editorData, setEditorData] = useState(null);
  const handleOnChange = async () => {
    const outputData = await editorRef.current.save();
    let cleanData = JSON.stringify(outputData);
    setEditorData(JSON.parse(cleanData));
  };

  useEffect(() => {
    if (overviewData && overviewData.editorData) {
      setEditorData(JSON.parse(overviewData?.editorData));
    } else {
      setEditorData(editorDummydata);
    }
    CustomEditor = dynamic(() => import("./CustomEditor"), { ssr: false });
    CustomViewEditor = dynamic(() => import("./CustomViewEditor"), { ssr: false });
  }, [overviewData]);

  const handleSaveAndNext = () => {
    handleSaveNext(
      "Property Details",
      { editorData: JSON.stringify(editorData) },
      "investment_overview"
    );
  };
  return (
    <>
      <div
        className="editor-wrapper"
        style={review ? { maxWidth: "100%" } : {}}
      >
        <Box
          sx={{
            p: 3,
            borderRadius: 2,
            boxShadow: 3,
          }}
        >
          {/* <div ref={editorRef}></div> */}
          {CustomEditor && id == "overview123" && (
            <CustomEditor
              editorRef={editorRef}
              handleOnChange={handleOnChange}
              readOnly={review}
              data={editorData}
              id={id}
            />
          )}
          {CustomViewEditor && id == "reviewOverview123" && (
            <CustomViewEditor
              editorRef={editorRef1}
              handleOnChange={handleOnChange}
              readOnly={true}
              data={editorData}
              id={id}
            />
          )}
        </Box>
        <div className="btn-save-next">
          {!review && (
            <span
              className="btn btn-gradient btn-pill"
              onClick={handleSaveAndNext}
            >
              Save & Next
            </span>
          )}
        </div>
      </div>
    </>
  );
};
export default OfferingOverview;
