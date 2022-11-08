import { ChangeEvent, Dispatch, useEffect, useState } from "react";
import { FiMoreHorizontal } from "react-icons/fi";
import { FaUserFriends } from "react-icons/fa";
import { IoIosSearch } from "react-icons/io";
import { IconContext } from "react-icons";
import { BsPencilSquare, BsGear } from "react-icons/bs";
import { CiLogout } from "react-icons/ci";
import { useAuthStore, useRouterStore } from "../../../core/store";
import { useMessageStore } from "../../../core/store/messageStore";
import { CurrentRoutType, IContact } from "../../../core/dtos";
import { RiNotification3Fill, RiUserLine } from "react-icons/ri";

export default function ContactsContainer() {
  const [showMenu, setShowMenu] = useState<Boolean>(false);
  return (
    <div className="w-full h-full border-r border-[#CBCDD1] flex flex-col relative">
      <div className="absolute w-full top-0 left-0 right-0 h-fit lg:h-[110px] backdrop-blur-lg bg-white/20 z-[9999]">
        <Header showMenu={showMenu} setShowMenu={setShowMenu} />
        <SearchArea />
      </div>
      <ListContact />
    </div>
  );
}

function Header({
  showMenu,
  setShowMenu,
}: {
  showMenu: Boolean;
  setShowMenu: Dispatch<Boolean>;
}) {
  const routerStore = useRouterStore();
  const toFriends = () => {
    routerStore.setCurrentRoute(CurrentRoutType.Friends);
    setShowMenu(false);
  };
  const toNotifies = () => {
    routerStore.setCurrentRoute(CurrentRoutType.Notifies);
    setShowMenu(false);
  };

  return (
    <div className=" hidden lg:flex flex-row items-center justify-between px-[16px] pt-[12px] pb-[2px]">
      <div className=" font-bold text-[24px] text-[#050505]">
        <p>Chat</p>
      </div>
      <div className="flex flex-row items-center space-x-[12px] relative z-50">
        <div
          className=" w-[36px] h-[36px] bg-[#f0f2f5] hover:bg-[#E9E9E9]  rounded-full flex justify-center items-center cursor-pointer"
          onClick={() => setShowMenu(!showMenu)}
        >
          <IconContext.Provider value={{ color: "black", size: "20px" }}>
            <FiMoreHorizontal />
          </IconContext.Provider>
        </div>
        {!showMenu ? null : (
          <div className="absolute top-[40px]">
            <Menu setShowMenu={setShowMenu} />
          </div>
        )}
        <div
          className=" w-[36px] h-[36px] bg-[#f0f2f5] hover:bg-[#E9E9E9]  rounded-full flex justify-center items-center cursor-pointer"
          onClick={toFriends}
        >
          <IconContext.Provider value={{ color: "black", size: "20px" }}>
            <FaUserFriends />
          </IconContext.Provider>
        </div>

        <div
          className=" w-[36px] h-[36px] bg-[#f0f2f5] hover:bg-[#E9E9E9] rounded-full flex justify-center items-center cursor-pointer"
          onClick={toNotifies}
        >
          <IconContext.Provider value={{ color: "black", size: "1.15rem" }}>
            <RiNotification3Fill />
          </IconContext.Provider>
        </div>
      </div>
    </div>
  );
}

function Menu({ setShowMenu }: { setShowMenu: Dispatch<Boolean> }) {
  const clearAuth = useAuthStore((state) => state.clearAuth);
  const setRouter = useRouterStore((state) => state.setCurrentRoute);

  const toProfile = (): void => {
    setRouter(CurrentRoutType.Profile);
    setShowMenu(false);
  };

  return (
    <div className="flex flex-col space-y-0">
      <div
        className=" w-[345px] py-[10px] px-[8px] bg-white rounded-md
        shadow-2xl shadow-black/20 relative transition-all "
      >
        <div
          className=" p-[8px] flex flex-row items-center space-x-[8px]
            cursor-pointer hover:bg-[#F2F2F2] rounded-[8px] transition-all"
        >
          <IconContext.Provider value={{ color: "black", size: "20px" }}>
            <BsGear />
          </IconContext.Provider>
          <p>Settings</p>
        </div>
        <div
          className=" p-[8px] flex flex-row items-center space-x-[8px]
            cursor-pointer hover:bg-[#F2F2F2] rounded-[8px] transition-all"
          onClick={toProfile}
        >
          <IconContext.Provider value={{ color: "black", size: "20px" }}>
            <RiUserLine />
          </IconContext.Provider>
          <p>Profile</p>
        </div>
        <div
          className=" p-[8px] flex flex-row items-center space-x-[8px]
            cursor-pointer hover:bg-[#F2F2F2] rounded-[8px] transition-all"
        >
          <IconContext.Provider value={{ color: "black", size: "20px" }}>
            <BsPencilSquare />
          </IconContext.Provider>
          <p>Sends</p>
        </div>
        <div className="w-fill h-[1px] bg-[#CED0D4] my-[5px] mx-[15px]" />
        <div
          className=" p-[8px] flex flex-row items-center space-x-[8px] 
            cursor-pointer hover:bg-[#F2F2F2] rounded-[8px] transition-all"
          onClick={() => clearAuth()}
        >
          <IconContext.Provider value={{ color: "black", size: "20px" }}>
            <CiLogout />
          </IconContext.Provider>
          <p>Sign out</p>
        </div>
      </div>
    </div>
  );
}

function SearchArea() {
  const [key, setKey] = useState("");

  const handleSetKey = (event: ChangeEvent<HTMLInputElement>) => {
    setKey(event.target.value);
  };

  return (
    <div className="flex flex-row items-center justify-between px-[16px] pb-[12px] mt-[10px]">
      <div className="w-full rounded-full bg-[#f0f2f5] overflow-hidden flex flex-row items-center pl-[10px]">
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
                 lg:placeholder:text-[#050505] placeholder:text-[#f0f2f5] "
          placeholder="Search.."
          onChange={(event) => handleSetKey(event)}
          value={key}
        />
      </div>
    </div>
  );
}

function ListContact() {
  const ListContact = useMessageStore((state) => state.listContact);
  return (
    <div
      className="flex-1 flex flex-col space-y-[2px] overflow-y-scroll px-[8px] 
    items-start hide-scrollbar"
    >
      <div className=" w-full min-h-[60px] lg:min-h-[110px]" />
      <GroupItem />
      {ListContact?.map((contact, index) => (
        <ContactItems key={contact.id} contact={contact} />
      ))}
      <div className=" w-full min-h-[40px]" />
    </div>
  );
}

function ContactItems({ contact }: { contact: IContact }) {
  const messageStore = useMessageStore();
  const setCurrentRoute = useRouterStore((state) => state.setCurrentRoute);
  return (
    <div
      className={`${
        messageStore.currentChatPerson?.id == contact.id
          ? `bg-[#E9F2FE]`
          : `hover:bg-[#F2F2F2]`
      }  
          w-full h-[72px] rounded-[8px] p-[10px] cursor-pointer
          flex flex-row items-center space-x-[12px]
         `}
      onClick={() => {
        setCurrentRoute(CurrentRoutType.Chatbox);
        messageStore.setCurrentChatPerson({
          id: contact.id,
          username: contact.username,
        });
      }}
    >
      <img
        src="https://i.pinimg.com/564x/fe/f9/e5/fef9e5889245360d5df507be59276e17.jpg"
        alt="avatar"
        className=" w-[48px] h-[48px] rounded-full object-cover border-[1.5px] border-[#CBCDD1]"
      />
      <div className="space-y-[4px] lg:block hidden">
        <p className=" text-[14px] text-[#050505] leading-[18.66px]">
          {contact.username}
        </p>
        {contact.chat[0]?.createdAt ? (
          <div className="flex flex-row items-center space-x-2">
            <p className=" text-[12px] text-[#65676b] leading-[14.76px] max-w-[160px] truncate">
              {contact.chat[0]?.msg}
            </p>
            <p className=" text-[10px] text-[#65676b] leading-[14.76px]">
              • .. hours
            </p>
          </div>
        ) : (
          <p className=" text-[12px] text-[#65676b] leading-[14.76px]">
            start conversation
          </p>
        )}
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
