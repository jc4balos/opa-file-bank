import {
  faArrowUpFromBracket,
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
import { useLocation, useParams } from "react-router-dom";
import { Context } from "../App";
import { InfoModal } from "../components/InfoModal";
import { Navigation } from "../components/Navigation";
import { NewFile } from "../components/NewFile";
import { NewFolder } from "../components/NewFolder";
import { SideNav } from "../components/SideNav";
import "../css/global.css";
import { FileService } from "../service/FileService";
import { FolderService } from "../service/FolderService";

export const Dashboard = () => {
  const location = useLocation();

  const { folderId } = useParams();
  const { errorModal, userData, fullScreenLoading, session } =
    useContext(Context);

  const [files, setFiles] = useState([]);
  const [folders, setFolders] = useState([]);
  const [backButtonFolderId, setBackButtonFolderId] = useState(null);

  useEffect(() => {
    session.fetchSessionData(location);

    if (userData.userId) {
      fetchFilesAndFolders(folderId);
    }
  }, [userData.userId]);

  const goToFolder = async (folderId) => {
    window.history.replaceState(
      null,
      "OPA File Bank",
      `/dashboard/${folderId}`
    );
    fetchFilesAndFolders(folderId);
  };

  const goBackOneFolderUp = () => {
    goToFolder(backButtonFolderId);
  };

  const setFolderParentId = async (currentFolderId) => {
    const folderService = new FolderService();
    const response = await folderService.getFolder(currentFolderId);
    if (response.ok) {
      const data = await response.json();
      localStorage.setItem("folderParentId", data.folderParentId);
      setBackButtonFolderId(localStorage.getItem("folderParentId"));
    } else {
      const data = await response.json();
      errorModal.showErrorModal(data, false);
    }
  };

  const fetchFilesAndFolders = async (folderId) => {
    try {
      fullScreenLoading.show();
      const folderService = new FolderService();
      const response = await folderService.getAllFilesInFolder(folderId);
      setFiles(response.files);
      setFolders(response.folders);
      setFolderParentId(folderId);
    } catch (error) {
      errorModal.showErrorModal(JSON.stringify(error.message));
    } finally {
      fullScreenLoading.close();
    }
  };

  return (
    <div>
      <Navigation />
      <div className="m-lg-3 m-1">
        <Row>
          <Col className="d-none d-lg-flex" lg="2">
            <SideNav />
          </Col>
          <Col lg="10">
            <MainNavigation
              folders={folders}
              files={files}
              setFolders={setFolders}
              setFiles={setFiles}
              fetchFilesAndFolders={fetchFilesAndFolders}
              goToFolder={goToFolder}
              setFolderParentId={setFolderParentId}
              goBackOneFolderUp={goBackOneFolderUp}
            />
            <Content
              fetchFilesAndFolders={fetchFilesAndFolders}
              folders={folders}
              files={files}
              setFolders={setFolders}
              setFiles={setFiles}
              goToFolder={goToFolder}
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
          currentFolderId={props.currentFolderId}
          fetchFilesAndFolders={props.fetchFilesAndFolders}
          closeNewFileModal={() => {
            setNewFileModalState(false);
          }}></NewFile>
      )}

      <div className="d-flex align-items gap-1">
        <div className="d-flex align-self-center">
          <Breadcrumb>
            <Breadcrumb.Item
              className="d-flex align-items-center"
              onClick={() => {
                props.goToFolder(1);
              }}>
              OPA File Bank
            </Breadcrumb.Item>
          </Breadcrumb>
        </div>
      </div>

      <Form className="d-flex align-items-center">
        <FontAwesomeIcon
          className="zoom-on-hover me-2"
          style={{ fontSize: "30px" }}
          icon={faArrowUpFromBracket}
          onClick={() => {
            props.goBackOneFolderUp();
          }}
        />
        <Button
          variant="outline-secondary"
          onClick={() => {
            setNewFileModalState(true);
          }}
          className="m-1">
          <FontAwesomeIcon icon={faPlus} />
          <span>New File</span>
        </Button>
        <Button
          variant="outline-secondary"
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
  const {
    infoModal,
    previewModal,
    errorModal,
    successModal,
    fullScreenLoading,
  } = useContext(Context);

  const confirmDeleteFile = (onDelete) => {
    infoModal.showInfoModal(
      "Delete File",
      "Are you sure you want to delete this file?",
      onDelete,
      "Delete"
    );
  };

  const previewFile = async (fileId, action, fileName, fileType) => {
    fullScreenLoading.show();
    const fileService = new FileService();
    const response = await fileService.downloadFile(fileId);
    if (response.status === 200) {
      const data = await response.arrayBuffer(response);
      previewModal.showPreviewModal(data, action, fileType, fileName);
      URL.createObjectURL(new Blob([data]));
      fullScreenLoading.close();
    } else {
      errorModal.showErrorModal("Failed to download file");
      fullScreenLoading.close();
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
        errorModal.showErrorModal("Failed to download file");
      }
    });
  };

  const deleteFile = (fileId) => {
    fullScreenLoading.show();
    const fileService = new FileService();
    fileService.deleteFile(fileId).then((response) => {
      if (response.status === 200) {
        successModal.showSuccessModal("File Deleted Successfully");
        infoModal.closeInfoModal();
        props.fetchFilesAndFolders();
        fullScreenLoading.close();
      } else {
        errorModal.showErrorModal("Failed to delete file");
        fullScreenLoading.close();
      }
    });
  };

  return (
    <div>
      {infoModal.infoModalState && <InfoModal />}
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
                    props.goToFolder(folder.folderId);
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
