import { IoClose } from "react-icons/io5";
import { IconContext } from "react-icons";
import { useRouterStore } from "../../../core/store";
import { ModalTypes } from "../../../core/dtos";
import { IoIosSearch } from "react-icons/io";
import React, { ChangeEvent, useEffect, useRef, useState } from "react";
import { flushSync } from "react-dom";
export default function CreateGroupModal() {
	const [testListFriend, setTestListFriend] = useState([{ id: 1 }, { id: 2 }, { id: 3 }])
	let [testListFriendsSelected,setTestListFriendsSelected] = useState<{ id: number }[]>([])
	const setModal = useRouterStore((state) => state.setModals);

	
	const [test,setTest] = useState(0) 

	const setListFriendsSelected = async(value:{id:number},add:boolean=true)=>{
		const temp = [...testListFriendsSelected]
		if (add) {
			temp.push(value)
			setTestListFriendsSelected(temp)
		}else {
			const index = temp.findIndex(i => i.id === value.id)
			console.log(index)
			if (index != undefined && index > -1) {
				temp.splice(index, 1);
			}
			setTestListFriendsSelected(temp)
		}
	}

	// const testListFriend: { id: number; }[] | undefined = [{ id: 1 }, { id: 2 }, { id: 3 }];
	// const testListFriendSelected: { id: number; }[] | undefined = [];
	useEffect(()=>{
		console.log("test -18:",testListFriendsSelected)
	},[testListFriendsSelected.length])
	useEffect(()=>{
		console.log("test -23:",test)
	},[test])

	const close = () => {
		setModal(ModalTypes.none);
	};
	const addTest=()=>{
		setTest(test+1)
	}
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
			<div onClick={addTest} className="hidden" >{test}</div>
			<div className="w-full h-[40px] flex flex-row items-center justify-center">
				<p className="text-[16px] font-medium">New Group</p>
			</div>
			<TypeGroupName />
			<FriendSearch />
			<ListFriendSelected listFriendsSelected={testListFriendsSelected} />
			<ListFriends listFriends={testListFriend} listFriendsSelected={testListFriendsSelected} setListFriendsSelected={setListFriendsSelected} />
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


const ListFriends = ({ listFriends, listFriendsSelected,setListFriendsSelected }: {
	listFriends?: {
		id: number
	}[],
	listFriendsSelected: {
		id: number;
	}[],
	setListFriendsSelected:(value: {
		id: number;
	}, add?:boolean)=>Promise<void>

}) => {
	return (
		<div className="w-full h-full mt-[10px] px-[15px]">
			<p className="font-medium text-[#8c8e91] mb-[10px]" onClick={()=>{console.log(listFriendsSelected)}}>Friends</p>
			{listFriends?.map((friend, index) => (
				<FriendItem id={friend.id} key={index} listFriendsSelected={listFriendsSelected} setListFriendsSelected={setListFriendsSelected} />
			))}
		</div>
	);
};

const FriendItem = ({ id, listFriendsSelected,setListFriendsSelected }: {
	id: number,
	listFriendsSelected: {
		id: number;
	}[],
	setListFriendsSelected:(value: {
		id: number;
	}, add?: boolean)=>void
}
) => {
	const [isChecked, setIsChecked] = useState(false);
	let checked = (e: React.MouseEvent<HTMLInputElement, MouseEvent>) => {
		if (!isChecked) {
			setListFriendsSelected({id})
		} else {
			setListFriendsSelected({id},false)
		}
		setIsChecked(!isChecked);
		
	};
	useEffect(()=>{
		console.log(listFriendsSelected)
	},[listFriendsSelected])
	return (
		<label
			htmlFor={"friend-group_select_id-" + id}
			className="w-full px-[5px] flex flex-row items-center space-x-[15px] "
		>
			<img
				src="https://i.pinimg.com/564x/fe/f9/e5/fef9e5889245360d5df507be59276e17.jpg"
				alt="avatar"
				className=" w-[48px] h-[48px] rounded-full"
			/>

			<div className="flex-1 h-[60px] w-full border-b-[.5px] border-[#CBCDD1] flex items-center justify-between">
				<p className=" font-normal">Username {"" + isChecked}</p>
				<div className="relative">
					<input
						type="radio"
						className=""
						checked={isChecked}
						onClick={checked}
						readOnly
						id={"friend-group_select_id-" + id}
					/>
				</div>
			</div>
		</label>
	);
};

const ListFriendSelected = (
	{
		listFriendsSelected
	}: {
		listFriendsSelected: {
			id: number;
		}[]
	}) => {
	
	return (
		<div className="p-2 pl-1 flex overflow-x-auto ">
			{listFriendsSelected.map((friend,key) => (
				<FriendSelectedItem id={friend.id} key={key}  />
			))}
		</div>
	)
};


const FriendSelectedItem = ({ id }: { id: number }) => {
	return (
		<div className="mx-4 flex flex-col justify-center items-center cursor-pointer">
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
				<p className="font-light text-[0.9em]">Username{" "+id} </p>
			</div>
		</div>
	);
};

