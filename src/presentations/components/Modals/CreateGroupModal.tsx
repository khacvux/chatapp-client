import { IoClose } from "react-icons/io5";
import { IconContext } from "react-icons";
import {
  useAuthStore,
  useFriendStore,
  usePreferenceStore,
  useRouterStore,
} from "../../../core/store";
import {
  IFriend,
  ModalTypes,
  SystemThemeTypes,
  ThemeTypes,
} from "../../../core/dtos";
import { IoIosSearch } from "react-icons/io";
import React, { ChangeEvent, useEffect, useRef, useState } from "react";
import { useListFriendStore } from "../../../core/store/listFriendSelectedStore";
import { FiPlus } from "react-icons/fi";
import { useGroupMessageStore } from "../../../core/store/groupMessageStore";

export default function CreateGroupModal() {
  const theme = usePreferenceStore((state) => state.theme);
  const systemTheme = usePreferenceStore((state) => state.systemTheme);
  const friendStore = useFriendStore();
  const setModal = useRouterStore((state) => state.setModals);
  const setListFriends = useListFriendStore((state) => state.setListFriends);
  const setListFriendsSelected = useListFriendStore(
    (state) => state.setListFriendsSelected
  );
  setListFriends(friendStore.listFriend);
  setListFriendsSelected([]);

  const close = () => {
    setModal(ModalTypes.none);
  };

  return (
    <div
      className="md:w-[650px] w-[100vw] md:h-[80vh] h-[100vh] bg-white
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
      <div className="w-full h-[40px] flex flex-row items-center justify-center">
        <p className="text-[16px] font-medium dark:text-white">New Group</p>
      </div>
      <TypeGroupName />
      <FriendSearch />
      <ListFriendsSelected />
      <ListFriends />
    </div>
  );
}

const TypeGroupName = () => {
  const [name, setName] = useState<string>("");
  const listSelected = useListFriendStore((state) => state.listFriendsSelected);
  const createGroup = useGroupMessageStore((state) => state.createGroup);
  const access_token = useAuthStore((state) => state.access_token);
  const setModal = useRouterStore((state) => state.setModals);
  const userId = useAuthStore((state) => state.id);
  const handleCreate = () => {
    const users = listSelected.map((item) => item.info.id);
    users.push(Number(userId));
    createGroup(access_token, { users, title: name, avatar: "" });
    setModal(ModalTypes.none);
  };
  return (
    <div className="flex flex-row items-center px-[15px] py-[5px] mt-[10px] space-x-2">
      <p className="text-[14px] text-[#242525] font-light dark:text-white">
        Group name:{" "}
      </p>
      <input
        type="text"
        placeholder="(optional)"
        className="outline-none bg-inherit flex-1 dark:text-white"
        onChange={(e: ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
        value={name}
      />
      {listSelected.length ? (
        <button
          className=" text-[#2d88ff] font-normal text-[13.5px]"
          onClick={handleCreate}
        >
          <p>Create</p>
        </button>
      ) : (
        <button className=" text-[#2d88ff50] font-normal text-[13.5px]">
          <p>Create</p>
        </button>
      )}
    </div>
  );
};

const FriendSearch = () => {
  const [key, setKey] = useState("");

  const handleSetKey = (event: ChangeEvent<HTMLInputElement>) => {
    setKey(event.target.value);
  };
  return (
    <div
      className="w-full rounded-full bg-[#f0f2f5] overflow-hidden flex flex-row
    dark:bg-[#3A3B3C] items-center pl-[10px] my-[5px]"
    >
      {key ? null : (
        <div className="ml-[5px]">
          <IconContext.Provider value={{ color: "#606770", size: "20px" }}>
            <IoIosSearch />
          </IconContext.Provider>
        </div>
      )}
      <input
        id="searchbox"
        type="text"
        className="bg-inherit text-[#050505] pl-[5px] pr-[9px] py-[5px] outline-none cursor-text w-full
             placeholder:text-[#050505] text-[14px] dark:placeholder:text-[#B1B3B9] dark:text-white "
        placeholder="Search.."
        onChange={(event) => handleSetKey(event)}
        value={key}
      />
    </div>
  );
};

const ListFriendsSelected = () => {
  const listFriendsSelected = useListFriendStore(
    (state) => state.listFriendsSelected
  );
  return (
    <div className="p-2 pl-1 flex overflow-x-auto ">
      {listFriendsSelected.map((friend, key) => (
        <ItemFriendSelected friend={friend} key={key} />
      ))}
    </div>
  );
};

const ItemFriendSelected = ({ friend }: { friend: IFriend }) => {
  const removeListFriendsSelected = useListFriendStore(
    (state) => state.removeListFriendsSelectedItem
  );
  const remove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.preventDefault();
    removeListFriendsSelected(friend);
  };
  return (
    <div
      className="mx-4 flex flex-col justify-center items-center cursor-pointer"
      onClick={remove}
    >
      <div className="relative">
        <img
          src="https://i.pinimg.com/564x/fe/f9/e5/fef9e5889245360d5df507be59276e17.jpg"
          alt="avatar"
          className=" w-[48px] h-[48px] rounded-full"
        />
        <div className="absolute top-0 right-0">
          <div className="bg-white rounded-full shadow-[0px_0px_5px_1px_rgb(0,0,0,0.3)] p-0.5">
            <IconContext.Provider value={{ color: "#000", size: "0.7rem" }}>
              <IoClose />
            </IconContext.Provider>
          </div>
        </div>
      </div>
      <div>
        <p className="font-light text-[0.9em] dark:text-white">
          {friend.info.username}
        </p>
      </div>
    </div>
  );
};

const ListFriends = () => {
  const listFriends = useListFriendStore((state) => state.listFriends);

  return (
    <div className="w-full h-full mt-[10px] px-[15px]">
      <p className="font-medium text-[#8c8e91] mb-[10px]">
        {listFriends.length ? "Friends" : ""}
      </p>
      {listFriends.map((friend, index) => (
        <FriendItem friend={friend} key={index} />
      ))}
    </div>
  );
};

const FriendItem = ({ friend }: { friend: IFriend }) => {
  const theme = usePreferenceStore((state) => state.theme);
  const systemTheme = usePreferenceStore((state) => state.systemTheme);
  const pushListFriendsSelected = useListFriendStore(
    (state) => state.pushListFriendsSelectedItem
  );
  let checked = (e: any) => {
    e.preventDefault();
    pushListFriendsSelected(friend);
  };
  return (
    <label
      htmlFor={"friend-group_select_id-" + friend.id}
      className="w-full px-[5px] flex flex-row items-center space-x-[15px] "
      onClick={checked}
    >
      <img
        src={
          friend.info.avatar
            ? friend.info.avatar
            : "https://i.pinimg.com/564x/fe/f9/e5/fef9e5889245360d5df507be59276e17.jpg"
        }
        alt="avatar"
        className=" w-[48px] h-[48px] rounded-full"
      />

      <div className="flex-1 h-[60px] w-full border-b-[.5px] border-[#CBCDD1] dark:border-[#3A3B3C] flex items-center justify-between">
        <p className=" font-normal dark:text-white">
          {friend.info.firstName
            ? friend.info.firstName + " " + friend.info.lastName
            : friend.info.username}{" "}
        </p>
        <div
          className="relative cursor-pointer rounded-full p-[4px] bg-[#f0f2f5] hover:bg-[#E9E9E9] dark:bg-[#3A3B3C]
          dark:hover:bg-[#4E4F50] "
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
              size: "0.9rem",
            }}
          >
            <FiPlus />
          </IconContext.Provider>
        </div>
      </div>
    </label>
  );
};
