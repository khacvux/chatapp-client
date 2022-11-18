import { ChangeEvent, Dispatch, useState } from "react";
import { FiMoreHorizontal } from "react-icons/fi";
import { FaUserFriends } from "react-icons/fa";
import { IoIosSearch } from "react-icons/io";
import { IconContext } from "react-icons";
import { useFriendStore, useRouterStore } from "../../../core/store";
import { useMessageStore } from "../../../core/store/messageStore";
import {
  CurrentRoutType,
  IFriend,
  SystemThemeTypes,
  ThemeTypes,
} from "../../../core/dtos";
import { RiNotification3Fill } from "react-icons/ri";
import { usePreferenceStore } from "../../../core/store/preferenceStore";
import { useNavigate } from "react-router-dom";
import Menu from "./Menu";
import { Socket } from "socket.io-client";


export default function ContactsContainer({
  socket,
}: {
  socket: Socket | undefined;
}) {
  const [showMenu, setShowMenu] = useState<Boolean>(false);
  return (
    <div className="w-full h-full border-r border-[#BEC0C3] dark:border-[#2F3031] flex flex-col relative dark:bg-[#242526]">
      <div className="absolute w-full top-0 left-0 right-0 h-fit lg:h-[110px] backdrop-blur-lg bg-white/20 dark:bg-[#242526]/20 z-[9999]">
        <Header showMenu={showMenu} setShowMenu={setShowMenu} socket={socket} />
        <SearchArea />
      </div>
      <ListContact />
    </div>
  );
}

function Header({
  showMenu,
  setShowMenu,
  socket,
}: {
  showMenu: Boolean;
  setShowMenu: Dispatch<Boolean>;
  socket: Socket | undefined
}) {
  const routerStore = useRouterStore();
  const theme = usePreferenceStore((state) => state.theme);
  const systemTheme = usePreferenceStore((state) => state.systemTheme);
  const navigate = useNavigate();
  const toFriends = () => {
    navigate("/");
    setShowMenu(false);
  };
  const toNotifies = () => {
    navigate("/notifies");
    setShowMenu(false);
  };



  return (
    <div className=" hidden lg:flex flex-row items-center justify-between px-[16px] pt-[12px] pb-[2px] ">
      <div className=" font-bold text-[24px] text-[#050505] dark:text-[#E4E6EA] ">
        Chat
      </div>
      <div className="flex flex-row items-center space-x-[12px] relative z-50">

        <div
          className=" w-[36px] h-[36px] bg-[#f0f2f5] hover:bg-[#E9E9E9] dark:bg-[#3A3B3C]
          dark:hover:bg-[#4E4F50] rounded-full flex justify-center items-center cursor-pointer"
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
            <FiMoreHorizontal />
          </IconContext.Provider>
        </div>
        {!showMenu ? null : (
          <div className="absolute top-[40px]">
            <Menu setShowMenu={setShowMenu} />
          </div>
        )}
        <div
          className=" w-[36px] h-[36px] bg-[#f0f2f5] hover:bg-[#E9E9E9] dark:bg-[#3A3B3C]
          dark:hover:bg-[#4E4F50] rounded-full flex justify-center items-center cursor-pointer"
          onClick={toFriends}
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
            <FaUserFriends />
          </IconContext.Provider>
        </div>

        <div
          className=" w-[36px] h-[36px] bg-[#f0f2f5] hover:bg-[#E9E9E9] dark:bg-[#3A3B3C]
          dark:hover:bg-[#4E4F50] rounded-full flex justify-center items-center cursor-pointer"
          onClick={toNotifies}
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
            <RiNotification3Fill />
          </IconContext.Provider>
        </div>

      </div>
    </div>
  );
}

function SearchArea() {
  // const routerStore = useRouterStore();
  const theme = usePreferenceStore((state) => state.theme);
  const [key, setKey] = useState("");

  const handleSetKey = (event: ChangeEvent<HTMLInputElement>) => {
    setKey(event.target.value);
  };

  return (
    <div className="flex flex-row items-center justify-between px-[16px] pb-[12px] mt-[10px]">
      <div
        className="w-full rounded-full bg-[#f0f2f5] dark:bg-[#3A3B3C] 
        overflow-hidden flex flex-row items-center pl-[10px]"
      >
        {key ? null : (
          <div>
            <IconContext.Provider
              value={{
                color: theme == ThemeTypes.Dark ? "#B1B3B9" : "#606770",
                size: "1.3rem",
              }}
            >
              <IoIosSearch />
            </IconContext.Provider>
          </div>
        )}

        <input
          id="searchbox"
          type="text"
          className=" text-[15px] bg-inherit text-[#050505] pl-[6px] pr-[9px] py-[5px] 
              outline-none cursor-text w-full lg:placeholder:text-[#050505]
             placeholder:text-[#f0f2f5] dark:placeholder-[#B1B3B9] dark:text-[#E4E6EA] "
          placeholder="Search.."
          onChange={(event) => handleSetKey(event)}
          value={key}
        />
      </div>
    </div>
  );
}

function ListContact() {
  const ListContact = useFriendStore((state) => state.listFriend);
  const navigate = useNavigate()
  return (
    <div
      className="flex-1 flex flex-col space-y-[2px] overflow-y-scroll px-[8px] 
                items-start hide-scrollbar"
    >
      <div className=" w-full min-h-[60px] lg:min-h-[110px]" />
      {/* <GroupItem /> */}
      {ListContact?.map((contact, index) => (
        <ContactItems key={contact.id} contact={contact} navigate={navigate} />
      ))}
      <div className=" w-full min-h-[40px]" />
    </div>
  );
}

function ContactItems({ contact, navigate }: { contact: IFriend, navigate: any }) {
  const messageStore = useMessageStore();
  const setCurrentRoute = useRouterStore((state) => state.setCurrentRoute);
  return (
    <div
      className={`${
        messageStore.currentChatPerson?.id == contact.info.id
          ? `bg-[#E9F2FE] dark:bg-[#252F3C]`
          : `hover:bg-[#F2F2F2] dark:hover:bg-[#38393A]`
      }  
          w-full h-[72px] rounded-[8px] p-[10px] cursor-pointer
          flex flex-row items-center space-x-[12px]
         `}
      onClick={() => {
        // setCurrentRoute(CurrentRoutType.Chatbox);
        navigate(`/m/${contact.id}`)
        messageStore.setCurrentChatPerson({
          id: contact.info.id,
          username: contact.info.username,
        });
      }}
    >
      <img
        src="https://i.pinimg.com/564x/fe/f9/e5/fef9e5889245360d5df507be59276e17.jpg"
        alt="avatar"
        className=" w-[48px] h-[48px] rounded-full object-cover border-[1.5px] border-[#CBCDD1] dark:border-none"
      />
      <div className="space-y-[4px] lg:block hidden">
        <p className=" text-[14px] text-[#050505] leading-[18.66px] dark:text-[#e4e6eb]">
          {contact.info.username}
        </p>
        {/* {contact.chat[0]?.createdAt ? (
          <div className="flex flex-row items-center space-x-2 dark:text-[#b0b3b8]">
            <p className=" text-[12px] text-[#65676b] leading-[14.76px] max-w-[160px] truncate">
              {contact.chat[0]?.msg}
            </p>
            <p className=" text-[10px] text-[#65676b] leading-[14.76px]">
              • .. hours
            </p>
          </div>
        ) : (
          <p className=" text-[12px] text-[#65676b] leading-[14.76px] dark:text-[#b0b3b8] ">
            start conversation
          </p>
        )} */}
        <p className=" text-[12px] text-[#65676b] leading-[14.76px] dark:text-[#b0b3b8] ">
          Start conversation
        </p>
      </div>
    </div>
  );
}

function GroupItem() {
  return (
    <div
      className={`${
        // messageStore.currentChatPerson?.id == contact.id
        false ? `bg-[#E9F2FE]` : `hover:bg-[#F2F2F2]`
      }  
          w-full h-[72px] rounded-[8px] p-[10px] cursor-pointer
          flex flex-row items-center space-x-[12px]
         `}
      // onClick={() => {
      //   setCurrentRoute(CurrentRoutType.Chatbox);
      //   messageStore.setCurrentChatPerson({
      //     id: contact.id,
      //     username: contact.username,
      //   });
      // }}
    >
      <div className="relative w-[48px] h-[48px]">
        <img
          src="https://i.pinimg.com/564x/fe/f9/e5/fef9e5889245360d5df507be59276e17.jpg"
          alt="avatar"
          className=" w-[35px] h-[35px] rounded-full object-cover border-[2px] border-white absolute top-0 right-0"
        />
        <img
          src="https://i.pinimg.com/564x/fe/f9/e5/fef9e5889245360d5df507be59276e17.jpg"
          alt="avatar"
          className=" w-[35px] h-[35px] rounded-full object-cover border-[2px] border-white absolute bottom-0 left-0"
        />
      </div>

      <div className="space-y-[4px] lg:block hidden">
        <p className=" text-[14px] text-[#050505] leading-[18.66px]">
          {/* {contact.username} */}
          group name
        </p>
        {/* {contact.chat[0]?.createdAt ? (
          <div className="flex flex-row items-center space-x-2">
            <p className=" text-[12px] text-[#65676b] leading-[14.76px] max-w-[160px] truncate">
              {contact.chat[0]?.msg}
            </p>
            <p className=" text-[10px] text-[#65676b] leading-[14.76px]">
              • .. hours
            </p>
          </div>
        ) : ( */}
        <p className=" text-[12px] text-[#65676b] leading-[14.76px]">
          start conversation
        </p>
        {/* )} */}
      </div>
    </div>
  );
}
