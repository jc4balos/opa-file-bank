import React, { useState } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import { ErrorModal } from "./components/ErrorModal";
import { InfoModal } from "./components/InfoModal";
import { PreviewFile } from "./components/Preview";
import { FullScreenLoading } from "./components/Spinners";
import { SuccessModal } from "./components/SuccessModal";
import { Admin } from "./pages/Admin";
import { Dashboard } from "./pages/Dashboard";
import { Login } from "./pages/Login";
import { SessionService } from "./service/SessionService";

export const Context = React.createContext();

function App() {
  const [errorModalState, setErrorModalState] = useState(false);
  const [errorData, setErrorData] = useState([]);
  const [successModalState, setSuccessModalState] = useState(false);
  const [successData, setSuccessData] = useState([]);
  const [showSuccessModalLoading, setSuccessModalLoading] = useState(false);
  const [showErrorModalLoading, setErrorModalLoading] = useState(false);

  const [infoModalState, setInfoModalState] = useState(false);
  const [infoModalHeading, setInfoModalHeading] = useState("");
  const [infoModalMessage, setInfoModalMessage] = useState("");
  const [infoModalAction, setInfoModalAction] = useState(() => {});
  const [infoModalActionText, setInfoModalActionText] = useState("");

  const [previewModalState, setPreviewModalState] = useState(false);
  const [previewBinary, setPreviewBinary] = useState("");
  const [previewModalAction, setPreviewModalAction] = useState(() => {});
  const [previewFileType, setPreviewFileType] = useState("");
  const [previewFileName, setPreviewFileName] = useState("");

  const [userFullName, setUserFullName] = useState("");
  const [userName, setUserName] = useState("");
  const [userTitle, setUserTitle] = useState("");
  const [userId, setUserId] = useState(null);
  const [userAccessLevelId, setUserAccessLevelId] = useState(null);

  const [isFullScreenLoading, setIsFullScreenLoading] = useState(false);

  /**
   * Displays a full-screen loading indicator.
   * This function sets the state to show a full-screen loading indicator, indicating to the user that the application is currently loading content or performing an operation.
   */
  const show = () => {
    setIsFullScreenLoading(true);
  };

  /**
   * Hides the full-screen loading indicator.
   * This function sets the state to hide the full-screen loading indicator, indicating to the user that the loading process has completed or the operation has finished.
   */
  const close = () => {
    setIsFullScreenLoading(false);
  };

  /**
   * Object containing functions related to managing full-screen loading indicators.
   */
  const fullScreenLoading = { show, close };

  /**
   * Displays an information modal with the provided heading, message, action function, and action text.
   * @param {string} infoModalHeadingInput - The heading of the information modal.
   * @param {string} infoModalMessageInput - The message displayed in the information modal.
   * @param {Function} infoModalActionInput - The action function triggered by a button in the modal.
   * @param {string} infoModalActionTextInput - The text displayed on the action button.
   */
  const showInfoModal = (
    infoModalHeadingInput,
    infoModalMessageInput,
    infoModalActionInput,
    infoModalActionTextInput
  ) => {
    setInfoModalHeading(infoModalHeadingInput);
    setInfoModalMessage(infoModalMessageInput);
    setInfoModalAction(() => infoModalActionInput);
    setInfoModalActionText(infoModalActionTextInput);
    setInfoModalState(true);
  };

  /**
   * Closes the information modal.
   */
  const closeInfoModal = () => {
    setInfoModalState(false);
  };

  /**
   * Object containing functions related to managing information modals.
   */
  const infoModal = {
    showInfoModal,
    closeInfoModal,
  };

  /**
   * Displays an error modal with the provided message.
   * @param {string} message - The error message to be displayed in the modal.
   * @param {boolean} loading - Set if loading icon will be displayed on modal
   */
  const showErrorModal = (message, loading) => {
    setErrorData(message);
    setErrorModalLoading(loading);
    setErrorModalState(true);
  };

  /**
   * Closes the error modal.
   */
  const closeErrorModal = () => {
    setErrorModalState(false);
  };

  /**
   * Object containing functions related to managing error modals.
   */
  const errorModal = { showErrorModal, closeErrorModal };

  /**
   * Displays a success modal with the provided message.
   * @param {string} message - The success message to be displayed in the modal.
   * @param {boolean} loading - Set if loading icon will be displayed on modal
   */
  const showSuccessModal = (message, loading) => {
    setSuccessData(message);
    setSuccessModalLoading(loading);
    setSuccessModalState(true);
  };

  /**
   * Closes the success modal.
   */
  const closeSuccessModal = () => {
    setSuccessModalState(false);
  };

  /**
   * Object containing functions related to managing success modals.
   */
  const successModal = { showSuccessModal, closeSuccessModal };

  /**
   * Sets user data including full name, username, title, user ID, and access level ID.
   * @param {string} userFullName - The full name of the user.
   * @param {string} userName - The username of the user.
   * @param {string} userTitle - The title of the user.
   * @param {string} userId - The ID of the user.
   * @param {string} accessLevelId - The access level ID of the user.
   */
  const setUserData = (
    userFullName,
    userName,
    userTitle,
    userId,
    accessLevelId
  ) => {
    setUserFullName(userFullName);
    setUserName(userName);
    setUserTitle(userTitle);
    setUserId(userId);
    setUserAccessLevelId(accessLevelId);
  };

  /**
   * Object containing functions related to managing user data.
   */
  const userData = {
    setUserData,
    userId,
    userAccessLevelId,
    userFullName,
    userTitle,
    userName,
  };

  /**
   * Displays a preview modal with the provided binary data, action function, file type, and file name.
   * @param {any} binary - The binary data to be previewed.
   * @param {Function} modalAction - The action function triggered by a button in the modal.
   * @param {string} fileType - The type of the file being previewed.
   * @param {string} fileName - The name of the file being previewed.
   */
  const showPreviewModal = (binary, modalAction, fileType, fileName) => {
    setPreviewBinary(binary);
    setPreviewModalAction(() => modalAction);
    setPreviewFileType(fileType);
    setPreviewFileName(fileName);
    setPreviewModalState(true);
  };

  /**
   * Closes the preview modal.
   */
  const closePreviewModal = () => {
    setPreviewModalState(false);
  };

  /**
   * Object containing functions related to managing preview modals.
   */
  const previewModal = { showPreviewModal, closePreviewModal, infoModalState };

  /**
   * Fetches session data from the server and handles the response accordingly.
   *
   * @param {Location} location - The location object representing the current browser URL.
   * @returns {Promise<void>} - A promise that resolves when the session data is fetched and processed.
   */
  const fetchSessionData = async (location) => {
    fullScreenLoading.show();
    const sessionService = new SessionService();
    const response = await sessionService.getSessionData();

    if (response.status !== 200 && location.pathname !== "/login") {
      const data = await response.json();
      errorModal.showErrorModal(data.message, true);
      fullScreenLoading.close();

      setTimeout(() => {
        window.location.href = "/login";
      }, 3000);
    } else {
      const data = await response.json();
      await userData.setUserData(
        data.userFullName,
        data.userName,
        data.userFullName,
        data.userId,
        data.accessLevelId
      );
      console.log(data);

      fullScreenLoading.close();
    }
  };

  const session = { fetchSessionData };

  return (
    <Context.Provider
      value={{
        infoModal,
        errorModal,
        successModal,
        previewModal,
        userData,
        fullScreenLoading,
        session,
      }}>
      <BrowserRouter>
        {isFullScreenLoading && <FullScreenLoading className="d-block" />}

        <Routes>
          <Route path="/" element={<Navigate to="/dashboard/1" replace />} />
          <Route
            path="/dashboard"
            element={<Navigate to="/dashboard/1" replace />}
          />

          <Route path="/dashboard/:folderId" element={<Dashboard />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/login" element={<Login />} />
        </Routes>

        {previewModalState && (
          <PreviewFile
            showPreviewModal={previewModalState}
            closePreviewModal={() => {
              setPreviewModalState(false);
            }}
            previewBinary={previewBinary}
            previewModalAction={previewModalAction}
            previewFileType={previewFileType}
            previewFileName={previewFileName}
          />
        )}
        {errorModalState && (
          <ErrorModal
            showErrorModal={errorModalState}
            closeErrorModal={() => {
              setErrorModalState(false);
            }}
            errorModalHeading={"Error"}
            errorMessages={errorData}
            showErrorModalLoading={showErrorModalLoading}
          />
        )}
        {successModalState && (
          <SuccessModal
            showSuccessModal={successModalState}
            closeSuccessModal={() => {
              setSuccessModalState(false);
            }}
            successModalHeading={"Success"}
            successMessages={successData}
            showSuccessModalLoading={showSuccessModalLoading}
          />
        )}
        {infoModalState && (
          <InfoModal
            showInfoModal={infoModalState}
            closeInfoModal={() => {
              setInfoModalState(false);
            }}
            infoModalHeading={infoModalHeading}
            infoModalMessage={infoModalMessage}
            infoModalAction={infoModalAction}
            infoModalActionText={infoModalActionText}
          />
        )}
      </BrowserRouter>
    </Context.Provider>
  );
}

export default App;
