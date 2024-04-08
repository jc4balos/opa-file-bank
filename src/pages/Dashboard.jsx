import {
  faEllipsisV,
  faFile,
  faFolder,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import {
  Breadcrumb,
  Button,
  Card,
  Col,
  Container,
  Form,
  OverlayTrigger,
  Row,
  Stack,
  Tooltip,
} from "react-bootstrap";
import { useLocation } from "react-router-dom";
import { Navigation } from "../components/Navigation";
import { NewFile } from "../components/NewFile";
import { NewFolder } from "../components/NewFolder";
import { BasicSpinner } from "../components/Spinners";
import "../css/dashboard.css";
import { FolderService } from "../service/FolderService";
import { SessionService } from "../service/SessionService";

export const Dashboard = (props) => {
  const [isLoading, setIsLoading] = useState(true); // Add this line

  const [currentFolderId, setCurrentFolderId] = useState(1);

  const [folderDirectory, setFolderDirectory] = useState([]);

  const [files, setFiles] = useState([]);
  const [folders, setFolders] = useState([]); //search this

  const location = useLocation();

  useEffect(() => {
    const fetchSessionData = async () => {
      const sessionService = new SessionService();
      const response = await sessionService.getSessionData();

      if (response.status !== 200 && location.pathname !== "/login") {
        const data = await response.json();
        props.showErrorModal(data.message);
        setTimeout(() => {
          window.location.href = "/login";
        }, 3000);
      } else {
        const data = await response.json();
        props.setUserFullName(data.userFullName);
        props.setUserName(data.userName);
        props.setUserTitle(data.userTitle);
        props.setAccessLevelId(data.accessLevelId);
        props.setUserId(data.userId);
      }
    };

    fetchSessionData();
  }, []);

  useEffect(() => {
    if (props.userId) {
      fetchFilesAndFolders();
    }
  }, [currentFolderId, props.userId]);

  const fetchFilesAndFolders = async () => {
    try {
      setIsLoading(true);
      const folderService = new FolderService();
      const response = await folderService.getAllFilesInFolder(
        currentFolderId,
        props.userId
      );
      setFiles(response.files);
      setFolders(response.folders);
    } catch (error) {
      props.showErrorModal(JSON.stringify(error.message));
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return <BasicSpinner />;
  }

  const handleFolderClick = (folderId) => {
    setCurrentFolderId(folderId);
  };

  const addFolderOnDirectory = (folderId, folderName) => {
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
              showInfoModal={props.showInfoModal}
              showErrorModal={props.showErrorModal}
              showSuccessModal={props.showSuccessModal}
              folders={folders}
              files={files}
              setFolders={setFolders}
              setFiles={setFiles}
              handleFolderClick={handleFolderClick}
              fetchFilesAndFolders={fetchFilesAndFolders}
            />
            <Content
              userId={props.userId}
              currentFolderId={currentFolderId}
              showErrorModal={props.showErrorModal}
              setCurrentFolderId={setCurrentFolderId}
              addFolderOnDirectory={addFolderOnDirectory}
              resetDirectory={resetDirectory}
              removeDirectoryAfterIndex={removeDirectoryAfterIndex}
              folders={folders}
              files={files}
              setFolders={setFolders}
              setFiles={setFiles}
              handleFolderClick={handleFolderClick}
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
  const [newFolderModalState, setNewFolderModalState] = useState(false);
  const [newFileModalState, setNewFileModalState] = useState(false);

  return (
    <div>
      {newFolderModalState && (
        <NewFolder
          showNewFolderModal={setNewFolderModalState}
          showErrorModal={props.showErrorModal}
          showSuccessModal={props.showSuccessModal}
          currentFolderId={props.currentFolderId}
          fetchFilesAndFolders={props.fetchFilesAndFolders}
          closeNewFolderModal={() => {
            setNewFolderModalState(false);
          }}
        />
      )}
      {newFileModalState && (
        <NewFile
          showNewFileModal={setNewFileModalState}
          showErrorModal={props.showErrorModal}
          showSuccessModal={props.showSuccessModal}
          currentFolderId={props.currentFolderId}
          fetchFilesAndFolders={props.fetchFilesAndFolders}
          closeNewFileModal={() => {
            setNewFileModalState(false);
          }}></NewFile>
      )}
      <Breadcrumb>
        <Breadcrumb.Item
          onClick={() => {
            props.setCurrentFolderId(1);
            props.resetDirectory();
          }}>
          root
        </Breadcrumb.Item>
        {props.folderDirectory.map((folder, index) => {
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
        <Button
          onClick={() => {
            setNewFileModalState(true);
          }}
          className="m-1">
          <FontAwesomeIcon icon={faPlus} />
          <span>New File</span>
        </Button>

        <Button
          onClick={() => {
            setNewFolderModalState(true);
          }}
          className="m-1">
          <FontAwesomeIcon icon={faFolder} />
          <span>New Folder</span>
        </Button>
      </Form>
    </div>
  );
};

const Content = (props) => {
  return (
    <div>
      {props.folders.length == 0 && props.files.length == 0 && (
        <div className="d-flex justify-content-center align-items-center">
          This folder is empty.
        </div>
      )}
      <Row>
        {props.folders.length != 0 && <span>Folders</span>}
        {props.folders.map((folder) => {
          return (
            <Col lg="3" md="4" sm="6" xs="6" key={folder.folderId}>
              <OverlayTrigger
                placement="bottom"
                overlay={
                  <Tooltip className="d-flex flex-column">
                    <div className="fw-bold"> {folder.folderName}</div>
                    <div>{folder.folderDescription}</div>
                  </Tooltip>
                }>
                <Card
                  onDoubleClick={() => {
                    console.log("executed");
                    props.handleFolderClick(folder.folderId);
                    props.addFolderOnDirectory(
                      folder.folderId,
                      folder.folderName
                    );
                  }}
                  className="zoom-on-hover bg-light p-2 m-1">
                  <div className="d-flex justify-content-between align-items-center">
                    <span className="text-truncate">
                      <FontAwesomeIcon icon={faFolder} /> {folder.folderName}
                    </span>
                    <span className="p-2 ellipsis-v rounded">
                      <FontAwesomeIcon icon={faEllipsisV} />
                    </span>
                  </div>
                </Card>
              </OverlayTrigger>
            </Col>
          );
        })}
      </Row>
      <Row>
        {props.files.length != 0 && <span>Files</span>}
        {props.files.map((file) => {
          return (
            <Col lg="3" md="4" sm="6" xs="6" key={file.fileId}>
              <OverlayTrigger
                placement="bottom"
                overlay={
                  <Tooltip>
                    {" "}
                    <div className="fw-bold"> {file.fileName}</div>
                    <div>{file.description}</div>
                  </Tooltip>
                }>
                <Card
                  className="zoom-on-hover bg-light p-2 m-1 "
                  style={{ height: "200px" }}>
                  <div
                    className="align-items-top d-flex justify-content-between"
                    style={{ width: "100%" }}>
                    <div
                      className="align-items-center d-flex text-truncate"
                      style={{ width: "100%" }}>
                      <span className="text-truncate">{file.fileName}</span>
                      <span>.{file.fileType}</span>
                    </div>

                    <span className="p-2 ellipsis-v rounded">
                      <FontAwesomeIcon icon={faEllipsisV} />
                    </span>
                  </div>
                  <div
                    className="d-flex justify-content-center align-items-center"
                    style={{ height: "100%" }}>
                    <FontAwesomeIcon
                      style={{ fontSize: "30px" }}
                      icon={faFile}
                    />
                  </div>
                </Card>
              </OverlayTrigger>
            </Col>
          );
        })}
      </Row>
    </div>
  );
};
