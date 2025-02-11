import { FaWindows, FaXbox } from "react-icons/fa6";
import {
  SiPlaystation5,
  SiPlaystation4,
  SiNintendoswitch,
  SiAndroid,
  SiApple,
} from "react-icons/si";
import { RiXboxLine } from "react-icons/ri";
import { useState } from "react";
import { motion } from "motion/react";
export interface ConsolesProps {
  id: number;
  name: string;
}
interface ConsolePickerProps {
  data: ConsolesProps[];
  selectedConsole: string[];
  updateSelectedConsoles: (consoleID: string) => void;
  setCurrentPosition: (position: number | ((prev: number) => number)) => void;
}
const ConsolePicker = ({
  data,
  selectedConsole,
  updateSelectedConsoles,
  setCurrentPosition,
}: ConsolePickerProps) => {
  const [consoleHover, setConsoleHover] = useState<{
    id: number | null;
    hover: boolean;
  }>({ id: null, hover: false });
  const [nextButtonAnimation, setNextButtonAnimation] = useState(false);
  const [showError, setShowError] = useState(false);
  return (
    <>
      {data.length > 0 ? (
        <div className="py-12 px-5 relative">
          <div className="font-bold w-full text-center pb-6 text-4xl max-lg:text-3xl max-md:text-2xl">
            Select your favourite consoles and click Next
          </div>
          {/* <div className="fixed top-0 left-0 h-full w-full flex items-center justify-center font-bold">
            <div
              className="bg-lightMainColor dark:bg-darkMainColor text-lightBgColor dark:text-darkBgColor rounded px-6 py-2 shadow-lg shadow-lightBgColor dark:shadow-darkBgColor"
            >
              Please select at least one console before you can proceed
            </div>
          </div> */}
          <div className="flex justify-center flex-wrap min-w-[960px] gap-6 max-lg:min-w-[95%]">
            {data.map((e) => (
              <motion.div
                key={e.id}
                onClick={() => updateSelectedConsoles(e.id.toString())}
                onHoverStart={() => setConsoleHover({ id: e.id, hover: true })}
                onHoverEnd={() => setConsoleHover({ id: e.id, hover: false })}
                className="flex items-center justify-center gap-2 flex-col cursor-pointer rounded-md bg-lightBgColor dark:bg-darkBgColor w-1/5 max-lg:w-1/4 max-md:w-1/3 max-sm:w-"
              >
                <motion.div
                  className={`text-8xl w-full py-6 px-3 flex items-center justify-center overflow-hidden max-lg:text-6xl`}
                  initial={{ scale: 1 }}
                  animate={
                    consoleHover.id === e.id && consoleHover.hover
                      ? {
                          scale: 1.1,
                          transition: {
                            duration: 0.5,
                            type: "spring",
                            stiffness: 300,
                          },
                        }
                      : {}
                  }
                >
                  {e.name === "PC" ? (
                    <FaWindows />
                  ) : e.name === "PS5" ? (
                    <SiPlaystation5 />
                  ) : e.name === "PS4" ? (
                    <SiPlaystation4 />
                  ) : e.name === "Xbox Series X/S" ? (
                    <FaXbox />
                  ) : e.name === "Xbox One" ? (
                    <RiXboxLine />
                  ) : e.name === "Nintendo Switch" ? (
                    <SiNintendoswitch />
                  ) : e.name === "Android" ? (
                    <SiAndroid />
                  ) : e.name === "iOS" ? (
                    <SiApple />
                  ) : (
                    ""
                  )}
                </motion.div>
                <div
                  className={`w-full p-3 flex justify-center items-center text-xl bg-light border-t-2 font-bold rounded-b-md ease-in duration-200 transition-all border-t-lightMainColor dark:border-t-darkMainColor max-md:text-lg ${
                    selectedConsole.find((cons) => cons === e.id.toString()) ||
                    (consoleHover.id === e.id && consoleHover.hover)
                      ? "bg-lightSecondMainColor text-lightMainColor dark:bg-darkSecondMainColor dark:text-secondDarkBgColor"
                      : ""
                  }
                  }`}
                >
                  {e.name}
                </div>
              </motion.div>
            ))}
          </div>
          <div className="my-5 flex items-center justify-center text-xl font-bold ">
            <motion.div
              className="bg-lightBgColor text-lightMainColor dark:bg-darkBgColor dark:text-darkMainColor px-4 py-2 rounded-md cursor-pointer relative flex items-center justify-center overflow-hidden"
              onHoverStart={() => setNextButtonAnimation(true)}
              onHoverEnd={() => setNextButtonAnimation(false)}
              onClick={() =>
                setCurrentPosition((prev) =>
                  selectedConsole.length > 0 ? prev + 1 : prev
                )
              }
            >
              <motion.div
                className="absolute rounded-full bg-lightSecondMainColor  dark:bg-darkSecondMainColor"
                whileHover={{
                  width: "150%",
                  height: "150%",
                  transition: { duration: 1 },
                }}
                initial={nextButtonAnimation ? {} : { width: 0, height: 0 }}
                animate={
                  nextButtonAnimation
                    ? {
                        width: "150%",
                        height: "150%",
                        transition: { duration: 1 },
                      }
                    : {}
                }
              ></motion.div>
              <motion.div
                className={`relative z-10 ease-in duration-200 transition-all ${
                  nextButtonAnimation
                    ? "dark:text-darkMainColor text-lightMainColor"
                    : ""
                }`}
              >
                Next
              </motion.div>
            </motion.div>
          </div>
        </div>
      ) : (
        ""
      )}
    </>
  );
};
export default ConsolePicker;
