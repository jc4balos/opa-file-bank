import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext, useEffect, useState } from "react";
import { ListGroup, ProgressBar, Stack } from "react-bootstrap";
import { Context } from "../App";
import { StorageService } from "../service/StorageService";

export const SideNav = (props) => {
  const [storages, setStorages] = useState([]);
  const { userData, errorModal } = useContext(Context);

  useEffect(() => {
    fetchStorageInfo();
  });

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

  return (
    <Stack className="">
      <span className="fw-bold text-center">{userData.userFullName}</span>
      <small className="text-center">{userData.userTitle}</small>
      <small className="text-muted text-center">@{userData.userName}</small>

      <ListGroup as="ul" className="mt-3">
        {storages.map((storage, index) => {
          return (
            <ListGroup.Item
              as="li"
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

        <ListGroup.Item as="li">
          <FontAwesomeIcon icon={faTrash} /> Trash
        </ListGroup.Item>
      </ListGroup>
    </Stack>
  );
};
