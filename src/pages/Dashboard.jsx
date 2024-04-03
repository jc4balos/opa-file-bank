import { faFile, faFolder, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import {
  Breadcrumb,
  Button,
  Card,
  Col,
  Container,
  Form,
  Row,
  Stack,
} from "react-bootstrap";
import { Navigation } from "../components/Navigation";
import "../css/dashboard.css";
import { FolderService } from "../service/FolderService";

export const Dashboard = (props) => {
  const [currentFolderId, setCurrentFolderId] = useState(1);

  const [folderDirectory, setFolderDirectory] = useState([]);

  const addFolderOnDirectory = (folderId, folderName) => {
    console.log("executed");
    setFolderDirectory([
      ...folderDirectory,
      { folderId: folderId, folderName: folderName },
    ]);
  };

  const resetDirectory = () => {
    setFolderDirectory([]);
  };

  const removeDirectoryAfterIndex = (index) => {
    setFolderDirectory((prevFolderDirectory) =>
      prevFolderDirectory.slice(0, index + 1)
    );
  };

  return (
    <div>
      <Navigation />
      <Container>
        <Row>
          <Col className="d-none d-lg-flex" lg="2">
            <SideNav
              userId={props.userId}
              accessLevelId={props.accessLevelId}
              userFullName={props.userFullName}
              userName={props.userName}
              userTitle={props.userTitle}
            />
          </Col>
          <Col lg="10">
            <MainNavigation
              currentFolderId={currentFolderId}
              setCurrentFolderId={setCurrentFolderId}
              userId={props.userId}
              folderDirectory={folderDirectory}
              resetDirectory={resetDirectory}
              removeDirectoryAfterIndex={removeDirectoryAfterIndex}
            />
            <Content
              userId={props.userId}
              currentFolderId={currentFolderId}
              showErrorModal={props.showErrorModal}
              setCurrentFolderId={setCurrentFolderId}
              addFolderOnDirectory={addFolderOnDirectory}
              resetDirectory={resetDirectory}
              removeDirectoryAfterIndex={removeDirectoryAfterIndex}
            />
          </Col>
        </Row>
      </Container>
    </div>
  );
};

const SideNav = (props) => {
  return (
    <Stack className="">
      <span className="fw-bold text-center">{props.userFullName}</span>
      <small className="text-center">{props.userTitle}</small>
      <small className="text-muted text-center">@{props.userName}</small>
    </Stack>
  );
};

const MainNavigation = (props) => {
  return (
    <div>
      <Breadcrumb>
        <Breadcrumb.Item
          onClick={() => {
            props.setCurrentFolderId(1);
            props.resetDirectory();
          }}>
          root
        </Breadcrumb.Item>
        {props.folderDirectory.map((folder, index) => {
          console.log(index);
          return (
            <Breadcrumb.Item
              key={index}
              onClick={() => {
                props.setCurrentFolderId(folder.folderId);
                props.removeDirectoryAfterIndex(index);
              }}>
              {folder.folderName}
            </Breadcrumb.Item>
          );
        })}
      </Breadcrumb>
      <Form>
        <Button className="m-1">
          <FontAwesomeIcon icon={faPlus} />
          <span>New File</span>
        </Button>

        <Button className="m-1">
          <FontAwesomeIcon icon={faFolder} />
          <span>New Folder</span>
        </Button>
      </Form>
    </div>
  );
};

const Content = (props) => {
  const [files, setFiles] = useState([]);
  const [folders, setFolders] = useState([]); //search this

  useEffect(() => {
    const fetchFilesAndFolders = async () => {
      try {
        const folderService = new FolderService();
        const response = await folderService.getAllFilesInFolder(
          props.currentFolderId,
          props.userId
        );
        console.log(response);
        setFiles(response.files);
        setFolders(response.folders);
      } catch (error) {
        props.showErrorModal(JSON.stringify(error.message));
      }
    };

    if (props.userId) {
      fetchFilesAndFolders();
    }
  }, [props.currentFolderId, props.userId]);

  const handleFolderClick = (folderId) => {
    props.setCurrentFolderId(folderId);
  };

  return (
    <div>
      <Row>
        {folders.map((folder) => {
          return (
            <Col styl lg="2" md="4" sm="6" xs="6" key={folder.folderId}>
              <Card
                onClick={() => {
                  handleFolderClick(folder.folderId);
                  props.addFolderOnDirectory(
                    folder.folderId,
                    folder.folderName
                  );
                }}
                className="zoom-on-hover bg-light p-2 m-1 justify-content-center align-items-center"
                style={{ height: "100px" }}>
                <FontAwesomeIcon style={{ fontSize: "30px" }} icon={faFolder} />
                <span>{folder.folderName}</span>
              </Card>
            </Col>
          );
        })}
        {files.map((file) => {
          return (
            <Col lg="2" md="4" sm="6" xs="6" key={file.fileId}>
              <Card
                className="zoom-on-hover bg-light p-2 m-1 justify-content-center align-items-center"
                style={{ height: "100px" }}>
                <FontAwesomeIcon style={{ fontSize: "30px" }} icon={faFile} />
                <span className="text-truncate">{file.fileName}</span>
                <span>.{file.fileType}</span>
              </Card>
            </Col>
          );
        })}
      </Row>
    </div>
  );
};
