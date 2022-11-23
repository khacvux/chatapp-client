import { IconContext } from "react-icons";
import { Socket } from "socket.io-client";
import { MdInfo } from "react-icons/md";
import { BsTelephoneFill, BsPlusCircleFill } from "react-icons/bs";
import { HiVideoCamera } from "react-icons/hi";
import { IoImage, IoSend } from "react-icons/io5";
import { HiGif } from "react-icons/hi2";
import { FaSmile } from "react-icons/fa";
import Picker from "emoji-picker-react";
import { ChangeEvent, Dispatch, useEffect, useRef, useState } from "react";
import GroupChatInfo from "../ChatboxInfo/GroupChatInfo";
import { useLocation } from "react-router-dom";
import { IAuth, IGroup, IGroupMessage } from "../../../core/dtos";
import { useAuthStore } from "../../../core/store";
import { useGroupMessageStore } from "../../../core/store/groupMessageStore";

export default function GroupChatContainer({
  socket,
}: {
  socket: Socket | undefined;
}) {
  const authStore = useAuthStore();
  const [openInfo, setOpenInfo] = useState<Boolean>(false);
  const location: any = useLocation();
  const group: IGroup = location.state?.group;
  const groupMessageStore = useGroupMessageStore();

  useEffect(() => {
    groupMessageStore.fetchGroupMessages(authStore.access_token, group.id);
  }, [group.id]);

  return (
    <div className=" flex-1 h-screen dark:bg-[#242526] flex flex-row">
      <div className="relative flex-1">
        <div
          className="absolute top-0 left-0 w-full flex flex-row items-center 
          backdrop-blur-2xl bg-white/20 z-[9999] "
        >
          <Header openInfo={openInfo} setOpenInfo={setOpenInfo} group={group} />
        </div>
        <div className="w-full h-chat-container flex flex-col overflow-y-scroll overflow-x-hidden hide-scrollbar">
          <div className="w-full h-full min-h-[450px] flex flex-col items-center justify-center ">
            <div className="relative w-[200px] h-[100px] flex items-center justify-center ">
              <img
                src="https://i.pinimg.com/564x/fe/f9/e5/fef9e5889245360d5df507be59276e17.jpg"
                alt="avatar"
                className="w-[100px] h-[100px] rounded-full border-[4px] border-white absolute 
              right-[90px] dark:border-[#242526]"
              />
              <img
                src="https://i.pinimg.com/564x/fe/f9/e5/fef9e5889245360d5df507be59276e17.jpg"
                alt="avatar"
                className="w-[100px] h-[100px] rounded-full border-[4px] border-white absolute 
              left-[90px] dark:border-[#242526]"
              />
            </div>
          </div>
          <MessageContainer
            currentListMessage={groupMessageStore.currentListGroupMessage}
            authStore={authStore}
            id={authStore.id}
          />
        </div>
        <div className=" absolute bottom-0 left-0 w-full bg-white h-[60px]">
          <InputArea
            authStore={authStore}
            socket={socket}
            groupId={group.id}
            // id={authStore.id}
          />
        </div>
      </div>
      {openInfo ? <GroupChatInfo /> : <></>}
    </div>
  );
}

function Header({
  setOpenInfo,
  openInfo,
  group,
}: {
  setOpenInfo: Dispatch<Boolean>;
  openInfo: Boolean;
  group: IGroup;
}) {
  return (
    <div
      className="w-full flex flex-row items-center justify-between px-[16px] py-[10px]
              border-b border-[#bec0c3] dark:border-[#2F3031] dark:bg-[#242526]"
    >
      <div className="flex flex-row items-center space-x-[6px] ">
        <img
          src="https://i.pinimg.com/564x/fe/f9/e5/fef9e5889245360d5df507be59276e17.jpg"
          alt="avatar"
          className=" w-[40px] h-[40px] rounded-full object-cover border-[1px] border-[#bec0c3] dark:border-[#242526]"
        />
        <div className="">
          <p className=" text-[14px] text-[#050505] dark:text-[#b0b3b8] leading-[18.66px] truncate">
            {group.title ? group.title : "Untitled group"}
          </p>
          <p className=" text-[10.5px] text-[#65676b] dark:text-[#b0b3b8] leading-[14.76px]">
            active
          </p>
        </div>
      </div>

      <div className="flex flex-row items-center space-x-[12px]">
        <div className=" w-[36px] h-[36px] hover:bg-[#f0f2f5] dark:hover:bg-[#4E4F50] rounded-full flex justify-center items-center cursor-pointer transition-all">
          <IconContext.Provider value={{ color: "#0084ff", size: "1.3rem" }}>
            <BsTelephoneFill />
          </IconContext.Provider>
        </div>
        <div className=" w-[36px] h-[36px] hover:bg-[#f0f2f5] dark:hover:bg-[#4E4F50] rounded-full flex justify-center items-center cursor-pointer transition-all">
          <IconContext.Provider value={{ color: "#0084ff", size: "1.7rem" }}>
            <HiVideoCamera />
          </IconContext.Provider>
        </div>
        <div
          className=" w-[36px] h-[36px] hover:bg-[#f0f2f5] dark:hover:bg-[#4E4F50] rounded-full flex justify-center items-center cursor-pointer transition-all"
          onClick={() => setOpenInfo(!openInfo)}
        >
          <IconContext.Provider value={{ color: "#0084ff", size: "1.4rem" }}>
            <MdInfo />
          </IconContext.Provider>
        </div>
      </div>
    </div>
  );
}

function InputArea({
  authStore,
  socket,
  groupId,
}: {
  authStore: IAuth;
  socket: Socket | undefined;
  groupId: number | undefined;
}) {
  const [inputMessage, setInputMessage] = useState("");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  const handleEmojiClick = (emojiObject: any) => {
    const message = inputMessage + emojiObject.emoji;
    setInputMessage(message);
  };

  const handleTexting = (event: ChangeEvent<HTMLInputElement>) => {
    setInputMessage(event.target.value);
  };

  const handleEnter = (event: any) => {
    if (event.code == "Enter") {
      handleSendMessage();
    }
  };

  const handleSendMessage = () => {
    if (inputMessage.length && groupId) {
      socket?.emit("group.message.create", {
        access_token: authStore.access_token,
        groupId: groupId,
        message: inputMessage,
      });
      //   messageStore.pushMessageItem({
      //     from: authStore.id,
      //     to: receiverId,
      //     msg: inputMessage,
      //     createdAt: String(Date.now()),
      //     id: Math.random()
      //   });
      setShowEmojiPicker(false);
      setInputMessage("");
      // }
    }
  };

  return (
    <div className=" p-[12px] flex flex-row items-center space-x-[10px] relative dark:bg-[#242526]">
      <div className="flex flex-row items-center space-x-[2px]">
        <div className=" w-[36px] h-[36px] hover:bg-[#f0f2f5] dark:hover:bg-[#4E4F50] rounded-full flex justify-center items-center cursor-pointer transition-all">
          <IconContext.Provider value={{ color: "#0084ff", size: "1.3rem" }}>
            <BsPlusCircleFill />
          </IconContext.Provider>
        </div>
        {inputMessage ? null : (
          <div className="flex flex-row items-center space-x-[2px]">
            <div className=" w-[36px] h-[36px] hover:bg-[#f0f2f5] dark:hover:bg-[#4E4F50] rounded-full flex justify-center items-center cursor-pointer transition-all">
              <IconContext.Provider
                value={{ color: "#0084ff", size: "1.6rem" }}
              >
                <IoImage />
              </IconContext.Provider>
            </div>
            <div className=" w-[36px] h-[36px] hover:bg-[#f0f2f5] dark:hover:bg-[#4E4F50] rounded-full flex justify-center items-center cursor-pointer transition-all">
              <IconContext.Provider
                value={{ color: "#0084ff", size: "1.7rem" }}
              >
                <HiGif />
              </IconContext.Provider>
            </div>
          </div>
        )}
      </div>

      <div className="flex-1 flex flex-row items-center justify-between space-x-2 bg-[#f0f2f5] dark:bg-[#3A3B3C] dark:text-[#E4E6EA] rounded-full overflow-hidden pl-[12px] ">
        <input
          type="text"
          placeholder="Aa"
          className=" bg-inherit flex-1 outline-none"
          value={inputMessage}
          onChange={(event) => handleTexting(event)}
          onKeyPress={(event) => handleEnter(event)}
        />
        <div
          className=" w-[36px] h-[36px] hover:bg-[#f0f2f5] dark:hover:bg-[#4E4F50] rounded-full flex justify-center items-center cursor-pointer transition-all"
          onClick={() => setShowEmojiPicker(!showEmojiPicker)}
        >
          <IconContext.Provider value={{ color: "#0084ff", size: "24px" }}>
            <FaSmile />
          </IconContext.Provider>
        </div>

        {!showEmojiPicker ? (
          <></>
        ) : (
          <div
            className="hidden lg:block absolute rounded-lg shadow-lg shadow-[#ccc] dark:shadow-[#3A3B3C]"
            style={{ bottom: 55, right: 60 }}
          >
            <Picker
              width={"30vw"}
              height={"50vh"}
              onEmojiClick={handleEmojiClick}
            />
          </div>
        )}
      </div>

      <div
        className=" w-[36px] h-[36px] hover:bg-[#f0f2f5] dark:hover:bg-[#4E4F50] rounded-full flex justify-center items-center cursor-pointer transition-all relative"
        onClick={handleSendMessage}
      >
        <div className="px-[2px]" />
        <IconContext.Provider value={{ color: "#0084ff", size: "24px" }}>
          <IoSend />
        </IconContext.Provider>
      </div>
    </div>
  );
}

function MessageContainer({
  currentListMessage,
  authStore,
  id
}:
{
  currentListMessage: [IGroupMessage] | undefined;
  authStore: IAuth;
  id: number | undefined;
}) {
  const scrollRef = useRef<any>();

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [currentListMessage?.length]);

  return (
    <div className=" w-full h-fit flex flex-col justify-end  pl-[14px] pr-[22px]">
      {currentListMessage?.map((message, index) => (
        <div key={message.id} ref={scrollRef}>
          {message.from == authStore.id ? (
            <RightMessageItem
              message={message}
              index={index}
              currentListMessage={currentListMessage}
              id={id}
            />
          ) : (
            <LeftMessageItem
              message={message}
              index={index}
              currentListMessage={currentListMessage}
            />
          )}
        </div>
      ))}
    </div>
  );
}


function LeftMessageItem({
  message,
  index,
  currentListMessage,
}: {
  message: IGroupMessage;
  index: number;
  currentListMessage: [IGroupMessage];
}) {
  return (
    <div className=" flex flex-row items-center justify-start">
      {currentListMessage[index + 1]?.from == message.from ? (
        <div className="hidden md:block w-[28px] h-[28px] mx-[8px]" />
      ) : (
        <img
          src="https://i.pinimg.com/564x/fe/f9/e5/fef9e5889245360d5df507be59276e17.jpg"
          alt="avatar"
          className=" w-[28px] h-[28px] rounded-full mx-[8px] md:block hidden"
        />
      )}
      <div
        className={`px-[12px] py-[8px] rounded-[18px] bg-[#f0f2f5] dark:bg-[#3E4042] 
        md:max-w-[588px] max-w-full h-fit
          ${
            currentListMessage[index - 1]?.from == message.from 
              ? "rounded-tl-md mt-[1px]"
              : "my-0.5 "
          }
          ${
            currentListMessage[index + 1]?.from == message.from 
              ? "rounded-bl-md mb-[1px]"
              : "my-0.5 "
          }
      `}
      >
        <p className="leading-[20.1px] text-[15px] md:max-w-[588px] max-w-full break-words dark:text-[#E4E6EA]">
          {message.message}
        </p>
      </div>
    </div>
  );
}

function RightMessageItem({
  message,
  index,
  currentListMessage,
  id,
}: {
  message: IGroupMessage;
  index: number;
  currentListMessage: [IGroupMessage];
  id: number | undefined;
}) {
  return (
    <div className=" flex flex-row items-end justify-end">
      <div
        className={` px-[12px] py-[8px] rounded-[18px] bg-[#0084FF] md:max-w-[588px] max-w-full h-fit
         ${
           currentListMessage[index - 1]?.from == id
             ? "rounded-tr-md mt-[1px]"
             : "mt-[10px]"
         }
        ${
          currentListMessage[index + 1]?.from == id
            ? "rounded-br-md mb-[1px]"
            : "mb-[10px]"
        }
      `}
      >
        <p className="leading-[20.1px] text-[15px] text-[#fff] md:max-w-[588px] max-w-full  break-words">
          {message.message}
        </p>
      </div>
    </div>
  );
}
