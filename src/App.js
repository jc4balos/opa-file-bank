import { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import { ErrorModal } from "./components/ErrorModal";
import { SuccessModal } from "./components/SuccessModal";
import { Dashboard } from "./pages/Dashboard";
import { Login } from "./pages/Login";

function App() {
  const [errorModalState, setErrorModalState] = useState(false);
  const [errorData, setErrorData] = useState([]);
  const [successModalState, setSuccessModalState] = useState(false);
  const [successData, setSuccessData] = useState([]);

  const showSuccessModal = (message) => {
    setSuccessData(message);
    setSuccessModalState(true);
  };

  const showErrorModal = (message) => {
    setErrorData(message);
    setErrorModalState(true);
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
    </BrowserRouter>
  );
}

export default App;
