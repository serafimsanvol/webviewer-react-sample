import React, { useRef, useEffect } from "react";
import WebViewer from "@pdftron/webviewer";
import "./App.css";

const App = () => {
  const viewer = useRef(null);
  const instanceRef = useRef(null);
  const l = "";
  // if using a class, equivalent of componentDidMount
  useEffect(() => {
    // If you prefer to use the Iframe implementation, you can replace this line with: WebViewer.Iframe(...)
    WebViewer.WebComponent(
      {
        path: "/webviewer/lib",
        // initialDoc: "/files/sample2.docx",
        licenseKey: "your_license_key", // sign up to get a free trial key at https://dev.apryse.com
        fullAPI: true
      },
      viewer.current
    ).then((instance) => {
      instanceRef.current = instance;
    });
  }, []);

  return (
    <div className="App">
      <div className="header">React sample</div>
      <input
        onChange={async ({ target }) => {
          instanceRef.current.Core.PDFNet.runWithCleanup(async () => {
            console.log("target", target.files);
            const buffer = await instanceRef.current.Core.officeToPDFBuffer(
              target.files[0]
            );

            console.log('neber calls after', { files: target.files, instanceRef, buffer });
          });
        }}
        type="file"
      />
      <div className="webviewer" ref={viewer}></div>
    </div>
  );
};

export default App;
