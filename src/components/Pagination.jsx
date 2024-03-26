import { useEffect, useState } from "react";
import Pagination from "react-bootstrap/Pagination";
import FormSelect from "react-bootstrap/esm/FormSelect";

function PaginationComponent(props) {
  const [prevState, setPrevState] = useState(false);
  const [nextState, setNextState] = useState(false);

  useEffect(() => {
    if (props.currentPageIndex === 0) {
      setPrevState(true);
    } else {
      setPrevState(false);
    }

    if (
      props.currentPageIndex === props.lastPageIndex - 1 ||
      props.lastPageIndex === 0
    ) {
      setNextState(true);
    } else {
      setNextState(false);
    }
  }, [props.currentPageIndex, props.lastPageIndex]);

  return (
    <div className="mt-3 mb-3 d-flex justify-content-between">
      <Pagination>
        <Pagination.First
          disabled={prevState}
          onClick={async () => {
            await props.setCurrentPageIndex(0);
          }}
        />
        <Pagination.Prev
          disabled={prevState}
          onClick={async () => {
            if (props.currentPageIndex > 0) {
              await props.setCurrentPageIndex(props.currentPageIndex - 1);
            }
          }}
        />
        <Pagination.Item active>
          Page {props.currentPageIndex + 1} of {props.lastPageIndex}
        </Pagination.Item>
        <Pagination.Next
          disabled={nextState}
          onClick={async () => {
            if (props.currentPageIndex < props.lastPageIndex - 1) {
              await props.setCurrentPageIndex(props.currentPageIndex + 1);
            }
          }}
        />
        <Pagination.Last
          disabled={nextState}
          onClick={async () => {
            await props.setCurrentPageIndex(props.lastPageIndex - 1);
          }}
        />
      </Pagination>

      <div>
        <FormSelect
          value={props.recordsPerPage}
          onChange={(e) => {
            props.setRecordsPerPage(e.target.value);
          }}>
          <option value="10">10 per page</option>
          <option value="50">50 per page</option>
          <option value="100">100 per page</option>
        </FormSelect>
      </div>
    </div>
  );
}

export default PaginationComponent;
