import { useEffect, useRef, useState } from "react";
import { IconContext } from "react-icons";
import { BsCameraVideoOffFill, BsFillMicMuteFill } from "react-icons/bs";
import { ImPhoneHangUp } from "react-icons/im";
import { IoVideocamOff } from "react-icons/io5";
import { IMessageStore, IPeerStore, ModalTypes } from "../../../core/dtos";
import { useMessageStore, useRouterStore } from "../../../core/store";
import { usePeerStore } from "../../../core/store/peerStore";
import { useSocketStore } from "../../../core/store/socketStore";

type Props = {};

interface ILocalCam {
  localCam: any;
}

interface IGuestCam {
  guestCam: any;
  peerStore: IPeerStore;
  statusMessage: string;
}

interface IVideoCallAccept {
  peerId: string;
}

const VideoCall = (props: Props) => {
  const peerStore = usePeerStore();
  const [localCam, setlocalCam] = useState<any>();
  const [guestCam, setGuestCam] = useState<any>();
  const [statusMessage, setStatus] = useState("Calling..");
  const currentCall = useRef<any>();
  const messageStore = useMessageStore();
  const socketStore = useSocketStore();
  const modalsStore = useRouterStore();
  const stream = useRef<any>();
  const setModals = useRouterStore((state) => state.setModals);

  function openStream() {
    const constraints = {
      audio: true,
      video: true,
    };
    stream.current = navigator.mediaDevices.getUserMedia(constraints);
    return stream.current;
  }

  async function endCall() {
    const stream: any = document.getElementById("localCam");
    const tracks = stream.srcObject.getTracks();
    tracks.forEach((track: any) => {
      track.stop();
    });
    stream.srcObject = null;
    try {
      currentCall.current?.close();
    } catch (error) {
      currentCall.current = undefined;
    }
    setModals(ModalTypes.none);
  }

  const callVideo = ({
    peerId,
    setlocalCam,
    setGuestCam,
  }: {
    peerId: string;
    setlocalCam: any;
    setGuestCam: any;
  }) => {
    openStream()
      .then((stream: any) => {
        setlocalCam(stream);
        const localCam: any = document.getElementById("localCam");
        localCam.srcObject = stream;

        const call = peerStore.peerClient.call(peerId, stream);
        call.on("stream", (remoteStream: any) => {
          console.log(remoteStream);
          const remoteCam: any = document.getElementById("remoteCam");
          remoteCam.srcObject = remoteStream;
          setGuestCam(remoteStream);
        });
        currentCall.current = call;
        console.log("current call: " + currentCall);
      })
      .catch((error: any) => {
        console.error(error);
      });
  };

  useEffect(() => {
    socketStore.socket.current?.on("onVideoCallRejected", () => {
      setStatus("Rejected");
      setTimeout(() => {
        modalsStore.setModals(ModalTypes.none);
      }, 3000);
    });

    socketStore.socket.current?.on(
      "onVideoCallAccept",
      (data: IVideoCallAccept) => {
        callVideo({ peerId: data.peerId, setlocalCam, setGuestCam });
      }
    );

    socketStore.socket.current?.on("onVideoCallHangUp", () => endCall());

    peerStore.peerClient?.on("call", async (call: any) => {
      openStream().then((stream: any) => {
        call.answer(stream);
        currentCall.current = call;
        const localCam: any = document.getElementById("localCam");
        localCam.srcObject = stream;
        call.on("stream", (remoteStream: any) => {
          const remoteCam: any = document.getElementById("remoteCam");
          remoteCam.srcObject = remoteStream;
          setGuestCam(remoteStream);
        });
      });
    });

    return () => {
      socketStore.socket.current?.off("onVideoCallRejected");
      socketStore.socket.current?.off("onVideoCallAccept");
      endCall();
    };
  }, []);

  return (
    <div className="w-screen h-screen bg-black/30 relative">
      <div className=" z-[2]">
        <GuestCam
          guestCam={guestCam}
          peerStore={peerStore}
          statusMessage={statusMessage}
        />
      </div>
      <div className=" z-[100]">
        <ButtonFunctions
          socket={socketStore.socket}
          messageStore={messageStore}
          endCall={endCall}
        />
      </div>
      <div className=" z-[10]">
        <LocalCam localCam={localCam} />
      </div>
    </div>
  );
};

export default VideoCall;

const ButtonFunctions = ({
  socket,
  messageStore,
  endCall,
}: {
  socket: any;
  messageStore: IMessageStore;
  endCall: Function;
}) => {
  const handleEndCall = () => {
    endCall();
    socket.current?.emit("videoCallHangUp", {
      receiverId: messageStore.currentChatPerson?.id,
    });
  };
  return (
    <div className="absolute bottom-[40px] w-full flex flex-row items-center justify-center space-x-[16px] z-[10]">
      <div
        className=" w-[45px] h-[45px] bg-[#333333] flex cursor-pointer
            items-center justify-center rounded-full"
      >
        <IconContext.Provider
          value={{
            color: "#717171",
            size: "1.35rem",
          }}
        >
          <IoVideocamOff />
        </IconContext.Provider>
      </div>
      <div
        className=" w-[45px] h-[45px] bg-[#333333] flex cursor-pointer
            items-center justify-center rounded-full"
      >
        <IconContext.Provider
          value={{
            color: "#717171",
            size: "1.35rem",
          }}
        >
          <BsFillMicMuteFill />
        </IconContext.Provider>
      </div>
      <div
        className=" w-[45px] h-[45px] bg-[#FF443D] flex cursor-pointer
            items-center justify-center rounded-full pb-[4px]"
        onClick={handleEndCall}
      >
        <IconContext.Provider
          value={{
            color: "#FFFFFF",
            size: "1.6rem",
          }}
        >
          <ImPhoneHangUp />
        </IconContext.Provider>
      </div>
    </div>
  );
};

const LocalCam = ({ localCam }: ILocalCam) => {
  return (
    <div
      className=" w-[380px] h-[215px] rounded-[18px] bg-black 
            absolute bottom-[20px] right-[20px] overflow-hidden "
    >
      <video
        id="localCam"
        src={localCam}
        controls={false}
        autoPlay
        className="w-full h-full object-cover"
      />
    </div>
  );
};

const GuestCam = ({ guestCam, peerStore, statusMessage }: IGuestCam) => {
  if (!peerStore.fetching) {
    return (
      <div className="relative h-screen">
        <div className="flex flex-col items-center justify-center h-full">
          <img
            src="https://i.pinimg.com/564x/fa/37/42/fa37424863aefb73ab461b4576ae1a76.jpg"
            alt="avatar"
            className="w-[120px] h-[120px] rounded-full"
          />
          <p className=" dark:text-white text-[20px] font-medium mt-[15px]">
            Username
          </p>
          <p className=" text-[12px] leading-[10px] text-[#B1B3B9] mb-[100px]">
            {statusMessage}
          </p>
        </div>
        <div className="w-full h-full absolute top-0 bottom-0 ">
          <video
            id="remoteCam"
            src={guestCam}
            controls={false}
            autoPlay
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    );
  }
  return <div></div>;
};
