"use client";
import EditorJs from "react-editor-js";
import Embed from "@editorjs/embed";
import Table from "@editorjs/table";
import List from "@editorjs/list";
import Warning from "@editorjs/warning";
import Code from "@editorjs/code";
import LinkTool from "@editorjs/link";
import Raw from "@editorjs/raw";
import Header from "@editorjs/header";
import Quote from "@editorjs/quote";
import Marker from "@editorjs/marker";
import CheckList from "@editorjs/checklist";
import Delimiter from "@editorjs/delimiter";
import InlineCode from "@editorjs/inline-code";
import React, { forwardRef, memo, useEffect } from "react";

const CustomEditor = ({ editorRef, handleOnChange, readOnly, data, id }) => {
  // const CustomEditor = forwardRef(function CustomEditor({ handleOnChange, readOnly, data, id } , editorRef) {
  
  const EDITOR_JS_TOOLS = {
    embed: Embed,
    table: Table,
    marker: Marker,
    list: List,
    warning: Warning,
    code: Code,
    linkTool: LinkTool,
  // ***** IF WE REQUIRE TO UPLOAD IMAGE UNCOMMENT THIS CODE AND MODIFY AS PER REQUIREMENT ***** //
    // image: {
    //   class: Image,
    //   config: {
    //       uploader: {
    //           uploadByFile(file) {
    //               let formData = new FormData();
    //               formData.append("images", file);
    //               // send image to server
    //               return API.imageUpload(formData).then((res) => {
    //                   // get the uploaded image path, pushing image path to image array
    //                   imageArray.push(res.data.data)
    //                   return {
    //                       success: 1,
    //                       file: {
    //                           url: res.data.data
    //                       }
    //                   }
    //               })
    //           }
    //       }
    //   }
    // },
    raw: Raw,
    header: Header,
    quote: Quote,
    checklist: CheckList,
    delimiter: Delimiter,
    inlineCode: InlineCode,
    // simpleImage: SimpleImage,
  };
  return (
    <>
{editorRef && 
      <EditorJs
        instanceRef={(instance) => (editorRef.current = instance)}
        holder={id}
        tools={EDITOR_JS_TOOLS}
        data={data}
        onChange={() => handleOnChange()}
        placeholder={`Write from here...`}
        readOnly={readOnly}
      />}
           <div id={id}></div>

    </>
  );
};

export default React.memo(CustomEditor);
