import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export default function FriendSkeleton() {
  return (
    <div className="w-full h-full overflow-y-scroll hide-scrollbar flex flex-col items-center">
      <div className="block w-[500px] min-h-[70px] space-y-1" />
      <div className="w-[488px] px-3 py-2 flex flex-row items-center justify-between">
        <div className="flex flex-row items-center space-x-[8px]">
          <SkeletonTheme highlightColor="#D8DADE">
            <Skeleton circle={true} height={60} width={60} />
          </SkeletonTheme>
          <div className="flex-1 flex-col items-start justify-center">
            <p className=" text-[15px] text-[#050505] leading-[18.66px] font-medium dark:text-[#e4e6eb]"></p>
            <p className="text-[13px] text-[#65676b] leading-[15.76px] max-w-[160px] truncate"></p>
          </div>
        </div>
        <div className="flex flex-row items-center space-x-[5px]">
          <button className="bg-[#E4E6EA] px-[12px] py-[2px] rounded-[8px] hover:bg-[#D8DADE] dark:bg-[#303031] dark:hover:bg-[#444546]">
            <p className="text-[13px] text-black dark:text-white">Unfriend</p>
          </button>
          <button className="bg-blue-500 px-[12px] py-[2px] rounded-[8px] hover:bg-blue-600">
            <p className="text-[13px] text-white">Chat</p>
          </button>
        </div>
      </div>
    </div>
  );
}
