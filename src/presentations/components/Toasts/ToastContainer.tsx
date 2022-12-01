import { ToastTypes } from "../../../core/dtos";
import { useToastStore } from "../../../core/store/toastStore";
import UserUnvailable from "./UserUnvailable";

type Props = {};

const ToastContainer = (props: Props) => {
  const toastStore = useToastStore();

  const close = () => {
    toastStore.setToast(ToastTypes.none);
  };
  if (toastStore.toast == ToastTypes.none) return <></>;
  return (
    <div
      className="absolute z-[99999] top-5 right-5 bg-[#91918f3c] w-[350px] backdrop-blur-[8px]
        py-[12px] px-[12px] rounded-lg dark:bg-black/50 dark:text-white group
    "
    >
      <ToastContent toast={toastStore.toast} />
      <div
        className="hidden group-hover:flex absolute top-0 right-[6px] transition-all
         p-[5px] rounded-full cursor-pointer h-full items-center justify-center"
        onClick={close}
      >
        <div className=" backdrop-blur-[8px] bg-white/80 dark:bg-black/50 rounded-[8px]">
          <p className=" px-[10px] leading-[24px] text-[12px]">Close</p>
        </div>
      </div>
    </div>
  );
};

export default ToastContainer;

const ToastContent = ({ toast }: { toast: ToastTypes }) => {
  switch (toast) {
    case ToastTypes.UserUnvailable:
      return <UserUnvailable />;
    default:
      return <></>;
  }
};
