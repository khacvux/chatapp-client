import { IUser } from "./authDto";

export enum CurrentRoutType {
  Chatbox = "CHATBOX",
  Friends = "FRIENDS",
  Notifies = "NOTIFIES",
  Profile = "PROFILE",
}


export enum ModalTypes {
  none = "NONE",
  uploadAvatar = "UPLOAD_AVATAR",
  CreateGroup = "CREATE_GROUP",
  Preferences = "PREFERENCES",
  VideoCall = "VIDEO_CALL",
  AnsweringACall = "ANSWERING_A_CALL",
}

export interface IRouterStore {
  currentRoute: CurrentRoutType;
  modals: ModalTypes;
  caller?: IUser;
  setModals: (type: ModalTypes) => void;
  setCurrentRoute: (route: CurrentRoutType) => void;
  setCaller: (caller: IUser) => void;
}
