import { useState } from "react";
import { Container } from "react-bootstrap";
import { Navigation } from "../components/Navigation";
import { FileService } from "../service/FileService";

export const Dashboard = () => {
  return (
    <div>
      <Navigation />
      <UploadFile />
    </div>
  );
};

const UploadFile = () => {
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("file", file);
    const fileService = new FileService();
    fileService.uploadFile(file);
  };

  return (
    <Container></Container>

    // <Form onSubmit={handleSubmit}>
    //   <Form.Group className="mb-3" controlId="formBasicEmail">
    //     <Form.Label>File</Form.Label>
    //     <Form.Control
    //       name="image"
    //       type="file"
    //       placeholder="Placeholder text"
    //       onChange={handleFileChange}
    //     />
    //   </Form.Group>
    //   <Button variant="primary" type="submit">
    //     Submit
    //   </Button>
    // </Form>
  );
};
