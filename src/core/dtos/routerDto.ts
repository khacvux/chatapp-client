export enum CurrentRoutType {
  Chatbox = "CHATBOX",
  Friends = "FRIENDS",
  Notifies = "NOTIFIES",
  Profile = "PROFILE",
}

export enum ModalTypes {
  none = "NONE",
  uploadAvatar = "UPLOAD_AVATAR",
}

export interface IRouterStore {
  currentRoute: CurrentRoutType;
  modals: ModalTypes;
  setModals: (type: ModalTypes) => void;
  setCurrentRoute: (route: CurrentRoutType) => void;
}
