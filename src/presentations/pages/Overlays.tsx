import { IRouterStore, ModalTypes } from "../../core/dtos";
import { useRouterStore } from "../../core/store";
import UploadAvatarModel from "../components/Modals/UploadAvatarModel";

export default function Overlays() {
  const routerStore = useRouterStore();

  if (routerStore.modals == ModalTypes.none) return <></>;
  else
    return (
      <div
        className="w-screen h-screen flex backdrop-blur-[8px] bg-black/5
          absolute top-0 bottom-0 right-0 left-0 z-[10000] items-center justify-center"
          onClick={() => routerStore.setModals(ModalTypes.none)}
      >
        <div onClick={(e) => e.stopPropagation()}>
          <ModalContent routerStore={routerStore} />
        </div>
      </div>
    );
}



const ModalContent = ({ routerStore }: { routerStore: IRouterStore }) => {
  switch (routerStore.modals) {
    case ModalTypes.uploadAvatar:
      return <UploadAvatarModel />;
    default:
      return <></>;
  }
};
