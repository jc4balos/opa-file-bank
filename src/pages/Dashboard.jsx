import {
  faArrowUpFromBracket,
  faDownload,
  faEye,
  faFile,
  faFolder,
  faPlus,
  faSearch,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useContext, useEffect, useState } from "react";
import {
  Button,
  Card,
  Col,
  Dropdown,
  Form,
  InputGroup,
  OverlayTrigger,
  Row,
  Tooltip,
} from "react-bootstrap";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { Context, FolderContext } from "../App";
import { InfoModal } from "../components/InfoModal";
import { ModifyFolderModal } from "../components/ModifyFolder";
import { Navigation } from "../components/Navigation";
import { NewFile } from "../components/NewFile";
import { NewFolder } from "../components/NewFolder";
import { SideNav } from "../components/SideNav";
import "../css/global.css";
import { FileService } from "../service/FileService";
import { FolderService } from "../service/FolderService";

export const Dashboard = () => {
  const location = useLocation();

  const navigate = useNavigate();
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

  const search = async (searchString) => {
    fullScreenLoading.show();
    const folderService = new FolderService();
    const response = await folderService.search(searchString);
    if (response.status === 200) {
      const data = await response.json();
      setFolders(data.folders);
      setFiles(data.files);
      fullScreenLoading.close();
    } else {
      const data = await response.json();
      fullScreenLoading.close();
      errorModal.showErrorModal(data);
    }
  };

  const goToFolder = async (folderId) => {
    // window.history.replaceState(
    //   null,
    //   "OPA File Bank",
    //   `/dashboard/${folderId}`
    // );

    navigate(`/dashboard/${folderId}`);
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
    <FolderContext.Provider value={{ folderId, files, folders }}>
      <Navigation />
      <div className=" m-3">
        <Row>
          <Col className="d-none d-lg-flex" lg="2">
            <SideNav />
          </Col>
          <Col lg="10">
            <MainNavigation
              setFolders={setFolders}
              setFiles={setFiles}
              fetchFilesAndFolders={fetchFilesAndFolders}
              goToFolder={goToFolder}
              setFolderParentId={setFolderParentId}
              goBackOneFolderUp={goBackOneFolderUp}
              search={search}
            />
            <Content
              fetchFilesAndFolders={fetchFilesAndFolders}
              setFolders={setFolders}
              setFiles={setFiles}
              goToFolder={goToFolder}
            />
          </Col>
        </Row>
      </div>
    </FolderContext.Provider>
  );
};

const MainNavigation = (props) => {
  const [newFolderModalState, setNewFolderModalState] = useState(false);
  const [newFileModalState, setNewFileModalState] = useState(false);
  const { folderId } = useContext(FolderContext);
  const currentFolderId = parseInt(folderId);
  const [currentFolderName, setCurrentFolderName] = useState("");
  const { fullScreenLoading, errorModal } = useContext(Context);
  const [searchString, setSearchString] = useState("");

  useEffect(() => {
    fetchCurrentFolderInfo();
  }, [folderId]);

  const fetchCurrentFolderInfo = async () => {
    fullScreenLoading.show();
    const folderService = new FolderService();
    const response = await folderService.getFolder(currentFolderId);
    if (response.status === 200) {
      const data = await response.json();
      setCurrentFolderName(data.folderName);
    } else {
      const data = await response.json();
      errorModal.showErrorModal(data);
    }
    fullScreenLoading.close();
  };

  return (
    <div>
      {newFolderModalState && (
        <NewFolder
          showNewFolderModal={setNewFolderModalState}
          fetchFilesAndFolders={props.fetchFilesAndFolders}
          closeNewFolderModal={() => {
            setNewFolderModalState(false);
          }}
        />
      )}
      {newFileModalState && (
        <NewFile
          showNewFileModal={setNewFileModalState}
          fetchFilesAndFolders={props.fetchFilesAndFolders}
          closeNewFileModal={() => {
            setNewFileModalState(false);
          }}></NewFile>
      )}

      <h4 className="fw-bold">{currentFolderName}</h4>

      <div className="row justify-content-between">
        <Form className="col-lg-6 col-12 d-flex align-items-center">
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
        <Form
          className="col-lg-6 col-12"
          onSubmit={(e) => {
            e.preventDefault();
            props.search(searchString);
          }}>
          <InputGroup>
            <InputGroup.Text id="inputGroup-sizing-sm">Search</InputGroup.Text>
            <Form.Control
              value={searchString}
              placeholder="Global Search"
              onChange={(e) => {
                setSearchString(e.target.value);
              }}
            />
            <Button
              onClick={() => {
                props.search(searchString);
              }}>
              <FontAwesomeIcon icon={faSearch} />
            </Button>
          </InputGroup>
        </Form>
      </div>
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
  const { files, folders, folderId } = useContext(FolderContext);
  const [modifyFolderState, setModifyFolderState] = useState(false);

  const confirmDeleteFile = (onDelete) => {
    infoModal.showInfoModal(
      "Delete File",
      "Are you sure you want to delete this file?",
      onDelete,
      "Delete"
    );
  };

  const previewFile = async (
    fileId,
    action,
    fileName,
    fileType,
    mimeType,
    file
  ) => {
    fullScreenLoading.show();
    const fileService = new FileService();
    try {
      const response = await fileService.downloadFile(fileId);
      if (response.status === 200) {
        const data = await response.arrayBuffer();

        const blob = await new Blob([data], { type: mimeType });
        previewModal.showPreviewModal(
          blob,
          action,
          fileType,
          fileName,
          mimeType,
          file
        );
      } else {
        throw new Error("Failed to download file");
      }
    } catch (error) {
      errorModal.showErrorModal(error.message);
    } finally {
      fullScreenLoading.close();
    }
  };

  const downloadFile = async (fileId, fileName, mimeType) => {
    const fileService = new FileService();
    const response = await fileService.downloadFile(fileId, mimeType);
    if (response.status === 200) {
      const blob = await response.blob();
      const url = await window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = fileName;
      a.click();
    } else {
      errorModal.showErrorModal("Failed to download file");
    }
  };

  const deleteFile = (fileId, currentFolderId) => {
    fullScreenLoading.show();
    const fileService = new FileService();
    fileService.deleteFile(fileId).then((response) => {
      if (response.status === 200) {
        successModal.showSuccessModal("File Deleted Successfully");
        infoModal.closeInfoModal();
        props.fetchFilesAndFolders(currentFolderId);
        fullScreenLoading.close();
      } else {
        errorModal.showErrorModal("Failed to delete file");
        fullScreenLoading.close();
      }
    });
  };

  const confirmDeleteFolder = (onDelete) => {
    infoModal.showInfoModal(
      "Delete Folder",
      "Are you sure you want to delete this folder? Files associated in this folder will also be deleted.",
      onDelete,
      "Delete"
    );
  };

  const deleteFolder = async (folderId, currentFolderId) => {
    fullScreenLoading.show();
    const folderService = new FolderService();
    const response = await folderService.deleteFolder(folderId);
    if (response.status === 200) {
      const data = await response.json();
      fullScreenLoading.close();
      infoModal.closeInfoModal();
      successModal.showSuccessModal(data);
      props.fetchFilesAndFolders(currentFolderId);
    } else {
      const data = await response.json();
      fullScreenLoading.close();
      errorModal.showErrorModal(data);
    }
  };

  const [modifyFolderName, setModifyFolderName] = useState("");
  const [modifyFolderDescription, setModifyFolderDescription] = useState("");
  const [modifyFolderId, setModifyFolderId] = useState(null);
  const modifyFolder = async (folderName, folderDescription, folderId) => {
    setModifyFolderName(folderName);
    setModifyFolderDescription(folderDescription);
    setModifyFolderId(folderId);
    setModifyFolderState(true);
  };

  return (
    <div>
      {infoModal.infoModalState && <InfoModal />}
      {modifyFolderState && (
        <ModifyFolderModal
          showModifyFolderModal={modifyFolderState}
          closeModifyFolderModal={() => {
            setModifyFolderState(false);
          }}
          folderName={modifyFolderName}
          folderDescription={modifyFolderDescription}
          setFolderName={setModifyFolderName}
          setFolderDescription={setModifyFolderDescription}
          folderId={modifyFolderId}
          fetchFilesAndFolders={props.fetchFilesAndFolders}
        />
      )}

      {folders.length === 0 && files.length === 0 && (
        <div className="d-flex justify-content-center align-items-center">
          This folder is empty.
        </div>
      )}
      <Row>
        {folders.length !== 0 && <span>Folders</span>}
        {folders.map((folder) => {
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
                  className="pointer-hover bg-light p-2 m-1">
                  <div className="d-flex justify-content-between align-items-center">
                    <span className="text-truncate">
                      <FontAwesomeIcon icon={faFolder} /> {folder.folderName}
                    </span>
                    <Dropdown className="ellipsis-v rounded ms-1">
                      <Dropdown.Toggle
                        variant="none"
                        className="p-2 rounded custom-dropdown-toggle"
                        id="dropdown-basic"></Dropdown.Toggle>

                      <Dropdown.Menu>
                        <Dropdown.Item
                          onClick={() => {
                            modifyFolder(
                              folder.folderName,
                              folder.folderDescription,
                              folder.folderId
                            );
                          }}>
                          Modify
                        </Dropdown.Item>

                        <Dropdown.Item
                          onClick={() => {
                            confirmDeleteFolder(() => {
                              deleteFolder(
                                folder.folderId,
                                folder.folderParentId
                              );
                            });
                          }}>
                          Delete
                        </Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>
                  </div>
                </Card>
              </OverlayTrigger>
            </Col>
          );
        })}
      </Row>
      <Row>
        {files.length !== 0 && <span>Files</span>}
        {files.map((file) => {
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

                        <Dropdown.Item
                          onClick={() => {
                            confirmDeleteFile(() =>
                              deleteFile(file.fileId, folderId)
                            );
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
                          confirmDeleteFile(() =>
                            deleteFile(file.fileId, file.folderId)
                          );
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
                            file.fileType,
                            file.mimeType,
                            file
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
