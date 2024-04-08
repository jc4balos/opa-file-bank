import { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import { ErrorModal } from "./components/ErrorModal";
import { InfoModal } from "./components/InfoModal";
import { SuccessModal } from "./components/SuccessModal";
import { Admin } from "./pages/Admin";
import { Dashboard } from "./pages/Dashboard";
import { Login } from "./pages/Login";

function App() {
  const [errorModalState, setErrorModalState] = useState(false);
  const [errorData, setErrorData] = useState([]);
  const [successModalState, setSuccessModalState] = useState(false);
  const [successData, setSuccessData] = useState([]);
  const [infoModalState, setInfoModalState] = useState(false);
  const [infoModalHeading, setInfoModalHeading] = useState([]);
  const [infoModalMessage, setInfoModalMessage] = useState([]);
  const [infoModalAction, setInfoModalAction] = useState(() => {});
  const [infoModalActionText, setInfoModalActionText] = useState([]);

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

  const showInfoModal = (
    infoModalHeading,
    infoModalMessage,
    infoModalAction,
    infoModalActionText
  ) => {
    setInfoModalHeading(infoModalHeading);
    setInfoModalMessage(infoModalMessage);
    setInfoModalAction(() => infoModalAction);
    setInfoModalActionText(infoModalActionText);
    setInfoModalState(true);
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route
          path="/dashboard"
          element={
            <Dashboard
              showSuccessModal={showSuccessModal}
              showErrorModal={showErrorModal}
              showInfoModal={showInfoModal}
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
              showInfoModal={showInfoModal}
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
  );
}

export default App;
