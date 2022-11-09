import { MdInfo } from "react-icons/md";
import { BsTelephoneFill, BsPlusCircleFill } from "react-icons/bs";
import { IconContext } from "react-icons";
import { HiVideoCamera } from "react-icons/hi";
import { IoImage, IoSend } from "react-icons/io5";
import { HiGif } from "react-icons/hi2";
import { FaSmile } from "react-icons/fa";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import { useMessageStore } from "../../../core/store/messageStore";
import {
  IAuth,
  ICurrentChatPerson,
  IMessage,
  IMessageStore,
} from "../../../core/dtos";
import { useAuthStore } from "../../../core/store";
import { Socket } from "socket.io-client";
import Picker from "emoji-picker-react";

export default function ChatContainer({
  socket,
}: {
  socket: Socket | undefined;
}) {
  const messageStore = useMessageStore();
  const authStore = useAuthStore();

  useEffect(() => {
    messageStore.fetchChats({
      receiverId: Number(messageStore.currentChatPerson?.id),
      access_token: authStore.access_token,
    });
  }, [messageStore.currentChatPerson]);

  useEffect(() => {
    socket?.on("receiveMessage", (data) => {
      messageStore.fetchChats({
        receiverId: Number(messageStore.currentChatPerson?.id),
        access_token: authStore.access_token,
      });
      console.log(data);
    });
  }, []);
  return (
    <div className=" flex-1 h-screen relative dark:bg-[#242526]">
      <div
        className="absolute top-0 left-0 w-full flex flex-row items-center 
          backdrop-blur-2xl bg-white/20 z-[9999] "
      >
        <Header
          id={messageStore.currentChatPerson?.id}
          username={messageStore.currentChatPerson?.username}
        />
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
          currentListMessage={messageStore?.currentListMessage}
          authStore={authStore}
          id={messageStore.currentChatPerson?.id}
        />
      </div>
      <div className=" absolute bottom-0 left-0 w-full bg-white h-[60px]">
        <InputArea
          authStore={authStore}
          socket={socket}
          receiverId={messageStore.currentChatPerson?.id}
          messageStore={messageStore}
        />
      </div>
    </div>
  );
}

function Header({ id, username }: ICurrentChatPerson) {
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
            {username}
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
        <div className=" w-[36px] h-[36px] hover:bg-[#f0f2f5] dark:hover:bg-[#4E4F50] rounded-full flex justify-center items-center cursor-pointer transition-all">
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
  receiverId,
  messageStore,
}: {
  authStore: IAuth;
  socket: Socket | undefined;
  receiverId: number | undefined;
  messageStore: IMessageStore;
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
    if (inputMessage.length && receiverId) {
      socket?.emit("sendMessage", {
        access_token: authStore.access_token,
        to: receiverId,
        msg: inputMessage,
      });
      messageStore.pushMessageItem({
        from: authStore.id,
        to: receiverId,
        msg: inputMessage,
        createdAt: String(Date.now()),
        id: undefined,
      });
      setShowEmojiPicker(false);
      setInputMessage("");
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
  id,
}: {
  currentListMessage: [IMessage] | undefined;
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
        <div key={message.createdAt} ref={scrollRef}>
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
              id={id}
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
  id,
}: {
  message: IMessage;
  index: number;
  currentListMessage: [IMessage];
  id: number | undefined;
}) {
  return (
    <div className=" flex flex-row items-center justify-start">
      {currentListMessage[index + 1]?.from == id ? (
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
            currentListMessage[index - 1]?.from == id
              ? "rounded-tl-md mt-[1px]"
              : "my-0.5 "
          }
          ${
            currentListMessage[index + 1]?.from == id
              ? "rounded-bl-md mb-[1px]"
              : "my-0.5 "
          }
      `}
      >
        <p className="leading-[20.1px] text-[15px] md:max-w-[588px] max-w-full break-words dark:text-[#E4E6EA]">
          {message.msg}
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
  message: IMessage;
  index: number;
  currentListMessage: [IMessage];
  id: number | undefined;
}) {
  return (
    <div className=" flex flex-row items-end justify-end">
      <div
        className={` px-[12px] py-[8px] rounded-[18px] bg-[#0084FF] md:max-w-[588px] max-w-full h-fit
         ${
           currentListMessage[index - 1]?.to == id
             ? "rounded-tr-md mt-[1px]"
             : "mt-[10px]"
         }
        ${
          currentListMessage[index + 1]?.to == id
            ? "rounded-br-md mb-[1px]"
            : "mb-[10px]"
        }
      `}
      >
        <p className="leading-[20.1px] text-[15px] text-[#fff] md:max-w-[588px] max-w-full  break-words">
          {message.msg}
        </p>
      </div>
    </div>
  );
}
