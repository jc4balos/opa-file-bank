import {
  faDownload,
  faEye,
  faFile,
  faFolder,
  faPlus,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext, useEffect, useState } from "react";
import {
  Breadcrumb,
  Button,
  Card,
  Col,
  Dropdown,
  Form,
  OverlayTrigger,
  Row,
  Tooltip,
} from "react-bootstrap";
import { useLocation } from "react-router-dom";
import { Context } from "../App";
import { InfoModal } from "../components/InfoModal";
import { Navigation } from "../components/Navigation";
import { NewFile } from "../components/NewFile";
import { NewFolder } from "../components/NewFolder";
import { SideNav } from "../components/SideNav";
import { BasicSpinner } from "../components/Spinners";
import "../css/global.css";
import { FileService } from "../service/FileService";
import { FolderService } from "../service/FolderService";
import { SessionService } from "../service/SessionService";

export const Dashboard = (props) => {
  const [isLoading, setIsLoading] = useState(true); // Add this line
  const [currentFolderId, setCurrentFolderId] = useState(1);
  const [folderDirectory, setFolderDirectory] = useState([]);
  const [files, setFiles] = useState([]);
  const [folders, setFolders] = useState([]);
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
        console.log(data);
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
      <div className="m-lg-3 m-1">
        <Row>
          <Col className="d-none d-lg-flex" lg="2">
            <SideNav
              userId={props.userId}
              accessLevelId={props.accessLevelId}
              userFullName={props.userFullName}
              userName={props.userName}
              userTitle={props.userTitle}
              showErrorModal={props.showErrorModal}
              showSuccessModal={props.showSuccessModal}
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
              showSuccessModal={props.showSuccessModal}
              fetchFilesAndFolders={fetchFilesAndFolders}
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
      </div>
    </div>
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
  const { infoModal } = useContext(Context);
  const [
    infoModalState,
    setInfoModalState,
    infoModalHeading,
    setInfoModalHeading,
    infoModalMessage,
    setInfoModalMessage,
    infoModalAction,
    setInfoModalAction,
    infoModalActionText,
    setInfoModalActionText,
  ] = infoModal;

  const { previewModal } = useContext(Context);
  const [
    previewModalState,
    setPreviewModalState,
    previewBinary,
    setPreviewBinary,
    previewModalAction,
    setPreviewModalAction,
    previewFileType,
    setPreviewFileType,
    previewFileName,
    setPreviewFileName,
  ] = previewModal;

  const confirmDeleteFile = (onDelete) => {
    setInfoModalHeading("Delete File");
    setInfoModalMessage("Are you sure you want to delete this file?");
    setInfoModalAction(() => onDelete);
    setInfoModalActionText("Delete");
    setInfoModalState(true);
    console.log(infoModalState);
  };

  const previewFile = async (fileId, action, fileName, fileType) => {
    const fileService = new FileService();
    const response = await fileService.downloadFile(fileId);
    if (response.status === 200) {
      // const a = document.createElement("a");
      // a.href = url;
      const data = await response.arrayBuffer(response);
      console.log("status 200");
      setPreviewModalState(true);
      setPreviewFileType(fileType);
      setPreviewFileName(fileName);
      setPreviewBinary(data);
      setPreviewModalAction(() => action);
      const blob = URL.createObjectURL(new Blob([data]));
      console.log(data);
    } else {
      console.log(response.status);
      props.showErrorModal("Failed to download file");
    }
  };

  const downloadFile = (fileId, fileName) => {
    const fileService = new FileService();
    fileService.downloadFile(fileId).then((response) => {
      if (response.status === 200) {
        response.blob().then((blob) => {
          const url = window.URL.createObjectURL(blob);
          const a = document.createElement("a");
          a.href = url;
          a.download = fileName;
          a.click();
        });
      } else {
        props.showErrorModal("Failed to download file");
      }
    });
  };

  const deleteFile = (fileId) => {
    const fileService = new FileService();
    fileService.deleteFile(fileId).then((response) => {
      if (response.status === 200) {
        props.showSuccessModal("File Deleted Successfully");
        props.fetchFilesAndFolders();
      } else {
        props.showErrorModal("Failed to delete file");
      }
    });
  };

  return (
    <div>
      {infoModalState && <InfoModal />}
      {props.folders.length === 0 && props.files.length === 0 && (
        <div className="d-flex justify-content-center align-items-center">
          This folder is empty.
        </div>
      )}
      <Row>
        {props.folders.length !== 0 && <span>Folders</span>}
        {props.folders.map((folder) => {
          return (
            <Col lg="3" md="4" sm="6" xs="6" key={folder.folderId}>
              <OverlayTrigger
                placement="left"
                overlay={
                  <Tooltip className="d-flex flex-column">
                    <div className="fw-bold"> {folder.folderName}</div>
                    <div>{folder.folderDescription}</div>
                  </Tooltip>
                }>
                <Card
                  onDoubleClick={() => {
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
                  </div>
                </Card>
              </OverlayTrigger>
            </Col>
          );
        })}
      </Row>
      <Row>
        {props.files.length !== 0 && <span>Files</span>}
        {props.files.map((file) => {
          return (
            <Col lg="3" md="4" sm="6" xs="6" key={file.fileId}>
              <OverlayTrigger
                placement="left"
                overlay={
                  <Tooltip>
                    <div className="fw-bold"> {file.fileName}</div>
                    <div>{file.description}</div>
                  </Tooltip>
                }>
                <Card className="bg-light p-2 m-1 " style={{ height: "200px" }}>
                  <div
                    className="align-items-top d-flex justify-content-between"
                    style={{ width: "100%" }}>
                    <div
                      className="align-items-center d-flex text-truncate"
                      style={{ width: "100%" }}>
                      <span className="text-truncate">{file.fileName}</span>
                      <span>.{file.fileType}</span>
                    </div>

                    <Dropdown className="ellipsis-v rounded ms-1">
                      <Dropdown.Toggle
                        variant="none"
                        className="p-2 rounded custom-dropdown-toggle"
                        id="dropdown-basic"></Dropdown.Toggle>

                      <Dropdown.Menu>
                        <Dropdown.Item
                          onClick={() => {
                            downloadFile(
                              file.fileId,
                              file.fileName + "." + file.fileType
                            );
                          }}>
                          Download
                        </Dropdown.Item>
                        <Dropdown.Item>Modify Permissions</Dropdown.Item>
                        <Dropdown.Item
                          onClick={() => {
                            confirmDeleteFile(() => deleteFile(file.fileId));
                          }}>
                          Delete{" "}
                        </Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>
                  </div>
                  <div
                    className="d-flex justify-content-center align-items-center"
                    style={{ height: "100%" }}
                    onMouseEnter={() => {
                      document.querySelector(
                        `#fileIcon_${file.fileId}`
                      ).style.display = "none";
                      document.querySelector(
                        `#file_${file.fileId}`
                      ).style.display = "flex";
                    }}
                    onMouseLeave={() => {
                      document.querySelector(
                        `#fileIcon_${file.fileId}`
                      ).style.display = "flex";
                      document.querySelector(
                        `#file_${file.fileId}`
                      ).style.display = "none";
                    }}>
                    <FontAwesomeIcon
                      className="zoom-on-hover "
                      id={"fileIcon_" + file.fileId}
                      style={{ fontSize: "50px" }}
                      icon={faFile}
                    />
                    <div
                      className="justify-content-evenly w-100"
                      id={"file_" + file.fileId}
                      style={{ display: "none" }}>
                      <FontAwesomeIcon
                        className="zoom-on-hover "
                        style={{ fontSize: "30px" }}
                        icon={faDownload}
                        onClick={() => {
                          downloadFile(
                            file.fileId,
                            file.fileName + "." + file.fileType
                          );
                        }}
                      />
                      <FontAwesomeIcon
                        className="zoom-on-hover "
                        onClick={() => {
                          confirmDeleteFile(() => deleteFile(file.fileId));
                        }}
                        style={{ fontSize: "30px" }}
                        icon={faTrash}
                      />
                      <FontAwesomeIcon
                        className="zoom-on-hover "
                        onClick={() => {
                          previewFile(
                            file.fileId,
                            () =>
                              downloadFile(
                                file.fileId,
                                file.fileName + "." + file.fileType
                              ),
                            file.fileName,
                            file.fileType
                          );
                        }}
                        style={{ fontSize: "30px" }}
                        icon={faEye}
                      />
                    </div>
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
