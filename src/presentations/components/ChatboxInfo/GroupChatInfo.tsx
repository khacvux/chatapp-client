import React, { useState } from "react";
import { IconContext } from "react-icons";
import { BsThreeDots } from "react-icons/bs";
import { FiChevronDown } from "react-icons/fi";
import { HiOutlinePencil, HiOutlinePlus } from "react-icons/hi";
import { IoIosLogOut } from "react-icons/io";
import { MdOutlineLogout } from "react-icons/md";
import { SystemThemeTypes, ThemeTypes } from "../../../core/dtos";
import { usePreferenceStore } from "../../../core/store";
import EditMemberOptions from "./EditMemberOptions";

export default function GroupChatInfo() {
  return (
    <div className="w-[380px] h-screen border-l border-[#2F3031]">
      <Info />
      <div className="px-[8px]">
        <CustomGroupChat />
        <EditMembers />
        <OutGroup />
      </div>
    </div>
  );
}

const Info = () => {
  return (
    <div className="flex flex-col items-center justify-center space-y-0 mb-10 ">
      <img
        src="https://i.pinimg.com/564x/20/18/d2/2018d28e585002e9b7d27e2a6a8eb9c2.jpg"
        alt="avatar"
        className="w-[80px] h-[80px] rounded-full object-cover mt-[16px] mb-[12px]"
      />
      <p className="dark:text-[#e4e6eb] font-semibold leading-[18.3px] text-[18px]">
        Group name
      </p>
      <p className="dark:text-[#e4e6eb] font-light text-[13px]">Group name</p>
    </div>
  );
};

const CustomGroupChat = () => {
  const theme = usePreferenceStore((state) => state.theme);
  const systemTheme = usePreferenceStore((state) => state.systemTheme);
  const [showCustom, shetShowCustom] = useState<Boolean>(true);
  return (
    <div className=" ">
      <div className=" flex flex-rows items-center px-[10px] justify-between hover:bg-[#393A3B] rounded-[8px]">
        <p
          className={`dark:text-[#e4e6eb] font-medium leading-[18px] py-[12px] `}
        >
          Customs
        </p>
        <div
          className={`pt-[8px] pb-[9px] px-[8px] ${
            showCustom ? "rotate-180" : ""
          }`}
          onClick={() => shetShowCustom(!showCustom)}
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
            <FiChevronDown />
          </IconContext.Provider>
        </div>
      </div>
      {!showCustom ? (
        <></>
      ) : (
        <div>
          <UpdateNameGroup />
        </div>
      )}
    </div>
  );
};

const UpdateNameGroup = () => {
  const theme = usePreferenceStore((state) => state.theme);
  const systemTheme = usePreferenceStore((state) => state.systemTheme);
  return (
    <div className="flex flex-row items-center space-x-[12px] py-[8px] dark:hover:bg-[#3A3B3C] px-[10px] rounded-[8px]">
      <div className="p-[8px] rounded-full dark:bg-[#4E4F50] cursor-pointer w-[36px] h-[36px] flex items-center justify-center">
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
          <HiOutlinePencil />
        </IconContext.Provider>
      </div>
      <div className="space-y-0 flex-1">
        <p className="leading-[15px] font-medium dark:text-[#e4e6eb] text-[14px]">
          Username
        </p>
        <p className="leading-[15px] dark:text-[#b0b3b8] text-[12px]">Member</p>
      </div>
    </div>
  );
};

const EditMembers = () => {
  const theme = usePreferenceStore((state) => state.theme);
  const systemTheme = usePreferenceStore((state) => state.systemTheme);
  const [showMembers, setShowMembers] = useState<Boolean>(true);
  return (
    <div className=" ">
      <div className=" flex flex-rows items-center px-[10px] justify-between hover:bg-[#393A3B] rounded-[8px]">
        <p
          className={`dark:text-[#e4e6eb] font-medium leading-[18px] py-[12px] `}
        >
          Members
        </p>
        <div
          className={`pt-[8px] pb-[9px] px-[8px] ${
            showMembers ? "rotate-180" : ""
          }`}
          onClick={() => setShowMembers(!showMembers)}
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
            <FiChevronDown />
          </IconContext.Provider>
        </div>
      </div>
      {!showMembers ? (
        <></>
      ) : (
        <div>
          <MemberItem />
          <MemberItem />
          <MemberItem />
          <AddMemberItem />
        </div>
      )}
    </div>
  );
};

const MemberItem = () => {
  const theme = usePreferenceStore((state) => state.theme);
  const systemTheme = usePreferenceStore((state) => state.systemTheme);
  const [showMenu, setShowMenu] = useState<Boolean>(false);
  return (
    <div className="flex flex-row items-center space-x-[12px] my-[15px] px-[10px] z-1">
      <img
        src="https://i.pinimg.com/564x/65/65/9e/65659e24d41848e165cea46736a17289.jpg"
        alt="avatar"
        className="w-[36px] h-[36px] rounded-full object-cover"
      />
      <div className="space-y-0 flex-1 ">
        <p className="leading-[15px] font-medium dark:text-[#e4e6eb] text-[14px]">
          Username
        </p>
        <p className="leading-[15px] dark:text-[#b0b3b8] text-[12px]">Member</p>
      </div>
      <div
        className="p-[8px] rounded-full dark:hover:bg-[#3A3B3C] cursor-pointer"
        onClick={() => setShowMenu(!showMenu)}
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
          <BsThreeDots />
        </IconContext.Provider>
      </div>
      {/* {!showMenu ? (
        <></>
      ) : (
        <div className="absolute bottom-10 z-10">
          <EditMemberOptions />
        </div>
      )} */}
    </div>
  );
};

const AddMemberItem = () => {
  const theme = usePreferenceStore((state) => state.theme);
  const systemTheme = usePreferenceStore((state) => state.systemTheme);
  return (
    <div className="flex flex-row items-center space-x-[12px] py-[8px] dark:hover:bg-[#3A3B3C] px-[10px] rounded-[8px]">
      <div className="p-[8px] rounded-full dark:bg-[#4E4F50] cursor-pointer w-[36px] h-[36px] flex items-center justify-center">
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
          <HiOutlinePlus />
        </IconContext.Provider>
      </div>
      <div className="space-y-0 flex-1">
        <p className="leading-[15px] font-medium dark:text-[#e4e6eb] text-[14px]">
          Username
        </p>
        <p className="leading-[15px] dark:text-[#b0b3b8] text-[12px]">Member</p>
      </div>
    </div>
  );
};

const OutGroup = () => {
  const theme = usePreferenceStore((state) => state.theme);
  const systemTheme = usePreferenceStore((state) => state.systemTheme);
  return (
    <div className="flex flex-row items-center py-[3px] dark:hover:bg-[#3A3B3C] px-[10px] rounded-[8px] cursor-pointer my-[3px] mt-[10px]">
      <div className="px-[8px] rounded-full cursor-pointer flex items-center justify-center">
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
            size: "1.2rem",
          }}
        >
          <MdOutlineLogout />
        </IconContext.Provider>
      </div>
      <p
        className={`dark:text-[#e4e6eb] font-medium leading-[18px] py-[12px] `}
      >
        Out group
      </p>
    </div>
  );
};
