import DocViewer, { DocViewerRenderers } from "@cyntler/react-doc-viewer";
import React, { useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { BasicSpinner } from "./Spinners";
export const PreviewFile = (props) => {
  const [isLoading, setIsLoading] = useState(true);

  //check if file type is like docx then convert

  // Assuming you fetch or process binary data asynchronously
  useEffect(() => {
    setIsLoading(false);
  }, []);

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
          <Modal.Title>{props.previewModalHeading}</Modal.Title>
        </Modal.Header>
        <Modal.Body className="d-flex justify-content-center">
          {isLoading ? <BasicSpinner /> : "insert viewer here"}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={props.closePreviewModal}>
            Close
          </Button>
          <Button variant="primary" onClick={props.previewModalAction}>
            Download
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

const ViewerComponent = () => {
  return (
    <div>
      <DocViewer
        pluginRenderers={[...DocViewerRenderers]}
        documents={[
          {
            uri: URL.createObjectURL(new Blob([props.previewBinary])),
            // uri: `${props.previewBinary}`,

            fileType: `${props.previewFileType}`,
          },
          // {
          //   uri: "https://calibre-ebook.com/downloads/demos/demo.docx",
          // },
        ]}
      />
    </div>
  );
};
