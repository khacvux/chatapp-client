import React, { useEffect, useRef, useState } from "react";
import { IconContext } from "react-icons";
import { IoClose, IoVideocam } from "react-icons/io5";
import {
  IRouterStore,
  ModalTypes,
  SystemThemeTypes,
  ThemeTypes,
} from "../../../core/dtos";
import {
  useAuthStore,
  usePreferenceStore,
  useRouterStore,
} from "../../../core/store";
import FbCall from "../../../assets/sounds/facebook_call.mp3";
import { useSocketStore } from "../../../core/store/socketStore";
import { ISocketStore } from "../../../core/dtos/socketDto";
import { usePeerStore } from "../../../core/store/peerStore";

const AnsweringACall = () => {
  const theme = usePreferenceStore((state) => state.theme);
  const systemTheme = usePreferenceStore((state) => state.systemTheme);
  const modalsStore = useRouterStore();
  const fbCall = useRef(new Audio(FbCall));
  const socketStore = useSocketStore();
  const userId = useAuthStore((state) => state.id);
  const peerId = usePeerStore((state) => state.peerId);

  useEffect(() => {
    fbCall.current.play();
    return () => {
      if (fbCall) {
        fbCall.current.pause();
      }
    };
  }, []);

  const close = () => {
    modalsStore.setModals(ModalTypes.none);
  };

  return (
    <div
      className="md:w-[250px] w-[100vw] md:h-[40vh] h-[100vh] bg-white
      md:rounded-[20px] relative px-[30px] overflow-hidden dark:bg-[#242526]"
    >
      <div
        className=" w-[30px] h-[30px] flex justify-center items-center absolute top-[5px] 
        right-[5px] cursor-pointer hover:bg-[#F2F2F2] rounded-full transition-all 
        z-[10001] dark:hover:bg-[#38393A]"
        onClick={close}
      >
        <IconContext.Provider
          value={{
            color:
              theme == ThemeTypes.System
                ? systemTheme == SystemThemeTypes.Dark
                  ? "#E4E6EA"
                  : "#000"
                : theme == ThemeTypes.Dark
                ? "#E4E6EA"
                : "#000",
            size: "1.3rem",
          }}
        >
          <IoClose />
        </IconContext.Provider>
      </div>
      <div className="w-full h-full flex flex-col items-center justify-between py-[60px]">
        <div className="flex flex-col items-center">
          <img
            src={
              modalsStore.caller?.avatar
                ? modalsStore.caller.avatar
                : "https://i.pinimg.com/564x/7a/18/30/7a1830beb10930bd2425d949831ecfca.jpg"
            }
            alt="avatar"
            className="w-[60px] h-[60px] rounded-full"
          />
          <p className=" text-[18px] font-medium dark:text-white text-center leading-[24px] mt-[20px] mb-[10px]">
            {modalsStore.caller?.username} is calling you
          </p>
          <p className="text-[#65676B] leading-[13px] text-center text-[11px] dark:text-[#B1B3B9]">
            The call will start as soon as you accept
          </p>
        </div>

        <div className="flex flex-row items-center justify-center space-x-10">
          <DeclineVideoCall
            modalsStore={modalsStore}
            socketStore={socketStore}
            userId={userId}
          />
          <AcceptVideoCall
            modalsStore={modalsStore}
            socketStore={socketStore}
            peerId={peerId}
          />
        </div>
      </div>
    </div>
  );
};

export default AnsweringACall;

const DeclineVideoCall = ({
  modalsStore,
  socketStore,
  userId,
}: {
  modalsStore: IRouterStore;
  socketStore: ISocketStore;
  userId: number | undefined;
}) => {
  const handleDecline = () => {
    socketStore.socket.current?.emit("videoCallRejected", {
      recipientId: userId,
      callerId: modalsStore.caller?.id,
    });
    modalsStore.setModals(ModalTypes.none);
  };
  return (
    <div className="flex flex-col items-center justify-center">
      <div
        className=" w-[35px] h-[35px] rounded-full bg-[#FF443D] hover:bg-[#F24139]
               flex flex-row items-center justify-center cursor-pointer"
        onClick={handleDecline}
      >
        <IconContext.Provider
          value={{
            color: "#E4E6EA",
            size: "1.3rem",
          }}
        >
          <IoClose />
        </IconContext.Provider>
      </div>
      <p className="dark:text-[#DEDFE3] text-[11px]">Decline</p>
    </div>
  );
};

const AcceptVideoCall = ({
  modalsStore,
  socketStore,
  peerId,
}: {
  modalsStore: IRouterStore;
  socketStore: ISocketStore;
  peerId: string | undefined;
}) => {
  const handleAccept = () => {
    socketStore.socket.current?.emit("videoCallAccepted", {
      peerId: peerId,
      callerId: modalsStore.caller?.id,
    });
    modalsStore.setModals(ModalTypes.VideoCall);
  };
  return (
    <div className="flex flex-col items-center justify-center">
      <div
        className=" w-[35px] h-[35px] rounded-full bg-[#32CC46] hover:bg-[#30C242]
        flex flex-row items-center justify-center cursor-pointer"
        onClick={handleAccept}
      >
        <IconContext.Provider
          value={{
            color: "#E4E6EA",
            size: "1.3rem",
          }}
        >
          <IoVideocam />
        </IconContext.Provider>
      </div>
      <p className="dark:text-[#DEDFE3] text-[11px]">Accept</p>
    </div>
  );
};
