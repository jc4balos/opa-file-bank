import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useContext, useEffect, useState } from "react";
import {
  Button,
  Col,
  Container,
  ListGroup,
  ProgressBar,
  Row,
  Stack,
  Tab,
  Tabs,
} from "react-bootstrap";
import { useLocation } from "react-router-dom";
import { Context } from "../App";
import { Navigation } from "../components/Navigation";
import { UserAdd } from "../components/UserAdd";
import { UserEdit } from "../components/UserEdit";
import "../css/global.css";
import { SessionService } from "../service/SessionService";
import { UserService } from "../service/UserService";
export const Admin = (props) => {
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
  });

  return (
    <div>
      <Navigation />
      <Container>
        <Row>
          <Col className="d-none d-lg-flex" lg="2">
            <SideNavAdmin
              userId={props.userId}
              accessLevelId={props.accessLevelId}
              userFullName={props.userFullName}
              userName={props.userName}
              userTitle={props.userTitle}
            />
          </Col>
          <Col lg="10">
            <AdminNavigation
              showErrorModal={props.showErrorModal}
              showSuccessModal={props.showSuccessModal}
            />
          </Col>
        </Row>
      </Container>
    </div>
  );
};
const SideNavAdmin = (props) => {
  return (
    <Stack className="">
      <span className="fw-bold text-center">{props.userFullName}</span>
      <small className="text-center">{props.userTitle}</small>
      <small className="text-muted text-center">@{props.userName}</small>

      <ListGroup as="ul" className="mt-3">
        <ListGroup.Item as="li" className="text-center">
          <span className="fw-bold">Storage</span>
          <ProgressBar now={60} label={`60%`} />
          <small>60MB of 1024MB</small>
        </ListGroup.Item>
        <ListGroup.Item as="li">
          <FontAwesomeIcon icon={faTrash} /> Trash
        </ListGroup.Item>
      </ListGroup>
    </Stack>
  );
};

const AdminNavigation = (props) => {
  return (
    <Tabs defaultActiveKey="users" id="admin-navigation" className="mb-3 mt-3">
      <Tab eventKey="users" title="Users">
        <UsersContentAdmin
          showErrorModal={props.showErrorModal}
          showSuccessModal={props.showSuccessModal}
        />
      </Tab>
      <Tab eventKey="accessLevels" title="Access Levels">
        Tab content for Profile
      </Tab>
      <Tab eventKey="trashFiles" title="Trash Files">
        Tab content for Contact
      </Tab>
    </Tabs>
  );
};

const UsersContentAdmin = (props) => {
  const [userEditModalState, setUserEditModalState] = useState(false);
  const [userAddModalState, setUserAddModalState] = useState(false);

  const [userFirstName, setUserFirstName] = useState("");
  const [userMiddleName, setUserMiddleName] = useState("");
  const [userLastName, setUserLastName] = useState("");
  const [userName, setUserName] = useState("");
  const [userTitle, setUserTitle] = useState("");
  const [userAccessLevelId, setUserAccessLevelId] = useState(null);
  const [userId, setUserId] = useState(null);
  const [userPassword, setUserPassword] = useState("");

  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    const userService = new UserService();
    const response = await userService.getAllUsers();
    if (response.status === 200) {
      const data = await response.json();
      setUsers(data);
    } else {
      const data = await response.json();
      props.showErrorModal(data.message);
    }
  };

  const closeUserEditModal = () => {
    setUserEditModalState(false);
  };

  const closeUserAddModal = () => {
    setUserAddModalState(false);
  };

  const handleEditUser = (user) => {
    setUserFirstName(user.firstName);
    setUserMiddleName(user.middleName);
    setUserLastName(user.lastName);
    setUserName(user.userName);
    setUserTitle(user.title);
    setUserAccessLevelId(user.accessLevelId);
    setUserId(user.userId);
    setUserPassword(user.password);
    setUserEditModalState(true);
  };

  const handleDeleteUser = (onDelete) => {
    setInfoModalHeading("Delete User");
    setInfoModalMessage("Are you sure you want to delete this user?");
    setInfoModalAction(() => onDelete);
    setInfoModalActionText("Delete");
    setInfoModalState(true);
  };

  const deleteUser = async (userId) => {
    const userService = new UserService();
    const response = await userService.deactivateUser(userId);
    if (response.status === 200) {
      props.showSuccessModal("File Deleted Successfully");
      fetchUsers();
    } else {
      props.showErrorModal("Failed to delete file");
    }
  };

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

  return (
    <div>
      {userAddModalState && (
        <UserAdd
          userName={userName}
          setUserName={setUserName}
          showErrorModal={props.showErrorModal}
          showSuccessModal={props.showSuccessModal}
          closeUserAddModal={closeUserAddModal}
          showUserAddModal={userAddModalState}
          userFirstName={userFirstName}
          setUserFirstName={setUserFirstName}
          userMiddleName={userMiddleName}
          setUserMiddleName={setUserMiddleName}
          userLastName={userLastName}
          setUserLastName={setUserLastName}
          userTitle={userTitle}
          setUserTitle={setUserTitle}
          userId={userId}
          setUserId={setUserId}
          userPassword={userPassword}
          setUserPassword={setUserPassword}
          setUserAccessLevelId={setUserAccessLevelId}
          userAccessLevelId={userAccessLevelId}
          fetchUsers={() => {
            fetchUsers();
          }}
        />
      )}

      {userEditModalState && (
        <UserEdit
          userName={userName}
          setUserName={setUserName}
          userTitle={userTitle}
          setUserTitle={setUserTitle}
          showErrorModal={props.showErrorModal}
          showSuccessModal={props.showSuccessModal}
          closeUserEditModal={closeUserEditModal}
          showUserEditModal={userEditModalState}
          userFirstName={userFirstName}
          setUserFirstName={setUserFirstName}
          userMiddleName={userMiddleName}
          setUserMiddleName={setUserMiddleName}
          userLastName={userLastName}
          setUserLastName={setUserLastName}
          userAccessLevelId={userAccessLevelId}
          setUserAccesslevelId={setUserAccessLevelId}
          userId={userId}
          setUserId={setUserId}
          userPassword={userPassword}
          setUserPassword={setUserPassword}
          fetchUsers={() => {
            fetchUsers();
          }}
        />
      )}
      <Stack>
        <h4 className="fw-bold">Users</h4>
        <p>Manage users and their access levels</p>

        <div>
          <Button
            onClick={() => {
              setUserAddModalState(true);
            }}>
            Add User
          </Button>
        </div>
        <ListGroup className="mt-3">
          {users.map((user) => {
            return (
              <ListGroup.Item
                className="d-flex justify-content-between"
                key={user.userId}>
                <div className="d-flex flex-column">
                  <span className="fw-bold">
                    {user.firstName} {user.middleName} {user.lastName}
                  </span>
                  <small className="text-muted">{user.title}</small>
                  <span>Insert Access Level Name here</span>
                </div>
                <div className=" d-flex justify-content-end">
                  <div className="align-items-center d-flex gap-3">
                    <FontAwesomeIcon
                      className="zoom-on-hover"
                      icon={faEdit}
                      onClick={() => {
                        handleEditUser(user);
                      }}
                    />{" "}
                    <FontAwesomeIcon
                      className="zoom-on-hover"
                      icon={faTrash}
                      onClick={() => {
                        handleDeleteUser(() => {
                          deleteUser(user.userId);
                        });
                      }}
                    />{" "}
                  </div>
                </div>
              </ListGroup.Item>
            );
          })}
        </ListGroup>
      </Stack>
    </div>
  );
};
