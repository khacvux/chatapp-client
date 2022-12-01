export enum ToastTypes {
    none = "NONE",
    UserUnvailable = "USER_UNVAILABLE"
}

export interface IToastStore {
    toast: ToastTypes,
    setToast: (type: ToastTypes) => void,
}