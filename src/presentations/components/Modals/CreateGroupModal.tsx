import { IoClose } from "react-icons/io5";
import { IconContext } from "react-icons";
import { useRouterStore,useListFriendStore } from "../../../core/store";
import { IFriend, ModalTypes } from "../../../core/dtos";
import { IoIosSearch } from "react-icons/io";
import "./scrollbar.css";
import React, { ChangeEvent, useEffect, useRef, useState } from "react";

export default function CreateGroupModal() {
	/// L: list
	const setModal = useRouterStore((state) => state.setModals);
	const setListFriends = useListFriendStore(state => state.setListFriends);
	const setListFriendsSelected = useListFriendStore(state => state.setListFriendsSelected);
	setListFriends([{ id: 1 }, { id: 2 }, { id: 3 }])
	setListFriendsSelected([])

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
			{/* <ListFriendsSelected  listFriendsSelected={LFriendsSelected_test} updateLFriendsSelected={updateLFriendsSelected}/>
			<ListFriends LFriends={LFriend_test} setLFriendsSelected={updateLFriendsSelected} checkLFriendsSelected={checkLFriendsSelected}  /> */}
			<ListFriendsSelected  />
			<ListFriends/>
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
	const listFriends = useListFriendStore(state=>state.listFriends)

	return (
		<div className="w-full h-full mt-[10px] px-[15px]">
			<p className="font-medium text-[#8c8e91] mb-[10px]">Friends</p>
			{listFriends.map((friend, index) => (
				<FriendItem friend={friend} key={index} />
			))}
		</div>
	);
};

const FriendItem = ({ friend}: { friend:IFriend}) => {
	const pushListFriendsSelected = useListFriendStore(state =>state.pushListFriendsSelectedItem)
	const removeListFriendsSelected = useListFriendStore(state =>state.removeListFriendsSelectedItem)
	const [isChecked, setIsChecked] = useState(false);
	let checked = (e: React.MouseEvent<HTMLInputElement, MouseEvent>) => {
		// setIsChecked(checkLFriendsSelected(friend))
		setIsChecked(!isChecked)
		if (!isChecked) {
			pushListFriendsSelected(friend)
		} else {
			removeListFriendsSelected(friend)
		}
		console.log(isChecked);
	};
	return (
		<label
			htmlFor={"friend-group_select_id-" + friend.id}
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
						id={"friend-group_select_id-" + friend.id}
					/>
				</div>
			</div>
		</label>
	);
};

const ListFriendsSelected = () => {
	const listFriendsSelected = useListFriendStore(state=>state.listFriendsSelected)
	return (
		<div className="p-2 pl-1 flex overflow-x-auto ">
			{listFriendsSelected.map((friend,key) => (
				<ItemFriendSelected friend={friend} key={key} />
			))}
		</div>
	)
};

const ItemFriendSelected = ({ friend}: {friend:IFriend}) => {
	const removeListFriendsSelected = useListFriendStore(state=>state.removeListFriendsSelectedItem)
	const remove =(e:React.MouseEvent<HTMLDivElement, MouseEvent>)=>{
		e.preventDefault()
		removeListFriendsSelected(friend)
	}
	return (
		<div className="mx-4 flex flex-col justify-center items-center cursor-pointer" onClick={remove}>
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
				<p className="font-light text-[0.9em]">Username{" "+friend.id} </p>
			</div>
		</div>
	);
};

