import { MdInfo } from "react-icons/md";
import { BsTelephoneFill, BsPlusCircleFill } from "react-icons/bs";
import { IconContext } from "react-icons";
import { HiVideoCamera } from "react-icons/hi";
import { IoImage, IoSend } from "react-icons/io5";
import { HiGif } from "react-icons/hi2";
import { FaSmile } from "react-icons/fa";
import { ChangeEvent, useState } from "react";

export default function ChatContainer() {
  return (
    <div className=" flex-1 h-screen relative">
      <div className="absolute top-0 left-0 w-full flex flex-row items-center backdrop-blur-2xl bg-white/20">
        <Header />
      </div>
      <div className="w-full h-chat-container flex flex-col overflow-y-scroll hide-scrollbar">
        <MessageContainer />
      </div>
      <div className=" absolute bottom-0 left-0 w-full bg-white h-[60px]">
        <InputArea />
      </div>
    </div>
  );
}

function Header() {
  return (
    <div className="w-full flex flex-row items-center justify-between px-[16px] py-[10px] border-b border-[#bec0c3]">
      <div className="flex flex-row items-center space-x-[6px] ">
        <img
          src="https://i.pinimg.com/564x/01/93/92/019392073918e613036ef994832da503.jpg"
          alt="avatar"
          className=" w-[40px] h-[40px] rounded-full object-cover border-[1px] border-[#bec0c3]"
        />
        <div className="">
          <p className=" text-[14px] text-[#050505] leading-[18.66px]">
            test user
          </p>
          <p className=" text-[12px] text-[#65676b] leading-[14.76px]">
            active
          </p>
        </div>
      </div>

      <div className="flex flex-row items-center space-x-[12px]">
        <div className=" w-[36px] h-[36px] hover:bg-[#f0f2f5] rounded-full flex justify-center items-center cursor-pointer transition-all">
          <IconContext.Provider value={{ color: "#0084ff", size: "1.3rem" }}>
            <BsTelephoneFill />
          </IconContext.Provider>
        </div>
        <div className=" w-[36px] h-[36px] hover:bg-[#f0f2f5] rounded-full flex justify-center items-center cursor-pointer transition-all">
          <IconContext.Provider value={{ color: "#0084ff", size: "1.7rem" }}>
            <HiVideoCamera />
          </IconContext.Provider>
        </div>
        <div className=" w-[36px] h-[36px] hover:bg-[#f0f2f5] rounded-full flex justify-center items-center cursor-pointer transition-all">
          <IconContext.Provider value={{ color: "#0084ff", size: "1.4rem" }}>
            <MdInfo />
          </IconContext.Provider>
        </div>
      </div>
    </div>
  );
}

function InputArea() {
  const [inputMessage, setInputMessage] = useState("");
  const handleTexting = (event: ChangeEvent<HTMLInputElement>) => {
    setInputMessage(event.target.value);
  };

  return (
    <div className=" p-[12px] flex flex-row items-center space-x-[10px]">
      <div className="flex flex-row items-center space-x-[2px]">
        <div className=" w-[36px] h-[36px] hover:bg-[#f0f2f5] rounded-full flex justify-center items-center cursor-pointer transition-all">
          <IconContext.Provider value={{ color: "#0084ff", size: "1.3rem" }}>
            <BsPlusCircleFill />
          </IconContext.Provider>
        </div>
        {inputMessage ? null : (
          <div className="flex flex-row items-center space-x-[2px]">
            <div className=" w-[36px] h-[36px] hover:bg-[#f0f2f5] rounded-full flex justify-center items-center cursor-pointer transition-all">
              <IconContext.Provider
                value={{ color: "#0084ff", size: "1.6rem" }}
              >
                <IoImage />
              </IconContext.Provider>
            </div>
            <div className=" w-[36px] h-[36px] hover:bg-[#f0f2f5] rounded-full flex justify-center items-center cursor-pointer transition-all">
              <IconContext.Provider
                value={{ color: "#0084ff", size: "1.7rem" }}
              >
                <HiGif />
              </IconContext.Provider>
            </div>
          </div>
        )}
      </div>

      <div className="flex-1 flex flex-row items-center justify-between space-x-2 bg-[#f0f2f5] rounded-full overflow-hidden pl-[12px]">
        <input
          type="text"
          placeholder="Aa"
          className=" bg-inherit flex-1 outline-none"
          value={inputMessage}
          onChange={(event) => handleTexting(event)}
        />
        <div className=" w-[36px] h-[36px] hover:bg-[#f0f2f5] rounded-full flex justify-center items-center cursor-pointer transition-all">
          <IconContext.Provider value={{ color: "#0084ff", size: "24px" }}>
            <FaSmile />
          </IconContext.Provider>
        </div>
      </div>

      <div className=" w-[36px] h-[36px] hover:bg-[#f0f2f5] rounded-full flex justify-center items-center cursor-pointer transition-all relative">
        <div className="px-[2px]" />
        <IconContext.Provider value={{ color: "#0084ff", size: "24px" }}>
          <IoSend />
        </IconContext.Provider>
      </div>
    </div>
  );
}

function MessageContainer() {
  return (
    <div className=" w-full flex flex-col justify-end  pl-[14px] pr-[22px] space-y-1">
      <LeftMessageItem />
      <RightMessageItem />
      <LeftMessageItem />
      <RightMessageItem />
      <LeftMessageItem />
      <RightMessageItem />
      <LeftMessageItem />
      <RightMessageItem />
      <LeftMessageItem />
      <RightMessageItem />
      <LeftMessageItem />
      <RightMessageItem />
      <LeftMessageItem />
      <RightMessageItem />
      <LeftMessageItem />
      <RightMessageItem />
      <LeftMessageItem />
      <RightMessageItem />
    </div>
  );
}

function LeftMessageItem() {
  return (
    <div className=" flex flex-row items-end ">
      <img
        src="https://i.pinimg.com/564x/7b/87/3b/7b873bd30044685ab0cb0ae442d6750f.jpg"
        alt="avatar"
        className=" w-[28px] h-[28px] rounded-full mx-[8px]"
      />
      <div className=" px-[12px] py-[8px] rounded-[18px] bg-[#f0f2f5] md:max-w-[588px] max-w-full h-fit">
        <p className="leading-[20.1px] text-[15px] w-fit ">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugiat
          adipisci commodi sapiente quae architecto, recusandae odio cum ducimus
          numquam velit rerum quidem eveniet unde vero at. Magnam voluptatum
          doloremque ipsam? avatarLorem ipsum dolor sit amet consectetur
          adipisicing elit. Fugiat adipisci commodi sapiente quae architecto,
          recusandae odio cum ducimus numquam velit rerum quidem eveniet unde
          vero at. Magnam voluptatum doloremque ipsam? avatar
        </p>
      </div>
    </div>
  );
}

function RightMessageItem() {
  return (
    <div className=" flex flex-row items-end justify-end">
      <div className=" px-[12px] py-[8px] rounded-[18px] bg-[#0084FF] md:max-w-[588px] max-w-full h-fit">
        <p className="leading-[20.1px] text-[15px] w-fit text-[#fff] ">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugiat
          adipisci co
        </p>
      </div>
    </div>
  );
}
