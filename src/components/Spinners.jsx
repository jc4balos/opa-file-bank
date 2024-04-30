import Spinner from "react-bootstrap/Spinner";

const BasicSpinner = () => {
  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{ height: "100vh" }}>
      <Spinner animation="border" role="status">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    </div>
  );
};

const FullScreenLoading = () => {
  return (
    <div className="loading-bg">
      <BasicSpinner />
    </div>
  );
};

export { BasicSpinner, FullScreenLoading };
