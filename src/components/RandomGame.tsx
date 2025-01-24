import { motion } from "motion/react";
import ConsolePicker, { ConsolesProps } from "./Random Game/ConsolePicker";
import { useState } from "react";
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
  // const [currentPosition, setCurrentPosition] = useState(0);
  const updateSelectedConsoles = (consoleName: string) => {
    if (selectedConsole.includes(consoleName)) {
      setSelectedConsole(selectedConsole.filter((e) => e !== consoleName));
    } else {
      setSelectedConsole([...selectedConsole, consoleName]);
    }
  };
  return (
    <>
      <motion.div className="min-h-screen flex items-center justify-center">
        <ConsolePicker
          data={consoles}
          selectedConsole={selectedConsole}
          updateSelectedConsoles={updateSelectedConsoles}
        />
      </motion.div>
    </>
  );
};
export default RandomGame;
