import { useState, useEffect } from "react";
import React from "react";
import EditorNavbar from "../components/EditorNavbar";
import EditorIDE from "@monaco-editor/react";
import {api_base_url} from '../helper'
import { BsArrowsAngleExpand } from "react-icons/bs";
import { useParams } from "react-router-dom";

const Editor = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [tab, setTab] = useState("html");
  const [htmlCode, setHtmlCode] = useState("");
  const [cssCode, setCssCode] = useState("");
  const [jsCode, setJsCode] = useState("");
  const [cppCode, setCppCode] = useState("");
  const [javaCode, setJavaCode] = useState("");

  let {projectID} = useParams()

  const run = () => {
    const html = htmlCode
    const css = `<style>${cssCode}</style>`
    const js = `<script>${jsCode}</script>`
    const output = document.getElementById("output")
    if(output) {
      output.srcdoc = html + css + js
    }
  };

  useEffect(() => {
    run();
  }, [htmlCode, cssCode, jsCode]);

  useEffect(() => {
    fetch(api_base_url + "/getProject", {
      mode: "cors",
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        userId: localStorage.getItem("userId"),
        projId: projectID // Use projectID here
      })
    })
      .then(res => res.json())
      .then(data => {
        setHtmlCode(data.project.htmlCode);
        setCssCode(data.project.cssCode);
        setJsCode(data.project.jsCode);
      });
  }, [projectID]);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.ctrlKey && event.key === 's') {
        event.preventDefault(); 

        fetch(api_base_url + "/updateProject", {
          mode: "cors",
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            userId: localStorage.getItem("userId"),
            projId: projectID,  
            htmlCode: htmlCode,  
            cssCode: cssCode,    
            jsCode: jsCode       
          })
        })
        .then(res => res.json())
        .then(data => {
          if (data.success) {
            alert("Project saved successfully");
          } else {
            alert("Something went wrong");
          }
        })
        .catch((err) => {
          console.error("Error saving project:", err);
          alert("Failed to save project. Please try again.");
        });
      }
    };
  
    window.addEventListener('keydown', handleKeyDown);
  
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [projectID, htmlCode, cssCode, jsCode]);

  return (
    <>
      <EditorNavbar />
      <div className="flex">
        {/* Left Panel */}
        <div
          className={`left w-[${isExpanded ? "100%" : "50%"}] bg-gray-800 text-white`}
        >
          {/* Tab Navigation */}
          <div className="flex items-center justify-between gap-2 w-full bg-gray-900 h-[50px] p-3">
            <div className="flex items-center gap-2">
              <div
                onClick={() => setTab("html")}
                className={`tab p-[5px] cursor-pointer rounded px-5 ${
                  tab === "html" ? "bg-gray-700" : "bg-gray-950"
                }`}
              >
                HTML
              </div>
              <div
                onClick={() => setTab("css")}
                className={`tab p-[5px] cursor-pointer rounded px-5 ${
                  tab === "css" ? "bg-gray-700" : "bg-gray-950"
                }`}
              >
                CSS
              </div>
              <div
                onClick={() => setTab("js")}
                className={`tab p-[5px] cursor-pointer rounded px-5 ${
                  tab === "js" ? "bg-gray-700" : "bg-gray-950"
                }`}
              >
                JavaScript
              </div>
              <div
                onClick={() => setTab("cpp")}
                className={`tab p-[5px] cursor-pointer rounded px-5 ${
                  tab === "cpp" ? "bg-gray-700" : "bg-gray-950"
                }`}
              >
                C++
              </div>
              <div
                onClick={() => setTab("java")}
                className={`tab p-[5px] cursor-pointer rounded px-5 ${
                  tab === "java" ? "bg-gray-700" : "bg-gray-950"
                }`}
              >
                Java
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={run}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              >
                Run
              </button>
              <i
                className="cursor-pointer bg-gray-950 p-2 rounded-lg"
                onClick={() => setIsExpanded(!isExpanded)}
              >
                <BsArrowsAngleExpand />
              </i>
            </div>
          </div>

          {/* Code Editor */}
          {tab === "html" && (
            <EditorIDE
              onChange={(value) => setHtmlCode(value || "")}
              height="85vh"
              theme="vs-dark"
              language="html"
              value={htmlCode}
            />
          )}
          {tab === "css" && (
            <EditorIDE
              onChange={(value) => setCssCode(value || "")}
              height="85vh"
              theme="vs-dark"
              language="css"
              value={cssCode}
            />
          )}
          {tab === "js" && (
            <EditorIDE
              onChange={(value) => setJsCode(value || "")}
              height="85vh"
              theme="vs-dark"
              language="javascript"
              value={jsCode}
            />
          )}
          {tab === "cpp" && (
            <EditorIDE
              onChange={(value) => setCppCode(value || "")}
              height="85vh"
              theme="vs-dark"
              language="cpp"
              value={cppCode}
            />
          )}
          {tab === "java" && (
            <EditorIDE
              onChange={(value) => setJavaCode(value || "")}
              height="85vh"
              theme="vs-dark"
              language="java"
              value={javaCode}
            />
          )}
        </div>

        {/* Output Panel */}
        <iframe
          id="output"
          className={`w-[${isExpanded ? "0%" : "50%"}] ${
            isExpanded ? "hidden" : ""
          } bg-slate-200 min-h-[88vh] text-black`}
        ></iframe>
      </div>
    </>
  );
};

export default Editor;
