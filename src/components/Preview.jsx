import DocViewer, { DocViewerRenderers } from "@cyntler/react-doc-viewer";
import React, { useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { BasicSpinner } from "./Spinners";

export const PreviewFile = (props) => {
  const [isLoading, setIsLoading] = useState(true);
  const [fileUrl, setFileUrl] = useState("");

  const docs = [
    {
      uri: fileUrl,
      fileName: `${props.previewFileName}.${props.previewFileType}`,
      fileType: `${props.previewFileType}`,
      mimeType: `${props.previewMimeType}`,
    },
  ];

  useEffect(() => {
    return async () => {
      docs.forEach((doc) => URL.revokeObjectURL(doc.uri));
      const url = await window.URL.createObjectURL(props.previewBinary);
      setFileUrl(url);
      setIsLoading(false);
    };
  }, []);

  //check if file type is like docx then convert

  // Assuming you fetch or process binary data asynchronously

  return (
    <div>
      <Modal
        size="lg"
        className="shadow"
        centered
        backdrop="static"
        keyboard={false}
        show={props.showPreviewModal}
        onHide={props.closePreviewModal}>
        <Modal.Header closeButton>
          <Modal.Title>
            {" "}
            <span>
              Owner <b>{props.file.ownerFullName} </b>
              <i>{props.file.ownerUsername}</i>
            </span>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="d-flex justify-content-center">
          {isLoading ? (
            <BasicSpinner />
          ) : (
            <DocViewer
              style={{ maxHeight: "80vh" }}
              documents={docs}
              pluginRenderers={DocViewerRenderers}
            />
          )}
        </Modal.Body>
        <Modal.Footer className="d-flex justify-content-between">
          <div className="d-flex flex-column">
            <span>Created at {props.file.createdDateTime}</span>
            <span>Last Updated at {props.file.updatedDateTime}</span>
          </div>

          <div className="d-flex gap-1">
            <Button variant="secondary" onClick={props.closePreviewModal}>
              Close
            </Button>
            <Button variant="primary" onClick={props.previewModalAction}>
              Download
            </Button>
          </div>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

//use this com in future

// const ViewerComponent = () => {
//   return (
//     <div>
//       <DocViewer
//         pluginRenderers={[...DocViewerRenderers]}
//         documents={[
//           {
//             uri: URL.createObjectURL(new Blob([props.previewBinary])),
//             // uri: `${props.previewBinary}`,

//             fileType: `${props.previewFileType}`,
//           },
//           // {
//           //   uri: "https://calibre-ebook.com/downloads/demos/demo.docx",
//           // },
//         ]}
//       />
//     </div>
//   );
// };
