import {
  faFile,
  faFolder,
  faTrashAlt,
  faTrashRestore,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useContext, useEffect, useState } from "react";
import {
  Card,
  Col,
  Dropdown,
  OverlayTrigger,
  Row,
  Tooltip,
} from "react-bootstrap";
import { useLocation } from "react-router-dom";
import { Context } from "../App";
import { Navigation } from "../components/Navigation";
import { SideNav } from "../components/SideNav";
import "../css/global.css";
import { AdminService } from "../service/AdminService";

export const Trash = () => {
  const location = useLocation();

  const { errorModal, userData, fullScreenLoading, session } =
    useContext(Context);

  const [deletedFiles, setDeletedFiles] = useState([]);
  const [deletedFolders, setDeletedFolders] = useState([]);

  useEffect(() => {
    fullScreenLoading.show();
    session.fetchSessionData(location);

    if (userData.userId) {
      getAllTrashFiles();
    }
    fullScreenLoading.close();
  }, [userData.userId]);

  const getAllTrashFiles = async () => {
    const adminService = new AdminService();
    const response = await adminService.getAllTrashFiles();
    if (response.status === 200) {
      const data = await response.json();
      setDeletedFiles(data.files);
      setDeletedFolders(data.folders);
      console.log(data);
    } else {
      const data = await response.json();
      errorModal.showErrorModal(data);
    }
  };

  const deleteFilePermanent = () => {};

  const deleteFolderPermanent = () => {};

  const restoreFile = () => {};

  const restoreFolder = () => {};

  return (
    <div>
      <Navigation />
      <div className="m-lg-3 m-1">
        <Row>
          <Col className="d-none d-lg-flex" lg="2">
            <SideNav />
          </Col>
          <Col lg="10">
            <h4 className="fw-bold">Trash</h4>
            <Row>
              {deletedFolders.length !== 0 && <span>Folders</span>}
              {deletedFolders.map((folder) => {
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
                        onDoubleClick={() => {}}
                        className="zoom-on-hover bg-light p-2 m-1">
                        <div className="d-flex justify-content-between align-items-center">
                          <span className="text-truncate">
                            <FontAwesomeIcon icon={faFolder} />{" "}
                            {folder.folderName}
                          </span>
                        </div>
                      </Card>
                    </OverlayTrigger>
                  </Col>
                );
              })}
            </Row>
            <Row>
              {deletedFiles.length !== 0 && <span>Files</span>}
              {deletedFiles.map((file) => {
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
                      <Card
                        className="bg-light p-2 m-1 "
                        style={{ height: "200px" }}>
                        <div
                          className="align-items-top d-flex justify-content-between"
                          style={{ width: "100%" }}>
                          <div
                            className="align-items-center d-flex text-truncate"
                            style={{ width: "100%" }}>
                            <span className="text-truncate">
                              {file.fileName}
                            </span>
                            <span>.{file.fileType}</span>
                          </div>

                          <Dropdown className="ellipsis-v rounded ms-1">
                            <Dropdown.Toggle
                              variant="none"
                              className="p-2 rounded custom-dropdown-toggle"
                              id="dropdown-basic"></Dropdown.Toggle>

                            <Dropdown.Menu>
                              <Dropdown.Item onClick={() => {}}>
                                Restore
                              </Dropdown.Item>

                              <Dropdown.Item onClick={() => {}}>
                                Delete Permanently
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
                              icon={faTrashAlt}
                              onClick={() => {}}
                            />
                            <FontAwesomeIcon
                              className="zoom-on-hover "
                              onClick={() => {}}
                              style={{ fontSize: "30px" }}
                              icon={faTrashRestore}
                            />
                          </div>
                        </div>
                      </Card>
                    </OverlayTrigger>
                  </Col>
                );
              })}
            </Row>
          </Col>
        </Row>
      </div>
    </div>
  );
};
