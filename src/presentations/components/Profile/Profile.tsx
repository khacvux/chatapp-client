import { TiCamera } from "react-icons/ti";
import { IconContext } from "react-icons";
import { useRouterStore } from "../../../core/store";
import { ModalTypes } from "../../../core/dtos";

export default function Profile() {
  const routerRoute = useRouterStore();
  return (
    <div className="w-full h-full flex flex-col items-center justify-center space-y-[50px]">
      <div
        className="w-[150px] min-h-[150px] overflow-hidden relative"
        onClick={() => routerRoute.setModals(ModalTypes.uploadAvatar)}
      >
        <div className="relative z-[1]">
          <img
            src="https://i.pinimg.com/564x/fe/f9/e5/fef9e5889245360d5df507be59276e17.jpg"
            alt="avatar"
            className="rounded-full w-[150px] h-[150px] hover:opacity-90 absolute z-[2]"
          />
          <div className="rounded-full w-[150px] h-[150px] bg-black z-[1]" />
        </div>
        <div
          className="absolute bottom-[2px] right-[2px] w-[39px] h-[39px] bg-[#e4e6eb] border-[3px]
           border-white rounded-full flex items-center justify-center cursor-pointer
           hover:bg-[#D8DADE] z-[3]"
        >
          <IconContext.Provider value={{ color: "black", size: "20px" }}>
            <TiCamera />
          </IconContext.Provider>
        </div>
      </div>
      <div className="w-[450px] flex flex-col items-center space-y-[3px]">
        <div className="w-full p-[5px] flex flex-row items-center justify-between">
          <div className="flex flex-row items-center space-x-[4px] ">
            <p className="text-[13px] text-[#65676b]">username:</p>
            <p className="text-[15px]">Test1</p>
          </div>
          <div>
            <button className=" font-medium text-blue-500">Edit</button>
          </div>
        </div>
        <div className=" w-full h-[1px] bg-[#CBCDD1]" />
        <div className="w-full p-[5px] flex flex-row items-center justify-between">
          <div className="flex flex-row items-center space-x-[4px] ">
            <p className="text-[13px] text-[#65676b]">email:</p>
            <p className="text-[15px]">Test1@gmail.com</p>
          </div>
          <div>
            <button className=" font-medium text-blue-500">Edit</button>
          </div>
        </div>
        <div className=" w-full h-[1px] bg-[#CBCDD1]" />
        <div className="w-full p-[5px] flex flex-row items-center justify-between">
          <div className="flex flex-row items-center space-x-[4px] ">
            <p className="text-[13px] text-[#65676b]">contact number:</p>
            <p className="text-[15px]">0984848484</p>
          </div>
          <div>
            <button className=" font-medium text-blue-500">Edit</button>
          </div>
        </div>
      </div>
    </div>
  );
}
