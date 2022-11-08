import React from "react";

export default function NotifiesContainer() {
  return (
    <div className="px-3 h-screen w-full flex justify-center ">
      <div className="w-full lg:w-[550px] ">
        <p className=" text-[24px] font-bold py-[12px]">Notification</p>
        <div className="h-full w-full overflow-y-scroll hide-scrollbar">
          <FriendRequest />
          <FriendRequest />
          <FriendRequest />
          <FriendRequest />
          <FriendRequest />
          <FriendRequest />
          <FriendRequest />
          <FriendRequest />
          <FriendRequest />
          <FriendRequest />
          <FriendRequest />
          <FriendRequest />
          <FriendRequest />
          <FriendRequest />
          <FriendRequest />
          <FriendRequest />
        </div>
      </div>
    </div>
  );
}

const FriendRequest = () => {
  return (
    <div className="w-full ld:w-[488px] px-3 py-2 flex flex-row items-center space-x-[10px]">
      <img
        src="https://i.pinimg.com/564x/fe/f9/e5/fef9e5889245360d5df507be59276e17.jpg"
        alt="avatar"
        className="w-[65px] h-[65px] rounded-full"
      />
      <div className="flex flex-col items-center space-x-[8px] w-full">
        <p className=" text-[15px] w-full text-[#050505] text-start leading-[18.66px] py-[10px] ">
          <span className="font-medium">Username</span> Lorem, ipsum dolor sit
          amet consectetur adipisicing elit. Nam, sit. amet
        </p>
        <div className=" flex flex-row w-full justify-start items-center space-x-[3px] px-[10px]">
          <button className="bg-blue-500 px-[12px] py-[2px] rounded-[8px] hover:bg-blue-600">
            <p className="text-[13px] text-white px-[8px]">Accept</p>
          </button>
          <button className="bg-[#E4E6EA] px-[12px] py-[2px] rounded-[8px] hover:bg-[#D8DADE]">
            <p className="text-[13px] text-black px-[8px]">Refuse</p>
          </button>
        </div>
      </div>
    </div>
  );
};
