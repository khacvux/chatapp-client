import React from "react";
import { IFriend } from "../../../core/dtos";
import {
  useAuthStore,
  useFriendStore,
  useMessageStore,
} from "../../../core/store";

export const ListFriends = ({
  listFriend,
}: {
  listFriend: [IFriend] | IFriend[] | undefined;
}) => {
  return (
    <div className="w-full h-full overflow-y-scroll hide-scrollbar flex flex-col items-center">
      <div className="block w-[500px] min-h-[60px] space-y-1" />
      <div className="w-full md:w-[550px] px-3 md:px-10 ">
        <p className=" text-[24px] font-bold py-[12px] dark:text-[#e4e6eb]">
          Friends
        </p>
      </div>
      {listFriend?.map((item) => {
        return <FriendItem item={item} key={item.id} />;
      })}
      <div className="block w-[500px] min-h-[30px] space-y-1" />
    </div>
  );
};

export const FriendItem = ({ item }: { item: IFriend }) => {
  const friendStore = useFriendStore();
  const access_token = useAuthStore((state) => state.access_token);
  return (
    <div className="w-[488px] px-3 py-2 flex flex-row items-center justify-between">
      <div className="flex flex-row items-center space-x-[8px]">
        <img
          src="https://i.pinimg.com/564x/fe/f9/e5/fef9e5889245360d5df507be59276e17.jpg"
          alt="avatar"
          className="w-[60px] h-[60px] rounded-full"
        />
        <div className="flex-1 flex-col items-start justify-center">
          <p className=" text-[15px] text-[#050505] leading-[18.66px] font-medium dark:text-[#e4e6eb]">
            {item.info.username}
          </p>
          <p className="text-[13px] text-[#65676b] leading-[15.76px] max-w-[160px] truncate">
            {item.info.email}
          </p>
        </div>
      </div>
      <div className="flex flex-row items-center space-x-[5px]">
        <button
          className="bg-[#E4E6EA] px-[12px] py-[2px] rounded-[8px] hover:bg-[#D8DADE]"
          onClick={() => friendStore.deleteFriend(access_token, item.info.id)}
        >
          <p className="text-[13px] text-black">Unfriend</p>
        </button>
        <button className="bg-blue-500 px-[12px] py-[2px] rounded-[8px] hover:bg-blue-600">
          <p className="text-[13px] text-white">Chat</p>
        </button>
      </div>
    </div>
  );
};
