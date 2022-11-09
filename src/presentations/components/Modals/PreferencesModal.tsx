import { IoClose } from "react-icons/io5";
import { IconContext } from "react-icons";
import { useRouterStore } from "../../../core/store";
import { ModalTypes, SystemThemeTypes, ThemeTypes } from "../../../core/dtos";
import { HiMoon } from "react-icons/hi";
import { MdRadioButtonChecked, MdRadioButtonUnchecked } from "react-icons/md";
import { usePreferenceStore } from "../../../core/store/preferenceStore";

export default function PreferencesModal() {
  const theme = usePreferenceStore((state) => state.theme);
  const systemTheme = usePreferenceStore((state) => state.systemTheme);
  return (
    <div
      className="md:w-[650px] w-[100vw] md:h-[70vh] h-[100vh] bg-white
        md:rounded-[20px] overflow-hidden relative dark:bg-[#242526]"
    >
      <Close theme={theme} />
      <div className="h-[80vh] w-full px-[20px] flex flex-row space-x-[4px]">
        <div className="w-[40%] pt-[15px]">
          <p className="text-[13px] font-medium mb-[10px] dark:text-[#7C7D7D]">
            Preferences
          </p>
          <AppearanceTab theme={theme} systemTheme={systemTheme} />
        </div>
        <div className="w-[1px] min-h-full bg-[#F1F1F1] dark:bg-[#2F3031]" />
        <AppearanceContainer theme={theme} systemTheme={systemTheme} />
      </div>
    </div>
  );
}

const AppearanceTab = ({
  theme,
  systemTheme,
}: {
  theme: ThemeTypes;
  systemTheme: SystemThemeTypes;
}) => {
  return (
    <div
      className=" flex flex-row items-center space-x-2 cursor-pointer
     rounded-lg p-[8px] hover:bg-[#F2F2F2] dark:hover:bg-[#38393A]"
    >
      <div
        className="w-[35px] h-[35px] rounded-full cursor-pointer bg-black dark:bg-[#fff]
              flex justify-center items-center "
      >
        <IconContext.Provider
          value={{
            color:
              theme == ThemeTypes.System
                ? systemTheme == SystemThemeTypes.Dark
                  ? "#000"
                  : "#fff"
                : theme == ThemeTypes.Dark
                ? "#000"
                : "#fff",
            size: "1.3rem",
          }}
        >
          <HiMoon />
        </IconContext.Provider>
      </div>
      <div className="space-y-[0px]">
        <p className="text-[14px] font-medium leading-[1.3rem] dark:text-white">
          Appearance
        </p>
        <p className=" text-[11px] text-[#7F7F7F] leading-[1.2rem] dark:text-[#7C7D7D] capitalize">
          {theme}
        </p>
      </div>
    </div>
  );
};

const AppearanceContainer = ({
  theme,
  systemTheme,
}: {
  theme: ThemeTypes;
  systemTheme: SystemThemeTypes;
}) => {
  const preferenceStore = usePreferenceStore();
  return (
    <div className="flex-1  h-full pt-[40px] px-[10px] dark:text-white">
      <div className="flex flex-col">
        <p className="text-[14px]">Theme</p>
        <div className="mx-[10px]">
          <div
            className="flex flex-row items-center space-x-2 cursor-pointer"
            onClick={() => {
              preferenceStore.setTheme(ThemeTypes.Dark);
            }}
          >
            <IconContext.Provider
              value={{
                color:
                  theme == ThemeTypes.System
                    ? systemTheme == SystemThemeTypes.Dark
                      ? "#fff"
                      : "#000"
                    : theme == ThemeTypes.Dark
                    ? "#fff"
                    : "#000",
                size: "1rem",
              }}
            >
              {preferenceStore.theme == ThemeTypes.Dark ? (
                <MdRadioButtonChecked />
              ) : (
                <MdRadioButtonUnchecked />
              )}
            </IconContext.Provider>
            <p>Dark</p>
          </div>

          <div
            className="flex flex-row items-center space-x-2 cursor-pointer"
            onClick={() => {
              preferenceStore.setTheme(ThemeTypes.Light);
            }}
          >
            <IconContext.Provider
              value={{
                color:
                  theme == ThemeTypes.System
                    ? systemTheme == SystemThemeTypes.Dark
                      ? "#fff"
                      : "#000"
                    : theme == ThemeTypes.Dark
                    ? "#fff"
                    : "#000",
                size: "1rem",
              }}
            >
              {preferenceStore.theme == ThemeTypes.Light ? (
                <MdRadioButtonChecked />
              ) : (
                <MdRadioButtonUnchecked />
              )}
            </IconContext.Provider>
            <p>Light</p>
          </div>

          <div
            className="flex flex-row items-center space-x-2 cursor-pointer"
            onClick={() => {
              preferenceStore.setTheme(ThemeTypes.System);
            }}
          >
            <IconContext.Provider
              value={{
                color:
                  theme == ThemeTypes.System
                    ? systemTheme == SystemThemeTypes.Dark
                      ? "#fff"
                      : "#000"
                    : theme == ThemeTypes.Dark
                    ? "#fff"
                    : "#000",
                size: "1rem",
              }}
            >
              {preferenceStore.theme == ThemeTypes.System ? (
                <MdRadioButtonChecked />
              ) : (
                <MdRadioButtonUnchecked />
              )}
            </IconContext.Provider>
            <p>Mirror system preferences</p>
          </div>
        </div>
      </div>
    </div>
  );
};

const Close = ({ theme }: { theme: ThemeTypes }) => {
  const setModal = useRouterStore((state) => state.setModals);
  const systemTheme = usePreferenceStore((state) => state.systemTheme);
  const close = () => {
    setModal(ModalTypes.none);
  };
  return (
    <div
      className=" w-[30px] h-[30px] flex justify-center items-center absolute top-[5px] right-[5px]
            cursor-pointer hover:bg-[#F2F2F2] rounded-full transition-all z-[10001] dark:hover:bg-[#38393A]"
      onClick={close}
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
        <IoClose />
      </IconContext.Provider>
    </div>
  );
};
