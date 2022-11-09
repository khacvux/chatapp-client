import React, { ChangeEvent, useState } from "react";
import { IoIosSearch } from "react-icons/io";
import { IconContext } from "react-icons";

export default function Friends() {
  const [key, setKey] = useState("");
  const handleSetKey = (event: ChangeEvent<HTMLInputElement>) => {
    setKey(event.target.value);
  };
  return (
    <div className="w-full h-screen relative">
      <div
        className="w-full flex flex-row items-center justify-center px-[16px] py-[10px] 
          border-b border-[#bec0c3] absolute top-0 left-0 right-0 backdrop-blur-2xl bg-white/20
          "
      >
        <div className="w-full md:w-[530px] rounded-full bg-[#f0f2f5] overflow-hidden flex flex-row items-center pl-[10px]">
          {key ? null : (
            <div>
              <IconContext.Provider value={{ color: "#606770", size: "20px" }}>
                <IoIosSearch />
              </IconContext.Provider>
            </div>
          )}
          <input
            id="searchbox"
            type="text"
            className=" text-[15px] bg-inherit text-[#050505] pl-[6px] pr-[9px] py-[5px] outline-none cursor-text w-full
                 placeholder:text-[#050505]  "
            placeholder="Search.."
            onChange={(event) => handleSetKey(event)}
            value={key}
          />
        </div>
      </div>
      <div className="h-screen">
        <ListFriends />
        {/* <ListResearch /> */}
      </div>
    </div>
  );
}

const ListFriends = () => {
  return (
    <div className="w-full h-full overflow-y-scroll hide-scrollbar flex flex-col items-center">
      <div className="block w-[500px] min-h-[60px] space-y-1" />
      <div className="w-full md:w-[550px] px-3 md:px-10 ">
        <p className=" text-[24px] font-bold py-[12px]">Friends</p>
      </div>
      <FriendItem />
      <FriendItem />
      <FriendItem />
      <FriendItem />
      <FriendItem />
      <FriendItem />
      <FriendItem />
      <FriendItem />
      <FriendItem />
      <FriendItem />
      <FriendItem />
      <FriendItem />
      <FriendItem />
      <FriendItem />
      <FriendItem />
      <FriendItem /> 
      <FriendItem />
      <FriendItem />
      <div className="block w-[500px] min-h-[30px] space-y-1" />
    </div>
  );
};

const ListResearch = () => {
  return (
    <div className="w-full h-full overflow-y-scroll hide-scrollbar flex flex-col items-center">
      <div className="block w-[500px] min-h-[80px] space-y-1" />
      <ResearchItem />
      <ResearchItem />
      <div className="block w-[500px] min-h-[30px] space-y-1" />
    </div>
  );
};

const ResearchItem = () => {
  return (
    <div className="w-[488px] px-3 py-2 flex flex-row items-center justify-between">
      <div className="flex flex-row items-center space-x-[8px]">
        <img
          src="https://i.pinimg.com/564x/fe/f9/e5/fef9e5889245360d5df507be59276e17.jpg"
          alt="avatar"
          className="w-[60px] h-[60px]"
        />
        <div className="flex-1 flex-col items-start justify-center">
          <p className=" text-[15px] text-[#050505] leading-[18.66px] font-medium">
            Username
          </p>
          <p className="text-[13px] text-[#65676b] leading-[15.76px] max-w-[160px] truncate">
            email@gmail.com
          </p>
        </div>
      </div>
      <div>
        <button className="bg-blue-500 px-[12px] py-[2px] rounded-[8px] hover:bg-blue-600">
          <p className="text-[13px] text-white">Add friend</p>
        </button>
      </div>
    </div>
  );
};

const FriendItem = () => {
  return (
    <div className="w-[488px] px-3 py-2 flex flex-row items-center justify-between">
      <div className="flex flex-row items-center space-x-[8px]">
        <img
          src="https://i.pinimg.com/564x/fe/f9/e5/fef9e5889245360d5df507be59276e17.jpg"
          alt="avatar"
          className="w-[60px] h-[60px]"
        />
        <div className="flex-1 flex-col items-start justify-center">
          <p className=" text-[15px] text-[#050505] leading-[18.66px] font-medium">
            Username
          </p>
          <p className="text-[13px] text-[#65676b] leading-[15.76px] max-w-[160px] truncate">
            email@gmail.com
          </p>
        </div>
      </div>
      <div className="flex flex-row items-center space-x-[5px]">
        <button className="bg-[#E4E6EA] px-[12px] py-[2px] rounded-[8px] hover:bg-[#D8DADE]">
          <p className="text-[13px] text-black">Unfriend</p>
        </button>
        <button className="bg-blue-500 px-[12px] py-[2px] rounded-[8px] hover:bg-blue-600">
          <p className="text-[13px] text-white">Chat</p>
        </button>
      </div>
    </div>
  );
};
