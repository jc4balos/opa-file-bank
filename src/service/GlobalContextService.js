import { Context } from "../App";

export class GlobalContextService {
  constructor() {
    const { infoModal, errorModal, successModal, userData, previewModal } =
      useContext(Context);
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

    const [setErrorData, setErrorModalState] = errorModal;
    const [setSuccessData, setSuccessModalState] = successModal;

    const [
      setPreviewModalState,
      setPreviewBinary,
      setPreviewModalAction,
      setPreviewFileType,
      setPreviewFileName,
    ] = previewModal;

    const [
      setUserFullName,
      setUserName,
      setUserTitle,
      setUserId,
      setAccessLevelId,
    ] = userData;

    this.infoModalState = infoModalState;
    this.setInfoModalState = setInfoModalState;
    this.infoModalHeading = infoModalHeading;
    this.setInfoModalHeading = setInfoModalHeading;
    this.infoModalMessage = infoModalMessage;
    this.setInfoModalMessage = setInfoModalMessage;
    this.infoModalAction = infoModalAction;
    this.setInfoModalAction = setInfoModalAction;
    this.infoModalActionText = infoModalActionText;
    this.setInfoModalActionText = setInfoModalActionText;

    this.setErrorData = setErrorData;
    this.setErrorModalState = setErrorModalState;
    this.setSuccessData = setSuccessData;
    this.setSuccessModalState = setSuccessModalState;

    this.setPreviewModalState = setPreviewModalState;
    this.setPreviewBinary = setPreviewBinary;
    this.setPreviewModalAction = setPreviewModalAction;
    this.setPreviewFileType = setPreviewFileType;
    this.setPreviewFileName = setPreviewFileName;

    this.setUserFullName = setUserFullName;
    this.setUserName = setUserName;
    this.setUserTitle = setUserTitle;
    this.setUserId = setUserId;
    this.setAccessLevelId = setAccessLevelId;
  }
}
