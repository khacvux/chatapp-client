import React from "react";
import { IFriendStore, IUser } from "../../../core/dtos";
import { useAuthStore, useFriendStore } from "../../../core/store";

export default function NotifiesContainer() {
  const friendStore = useFriendStore();
  const access_token = useAuthStore((state) => state.access_token);
  return (
    <div className="h-screen w-full flex justify-center relative ">
      <div
        className=" w-full backdrop-blur-lg bg-white/10 dark:bg-[#242526]/10
          absolute top-0 left-0 right-0 z-10 flex justify-center"
      >
        <div className="w-full lg:w-[550px]">
          <p className=" text-[24px] font-bold py-[12px] dark:text-[#E4E6EA] px-1 ">
            Notification
          </p>
        </div>
      </div>
      <div className="w-full lg:w-[550px] relative">
        <div className="h-screen w-full overflow-y-scroll hide-scrollbar">
          <div className="block w-[500px] min-h-[60px] space-y-1" />
          {friendStore.listFriendRequest.map((item) => (
            <FriendRequest
              item={item}
              friendStore={friendStore}
              access_token={access_token}
            />
          ))}
          <div className="block w-[500px] min-h-[40px] space-y-1" />
        </div>
      </div>
    </div>
  );
}

const FriendRequest = ({
  item,
  friendStore,
  access_token,
}: {
  item: IUser;
  friendStore: IFriendStore;
  access_token: string;
}) => {
  const handleAccept = () => {
    friendStore.acceptRequest(access_token, item.id);
  };

  const handleReject = () => {
    friendStore.rejectRequest(access_token, item.id);
  }

  return (
    <div className="w-full ld:w-[488px] px-3 py-2 flex flex-row items-center space-x-[10px]">
      <img
        src="https://i.pinimg.com/564x/fe/f9/e5/fef9e5889245360d5df507be59276e17.jpg"
        alt="avatar"
        className="w-[65px] h-[65px] rounded-full"
      />
      <div className="flex flex-col items-center space-x-[8px] w-full">
        <p
          className=" text-[14.5px] w-full text-[#050505] dark:text-[#E4E6EA] text-start
           leading-[18.66px] py-[10px] "
        >
          <span className="font-medium mr-1">{item.username}</span> sent you a
          friend request
        </p>
        <div className=" flex flex-row w-full justify-start items-center space-x-[5px] px-[10px]">
          <button className="bg-blue-500 px-[12px] py-[2px] rounded-[8px] hover:bg-blue-600"
            onClick={handleAccept}
          >
            <p className="text-[13px] text-white px-[8px]">Accept</p>
          </button>
          <button
            className="bg-[#E4E6EA] px-[12px] py-[2px] rounded-[8px] hover:bg-[#D8DADE]
            dark:bg-[#3A3B3C] dark:hover:bg-[#4E4F50]"
            onClick={handleReject}
          >
            <p className="text-[13px] text-black dark:text-[#E4E6EA] px-[8px]">
              Refuse
            </p>
          </button>
        </div>
      </div>
    </div>
  );
};
