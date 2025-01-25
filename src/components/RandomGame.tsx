import { AnimatePresence, motion } from "motion/react";
import ConsolePicker, { ConsolesProps } from "./Random Game/ConsolePicker";
import { useEffect, useState } from "react";
import { MdNavigateNext } from "react-icons/md";
import MoodPicker from "./Random Game/MoodPicker";
const RandomGame = () => {
  const consoles: ConsolesProps[] = [
    {
      id: 4,
      name: "PC",
    },
    {
      id: 187,
      name: "PS5",
    },
    {
      id: 18,
      name: "PS4",
    },
    {
      id: 186,
      name: "Xbox Series X/S",
    },
    {
      id: 7,
      name: "Nintendo Switch",
    },
    {
      id: 21,
      name: "Android",
    },
    {
      id: 3,
      name: "iOS",
    },
    {
      id: 1,
      name: "Xbox One",
    },
  ];
  const [selectedConsole, setSelectedConsole] = useState<string[]>([]);
  const [selectedMood, setSelectedMood] = useState<string>("");
  const [currentPosition, setCurrentPosition] = useState(0);
  const updateSelectedConsoles = (consoleName: string) => {
    if (selectedConsole.includes(consoleName)) {
      setSelectedConsole(selectedConsole.filter((e) => e !== consoleName));
    } else {
      setSelectedConsole([...selectedConsole, consoleName]);
    }
  };
  useEffect(() => {
    if (currentPosition === 0) {
      setSelectedMood("");
    }
    //To delete after
    if (currentPosition === 2) {
      console.log(selectedConsole, selectedMood);
    }
  }, [currentPosition]);
  return (
    <>
      <motion.div className="flex flex-col max-w-screen w-full overflow-hidden">
        {currentPosition < 2 && (
          <div className="w-full flex items-end justify-end py-6 px-6 text-2xl">
            {[...Array(2)].map((_, index) => (
              <div
                className={`${
                  currentPosition >= index
                    ? "text-lightSecondMainColor dark:text-darkSecondMainColor"
                    : "text-lightTextColor dark:text-darkTextColor"
                }`}
                key={index}
              >
                <MdNavigateNext />
              </div>
            ))}
          </div>
        )}
        <AnimatePresence mode="wait">
          {currentPosition === 0 && (
            <motion.div
              key="consolePicker"
              initial={{ opacity: 0, x: "-100vw" }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: "100vw" }}
              className="flex items-center justify-center"
            >
              <ConsolePicker
                data={consoles}
                selectedConsole={selectedConsole}
                updateSelectedConsoles={updateSelectedConsoles}
                setCurrentPosition={setCurrentPosition}
              />
            </motion.div>
          )}
          {currentPosition === 1 && (
            <motion.div
              key="moodPicker"
              initial={{ opacity: 0, x: "-100vw" }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: "100vw" }}
              className="flex items-center justify-center"
            >
              <MoodPicker
                selectedMood={selectedMood}
                setSelectedMood={setSelectedMood}
                setCurrentPosition={setCurrentPosition}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </>
  );
};
export default RandomGame;
