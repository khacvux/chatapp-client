import React, { Dispatch } from "react";
import { IconContext } from "react-icons";
import { BsGear, BsPencilSquare } from "react-icons/bs";
import { CiLogout } from "react-icons/ci";
import { HiOutlineUserGroup } from "react-icons/hi2";
import { RiUserLine } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import { ModalTypes, SystemThemeTypes, ThemeTypes } from "../../../core/dtos";
import {
  useAuthStore,
  useMessageStore,
  usePreferenceStore,
  useRouterStore,
} from "../../../core/store";

export default function Menu({
  setShowMenu,
}: {
  setShowMenu: Dispatch<Boolean>;
}) {
  const clearAuth = useAuthStore((state) => state.clearAuth);
  const messageStore = useMessageStore();
  const setRouter = useRouterStore((state) => state.setCurrentRoute);
  const setModal = useRouterStore((state) => state.setModals);
  const systemTheme = usePreferenceStore((state) => state.systemTheme);
  const theme = usePreferenceStore((state) => state.theme);
  const navigate = useNavigate();

  const toProfile = (): void => {
    navigate("/profile");
    setShowMenu(false);
  };

  const toCreateGroup = (): void => {
    setModal(ModalTypes.CreateGroup);
    setShowMenu(false);
  };

  const toPreferences = (): void => {
    setModal(ModalTypes.Preferences);
    setShowMenu(false);
  };

  return (
    <div className="flex flex-col space-y-0 dark:text-[#e4e6eb]">
      <div
        className=" w-[345px] py-[10px] px-[8px] bg-white dark:bg-[#242526] rounded-md
          shadow-2xl shadow-black/20 relative transition-all "
      >
        <div
          className=" p-[8px] flex flex-row items-center space-x-[8px]
              cursor-pointer hover:bg-[#F2F2F2] dark:hover:bg-[#3A3B3C] 
              rounded-[8px] transition-all"
          onClick={toPreferences}
        >
          <IconContext.Provider
            value={{
              color:
                theme == ThemeTypes.System
                  ? systemTheme == SystemThemeTypes.Dark
                    ? "#e4e6eb"
                    : "#000"
                  : theme == ThemeTypes.Dark
                  ? "#e4e6eb"
                  : "#000",
              size: "1.3rem",
            }}
          >
            <BsGear />
          </IconContext.Provider>
          <p>Preferences</p>
        </div>
        <div
          className=" p-[8px] flex flex-row items-center space-x-[8px]
              cursor-pointer hover:bg-[#F2F2F2] dark:hover:bg-[#3A3B3C] rounded-[8px] transition-all"
          onClick={toProfile}
        >
          <IconContext.Provider
            value={{
              color:
                theme == ThemeTypes.System
                  ? systemTheme == SystemThemeTypes.Dark
                    ? "#e4e6eb"
                    : "#000"
                  : theme == ThemeTypes.Dark
                  ? "#e4e6eb"
                  : "#000",
              size: "1.3rem",
            }}
          >
            <RiUserLine />
          </IconContext.Provider>
          <p>Profile</p>
        </div>
        <div
          className=" p-[8px] flex flex-row items-center space-x-[8px]
              cursor-pointer hover:bg-[#F2F2F2] dark:hover:bg-[#3A3B3C] rounded-[8px] transition-all"
          onClick={toCreateGroup}
        >
          <IconContext.Provider
            value={{
              color:
                theme == ThemeTypes.System
                  ? systemTheme == SystemThemeTypes.Dark
                    ? "#e4e6eb"
                    : "#000"
                  : theme == ThemeTypes.Dark
                  ? "#e4e6eb"
                  : "#000",
              size: "1.3rem",
            }}
          >
            <HiOutlineUserGroup />
          </IconContext.Provider>
          <p>Create group chat</p>
        </div>
        <div
          className=" p-[8px] flex flex-row items-center space-x-[8px]
              cursor-pointer hover:bg-[#F2F2F2] dark:hover:bg-[#3A3B3C] rounded-[8px] transition-all"
        >
          <IconContext.Provider
            value={{
              color:
                theme == ThemeTypes.System
                  ? systemTheme == SystemThemeTypes.Dark
                    ? "#e4e6eb"
                    : "#000"
                  : theme == ThemeTypes.Dark
                  ? "#e4e6eb"
                  : "#000",
              size: "1.3rem",
            }}
          >
            <BsPencilSquare />
          </IconContext.Provider>
          <p>Sends</p>
        </div>
        <div className="w-fill h-[1px] bg-[#CED0D4] dark:bg-[#2F3031] my-[5px] mx-[15px]" />
        <div
          className=" p-[8px] flex flex-row items-center space-x-[8px] 
              cursor-pointer hover:bg-[#F2F2F2] dark:hover:bg-[#3A3B3C] rounded-[8px] transition-all"
          onClick={() => {
            clearAuth();
            messageStore.clear();
          }}
        >
          <IconContext.Provider
            value={{
              color:
                theme == ThemeTypes.System
                  ? systemTheme == SystemThemeTypes.Dark
                    ? "#e4e6eb"
                    : "#000"
                  : theme == ThemeTypes.Dark
                  ? "#e4e6eb"
                  : "#000",
              size: "1.3rem",
            }}
          >
            <CiLogout />
          </IconContext.Provider>
          <p>Sign out</p>
        </div>
      </div>
    </div>
  );
}
