import React, { ChangeEvent, useEffect, useState } from "react";
import { IoIosSearch } from "react-icons/io";
import { IconContext } from "react-icons";
import {
  useAuthStore,
  useMessageStore,
  usePreferenceStore,
  useFriendStore,
} from "../../../core/store";
import {
  IFriend,
  IUser,
  IUserResult,
  SystemThemeTypes,
  ThemeTypes,
} from "../../../core/dtos";
import { useDebounce } from "../../../core/hooks";
import { IoClose } from "react-icons/io5";
import { ListFriends } from "./ListFriend";
import ListResearch from "./ListResult";

export default function Friends() {
  const [searchTerm, setSearchTerm] = useState("");
  const friendStore = useFriendStore();
  const access_token = useAuthStore((state) => state.access_token);
  const listFriend = useFriendStore((state) => state.listFriend);
  const debouncedSearchTerm = useDebounce(searchTerm, 500);
  const theme = usePreferenceStore((state) => state.theme);
  const systemTheme = usePreferenceStore((state) => state.systemTheme);
  const close = () => {
    friendStore.clear();
  };

  useEffect(() => {
    if (debouncedSearchTerm.length) {
      friendStore.seachLikeUserame({
        querry: debouncedSearchTerm,
        access_token,
      });
    }
  }, [debouncedSearchTerm]);
  const handleSetSearchTerm = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  return (
    <div className="w-full h-screen relative">
      <div
        className="w-full flex flex-row items-center justify-center px-[16px] py-[10px] z-[2]
         dark:bg-[#242526]/20 dark:border-[#2F3031] 
          border-b border-[#bec0c3] absolute top-0 left-0 right-0 backdrop-blur-2xl bg-white/20
          "
      >
        <div
          className="w-full md:w-[530px] rounded-full bg-[#f0f2f5]  overflow-hidden
              flex flex-row items-center pl-[10px] dark:bg-[#3A3B3C]"
        >
          {searchTerm ? null : (
            <div>
              <IconContext.Provider value={{ color: "#606770", size: "20px" }}>
                <IoIosSearch />
              </IconContext.Provider>
            </div>
          )}
          <input
            id="searchbox"
            type="text"
            className=" text-[15px] bg-inherit text-[#050505] pl-[6px] pr-[9px] py-[5px] 
                outline-none cursor-text w-full placeholder:text-[#050505]
                dark:text-[#E4E6EA] dark:placeholder-[#B1B3B9] "
            placeholder="Search.."
            onChange={(event) => handleSetSearchTerm(event)}
            value={searchTerm}
          />
        </div>
      </div>
      <div className="h-full w-full relative z-[1]">
        <ListFriends listFriend={listFriend} />
        {!searchTerm ? null : (
          <div className="absolute top-0 bottom-0 right-0 left-0 bg-white dark:bg-[#242526] ">
            <div className="w-full h-screen">
              <ListResearch listUserResult={friendStore.listUserResult} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
