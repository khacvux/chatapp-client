import {
  IFriendStore,
  IUserResult,
  SystemThemeTypes,
  ThemeTypes,
} from "../../../core/dtos";
import { BsMessenger } from "react-icons/bs";
import { IconContext } from "react-icons";
import {
  useAuthStore,
  useFriendStore,
  usePreferenceStore,
} from "../../../core/store";

export default function ListResearch({
  listUserResult,
}: {
  listUserResult: [IUserResult] | IUserResult[];
}) {
  const friendStore = useFriendStore();
  const access_token = useAuthStore((state) => state.access_token);
  return (
    <div className="w-full h-full overflow-y-scroll hide-scrollbar flex flex-col items-center">
      <div className="block w-[500px] min-h-[80px] space-y-1" />
      {listUserResult?.map((item) => (
        <ResearchItem
          item={item}
          friendStore={friendStore}
          access_token={access_token}
          key={item.id}
        />
      ))}
      <div className="block w-[500px] min-h-[30px] space-y-1" />
    </div>
  );
}

const ResearchItem = ({
  item,
  friendStore,
  access_token,
}: {
  item: IUserResult;
  friendStore: IFriendStore;
  access_token: string;
}) => {
  return (
    <div className="w-[488px] px-3 py-2 flex flex-row items-center justify-between">
      <div className="flex flex-row items-center space-x-[8px]">
        <img
          src={
            item?.avatar
              ? item.avatar
              : "https://i.pinimg.com/564x/fe/f9/e5/fef9e5889245360d5df507be59276e17.jpg"
          }
          alt="avatar"
          className="w-[60px] h-[60px] rounded-full"
        />
        <div className="flex-1 flex-col items-start justify-center">
          <p
            className=" text-[15px] text-[#050505] leading-[18.66px] font-medium
             dark:text-[#e4e6eb]"
          >
            {item.username}
          </p>
          <p
            className="text-[13px] text-[#65676b] leading-[15.76px] max-w-[160px]
             truncate dark:text-[#b0b3b8]"
          >
            {item.email}
          </p>
        </div>
      </div>
      <div>
        <RequestButton
          item={item}
          friendStore={friendStore}
          access_token={access_token}
        />
      </div>
    </div>
  );
};

const RequestButton = ({
  item,
  friendStore,
  access_token,
}: {
  item: IUserResult;
  friendStore: IFriendStore;
  access_token: string;
}) => {
  const theme = usePreferenceStore((state) => state.theme);
  const systemTheme = usePreferenceStore((state) => state.systemTheme);

  const handleAddFriend = () => {
    friendStore.addFriend(access_token, item.id);
  };

  const handleCancelRequest = () => {
    friendStore.cancelRequest(access_token, item.id);
  };

  switch (item.status) {
    case 0:
      return (
        <button
          className="bg-blue-500 px-[12px] py-[2px] rounded-[8px] hover:bg-blue-600"
          onClick={handleAddFriend}
        >
          <p className="text-[13px] text-white">Add friend</p>
        </button>
      );
    case 1:
      return (
        <button
          className="bg-[#273A51] px-[12px] py-[2px] rounded-[8px] hover:bg-[#3E4D63]"
          onClick={handleCancelRequest}
        >
          <p className="text-[13px] text-[#2D88FF] font-medium">
            Cancel friend request
          </p>
        </button>
      );
    case 2:
      return (
        <button
          className="bg-[#3A3B3C] px-[12px] py-[2px] rounded-[8px] hover:bg-[#4E4F50]
                    flex flex-row items-center space-x-[5px]"
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
              size: "1.15rem",
            }}
          >
            <BsMessenger />
          </IconContext.Provider>
          <p className="text-[13px] text-[#EAECEF] font-medium ">Chat</p>
        </button>
      );
    default:
      return (
        <button
          className="bg-blue-500 px-[12px] py-[2px] rounded-[8px] hover:bg-blue-600"
          onClick={handleAddFriend}
        >
          <p className="text-[13px] text-white">Add friend</p>
        </button>
      );
  }
};
