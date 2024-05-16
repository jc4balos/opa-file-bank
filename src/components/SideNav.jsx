import { faLockOpen, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext, useEffect, useState } from "react";
import { ListGroup, ProgressBar, Stack } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";
import { Context } from "../App";
import { StorageService } from "../service/StorageService";

export const SideNav = (props) => {
  const navigate = useNavigate();
  const [storages, setStorages] = useState([]);
  const { userData, errorModal, session } = useContext(Context);
  const location = useLocation();

  const [fetchedAccessLevelId, setFetchedAccessLevelId] = useState(null);

  const initNavigation = async () => {
    const sessionData = await session.fetchSessionData(location);
    setFetchedAccessLevelId(await sessionData.accessLevelId);
  };

  useEffect(() => {
    fetchStorageInfo();
    initNavigation();
  }, []);

  const fetchStorageInfo = async () => {
    const storageService = new StorageService();
    const response = await storageService.getStorageInfo();
    if (response.status === 200) {
      const data = await response.json();
      setStorages(data);
    } else {
      const data = await response.json();
      errorModal.showErrorModal(data);
    }
  };

  const goToTrash = () => {
    navigate("/trash");
  };

  const goToAdmin = () => {
    navigate("/admin");
  };

  return (
    <Stack className="">
      <span className="fw-bold text-center">{userData.userFullName}</span>
      <small className="text-center">{userData.userTitle}</small>
      <small className="text-muted text-center">@{userData.userName}</small>

      <ListGroup variant="flush" className="mt-3">
        {storages.map((storage, index) => {
          return (
            <ListGroup.Item
              className="text-center d-flex flex-column"
              key={index}>
              <span className="fw-bold">{storage.driveName}</span>
              <ProgressBar
                now={storage.storagePercentageAllocation}
                label={storage.storagePercentageAllocation + "%"}
              />
              <small className="text-muted">
                {storage.currentStorageAllocation} GB of{" "}
                {storage.maxStorageAllocation} GB <b>used</b>
              </small>
              <small>
                <b>Free</b> {storage.freeStorageAllocation} GB
              </small>
            </ListGroup.Item>
          );
        })}

        <ListGroup.Item
          action
          onClick={() => {
            goToTrash();
          }}>
          <FontAwesomeIcon icon={faTrash} /> Trash
        </ListGroup.Item>
        <ListGroup.Item
          className={fetchedAccessLevelId != 1 ? "d-none" : ""}
          action
          onClick={() => {
            goToAdmin();
          }}>
          <FontAwesomeIcon icon={faLockOpen} /> Admin
        </ListGroup.Item>
      </ListGroup>
    </Stack>
  );
};
