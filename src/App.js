import React, { useState } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import { ErrorModal } from "./components/ErrorModal";
import { InfoModal } from "./components/InfoModal";
import { PreviewFile } from "./components/Preview";
import { SuccessModal } from "./components/SuccessModal";
import { Admin } from "./pages/Admin";
import { Dashboard } from "./pages/Dashboard";
import { Login } from "./pages/Login";

export const Context = React.createContext();

function App() {
  const [errorModalState, setErrorModalState] = useState(false);
  const [errorData, setErrorData] = useState([]);
  const [successModalState, setSuccessModalState] = useState(false);
  const [successData, setSuccessData] = useState([]);
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
  const [accessLevelId, setAccessLevelId] = useState(null);

  const showSuccessModal = (message) => {
    setSuccessData(message);
    setSuccessModalState(true);
  };

  const showErrorModal = (message) => {
    setErrorData(message);
    setErrorModalState(true);
  };

  return (
    <Context.Provider
      value={{
        infoModal: [
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
        ],
        errorModal: [
          errorData,
          setErrorData,
          errorModalState,
          setErrorModalState,
        ],
        successModal: [
          successData,
          setSuccessData,
          successModalState,
          setSuccessModalState,
        ],
        previewModal: [
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
        ],
        userData: [
          userFullName,
          userName,
          userTitle,
          userId,
          accessLevelId,
          setUserFullName,
          setUserName,
          setUserTitle,
          setUserId,
          setAccessLevelId,
        ],
      }}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route
            path="/dashboard"
            element={
              <Dashboard
                showSuccessModal={showSuccessModal}
                showErrorModal={showErrorModal}
                userId={userId}
                accessLevelId={accessLevelId}
                userFullName={userFullName}
                userName={userName}
                userTitle={userTitle}
                setUserFullName={setUserFullName}
                setUserName={setUserName}
                setUserTitle={setUserTitle}
                setAccessLevelId={setAccessLevelId}
                setUserId={setUserId}
              />
            }
          />
          <Route
            path="/admin"
            element={
              <Admin
                showSuccessModal={showSuccessModal}
                showErrorModal={showErrorModal}
                userId={userId}
                accessLevelId={accessLevelId}
                userFullName={userFullName}
                userName={userName}
                userTitle={userTitle}
                setUserFullName={setUserFullName}
                setUserName={setUserName}
                setUserTitle={setUserTitle}
                setAccessLevelId={setAccessLevelId}
                setUserId={setUserId}
              />
            }
          />
          <Route
            path="/login"
            element={
              <Login
                showSuccessModal={showSuccessModal}
                showErrorModal={showErrorModal}
              />
            }
          />
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
