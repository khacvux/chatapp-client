// import ContactCardContainer from "./contactCardContainer";
// import FunctionButton from "../funBtn";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import Divider from "@mui/material/Divider";
import Settings from "@mui/icons-material/Settings";
import Logout from "@mui/icons-material/Logout";
import { ChangeEvent, useState } from "react";
import IconButton from '@mui/material/IconButton';
import Avatar from '@mui/material/Avatar';
import { FiMoreHorizontal } from "react-icons/fi";
import { IoIosSearch } from "react-icons/io"
import { IconContext } from "react-icons";
import { BsPencilSquare } from 'react-icons/bs'


export default function ContactsContainer() {
    return (
        <div className="w-full h-full border-r border-[#CBCDD1] flex flex-col" >
            <Header />
            <SearchArea />
            <ListContact />
        </div>
    )
}



function Header() {
    return (
        <div className="flex flex-row items-center justify-between px-[16px] py-[12px]" >
            <div className=" font-bold text-[24px] text-[#050505]">
                <p>Chat</p>
            </div>
            <div className="flex flex-row items-center space-x-[12px]">
                <div className=" w-[36px] h-[36px] bg-[#f0f2f5] rounded-full flex justify-center items-center cursor-pointer">
                    <IconContext.Provider value={{ color: "black", size: "20px" }} >
                        <FiMoreHorizontal />
                    </IconContext.Provider>
                </div>
                <div className=" w-[36px] h-[36px] bg-[#f0f2f5] rounded-full flex justify-center items-center cursor-pointer">
                    <IconContext.Provider value={{ color: "black", size: "20px" }} >
                        <BsPencilSquare />
                    </IconContext.Provider>
                </div>

            </div>
        </div>
    )
}

function SearchArea() {

    const [key, setKey] = useState("")

    const handleSetKey = (event: ChangeEvent<HTMLInputElement>) => {
        setKey(event.target.value)
    }

    return (
        <div className="flex flex-row items-center justify-between px-[16px] pb-[12px]" >
            <div className="w-full rounded-full bg-[#f0f2f5] overflow-hidden flex flex-row items-center pl-[10px]">
                {
                    key ? null : (
                        <div>
                            <IconContext.Provider value={{ color: "#606770", size: "20px" }} >
                                <IoIosSearch />
                            </IconContext.Provider>
                        </div>
                    )
                }
              
                <input
                    id="searchbox"
                    type="text" 
                    className=" text-[15px] bg-inherit text-[#050505] pl-[6px] pr-[9px] py-[5px] outline-none cursor-text w-full placeholder:text-[#050505]"
                    placeholder="Search.."
                    onChange={(event) => handleSetKey(event)}
                    value={key}
                    />
            </div>
        </div>
    )
}

function ListContact() {
    return (
        <div className=" flex-1 flex flex-col space-y-[2px] overflow-y-scroll px-[8px] items-start">
            <ContactItems />
            <ContactItems />
            <ContactItems />
        </div>
    )
}

function ContactItems() {
    return (
        <div className="bg-[#E9F2FE] w-full h-[72px] rounded-[8px] p-[8px] cursor-pointer
         hover:bg-[#F2F2F2] flex flex-row items-center space-x-[12px]
         ">
            <img 
                src="https://i.pinimg.com/564x/01/93/92/019392073918e613036ef994832da503.jpg" 
                alt="avatar" 
                className=" w-[56px] h-[56px] rounded-full object-cover border-[1.5px] border-[#bec0c3]"
            />
            <div className="space-y-[4px]">
                <p className=" text-[14px] text-[#050505] leading-[18.66px]">
                    test user
                </p>
                <div className="flex flex-row items-center space-x-2" >
                    <p className=" text-[12px] text-[#65676b] leading-[14.76px]">
                        test user
                    </p>
                    <p className=" text-[10px] text-[#65676b] leading-[14.76px]">
                        • 4 hours
                    </p>
                </div>
                
            </div>
        </div>
    )
}