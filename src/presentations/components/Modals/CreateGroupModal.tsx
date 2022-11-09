import { IoClose } from "react-icons/io5";
import { IconContext } from "react-icons";
import { useRouterStore } from "../../../core/store";
import { ModalTypes } from "../../../core/dtos";
import { IoIosSearch } from "react-icons/io";
import { ChangeEvent, useState } from "react";

export default function CreateGroupModal() {
  const setModal = useRouterStore((state) => state.setModals);
  const close = () => {
    setModal(ModalTypes.none);
  };
  return (
    <div
      className="md:w-[650px] w-[100vw] md:h-[80vh] h-[100vh] bg-white
        md:rounded-[20px] relative px-[30px] overflow-hidden"
    >
      <div
        className=" w-[30px] h-[30px] flex justify-center items-center absolute top-[5px] right-[5px]
            cursor-pointer hover:bg-[#F2F2F2] rounded-full transition-all z-[10001]"
        onClick={close}
      >
        <IconContext.Provider value={{ color: "#000", size: "1.3rem" }}>
          <IoClose />
        </IconContext.Provider>
      </div>
      <div className="w-full h-[40px] flex flex-row items-center justify-center">
        <p className="text-[16px] font-medium">New Group</p>
      </div>
      <TypeGroupName />
      <FriendSearch />
      <ListFriends />
    </div>
  );
}

const TypeGroupName = () => {
  return (
    <div className="flex flex-row items-center px-[15px] py-[5px] mt-[10px] space-x-2">
      <p className="text-[14px] text-[#242525] font-light">Group name: </p>
      <input type="text" placeholder="(optional)" className="outline-none" />
    </div>
  );
};

const FriendSearch = () => {
  const [key, setKey] = useState("");

  const handleSetKey = (event: ChangeEvent<HTMLInputElement>) => {
    setKey(event.target.value);
  };
  return (
    <div className="w-full rounded-full bg-[#f0f2f5] overflow-hidden flex flex-row items-center pl-[10px] my-[5px]">
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
             placeholder:text-[#050505] text-[14px] "
        placeholder="Search.."
        onChange={(event) => handleSetKey(event)}
        value={key}
      />
    </div>
  );
};

const ListFriends = () => {
  return (
    <div className="w-full h-full mt-[10px] px-[15px]">
      <p className="font-medium text-[#8c8e91] mb-[10px]">Friends</p>
      <FriendItem />
      <FriendItem />
      <FriendItem />
      <FriendItem />
      <FriendItem />
      <FriendItem />
    </div>
  );
};

const FriendItem = () => {
  return (
    <div className="w-full px-[5px] flex flex-row items-center space-x-[15px]">
      <img
        src="https://i.pinimg.com/564x/fe/f9/e5/fef9e5889245360d5df507be59276e17.jpg"
        alt="avatar"
        className=" w-[48px] h-[48px] rounded-full"
      />
      <div className="flex-1 h-[60px] w-full border-b-[.5px] border-[#CBCDD1] flex items-center">
        <p className=" font-normal">Username</p>
      </div>
    </div>
  );
};
