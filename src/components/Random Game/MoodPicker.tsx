import { motion } from "motion/react";
import { useState } from "react";
// Interface for each mood
interface MoodProps {
  id: number;
  mood: string;
  emoji: string;
}
// Interface for the props of the MoodPicker component
// This interface is used to define the props that the MoodPicker component will receive
interface MoodPickerProps {
  selectedMood: string;
  setSelectedMood: (mood: string) => void;
  setCurrentPosition: (position: number | ((prev: number) => number)) => void;
}
// A set of moods with their corresponding emojis
const categoryToMood = [
  {
    id: 4,
    mood: "Excited",
    emoji: "⚡",
  },
  {
    id: 51,
    mood: "Creative",
    emoji: "🎨",
  },
  {
    id: 3,
    mood: "Curious",
    emoji: "🧭",
  },
  {
    id: 5,
    mood: "Immersive",
    emoji: "🛡️",
  },
  {
    id: 10,
    mood: "Focused",
    emoji: "♟️",
  },
  {
    id: 2,
    mood: "Adrenaline",
    emoji: "🎯",
  },
  {
    id: 40,
    mood: "Relaxed",
    emoji: "☕",
  },
  {
    id: 14,
    mood: "Thoughtful",
    emoji: "🛠️",
  },
  {
    id: 7,
    mood: "Pensive",
    emoji: "🧩",
  },
  {
    id: 11,
    mood: "Energetic",
    emoji: "🕹️",
  },
  {
    id: 83,
    mood: "Adventurous",
    emoji: "🏃",
  },
  {
    id: 59,
    mood: "Collaborative",
    emoji: "🌐",
  },
  {
    id: 1,
    mood: "Thrilled",
    emoji: "🏎️",
  },
  {
    id: 15,
    mood: "Competitive",
    emoji: "⚽",
  },
  {
    id: 6,
    mood: "Intense",
    emoji: "🥊",
  },
  {
    id: 19,
    mood: "Wholesome",
    emoji: "👨‍👩‍👧",
  },
  {
    id: 28,
    mood: "Strategic",
    emoji: "🎲",
  },
  {
    id: 34,
    mood: "Inquisitive",
    emoji: "📚",
  },
  {
    id: 17,
    mood: "Tactical",
    emoji: "🃏",
  },
];
const MoodPicker = ({
  selectedMood,
  setSelectedMood,
  setCurrentPosition,
}: MoodPickerProps) => {
  const [moodHover, setMoodHover] = useState<{
    id: number | null;
    hover: boolean;
  }>({ id: null, hover: false });
  const [nextButtonAnimation, setNextButtonAnimation] = useState(false);
  const [prevButtonAnimation, setPrevButtonAnimation] = useState(false);
  const [displayError, setDispayError] = useState<boolean>(false);
  return (
    <>
      {categoryToMood.length > 0 ? (
        <div className="py-12 px-5">
          <div className="font-bold w-full text-center pb-6 text-4xl max-lg:text-3xl max-md:text-2xl">
            Select your current Mood
          </div>
          <div className="flex justify-center flex-wrap min-w-[960px] gap-6 max-lg:min-w-[95%]">
            {categoryToMood.map((e: MoodProps) => (
              <motion.div
                key={e.id}
                onHoverStart={() => setMoodHover({ id: e.id, hover: true })}
                onHoverEnd={() => setMoodHover({ id: e.id, hover: false })}
                className={`flex items-center justify-center gap-2 flex-col cursor-pointer rounded-md bg-lightBgColor dark:bg-darkBgColor w-1/5 max-lg:w-1/4 max-md:w-1/3 max-sm:w-1/2 ${
                  selectedMood === e.id.toString()
                    ? "border-2 border-lightSecondMainColor dark:border-darkSecondMainColor"
                    : ""
                }`}
                animate={
                  moodHover.id === e.id && moodHover.hover
                    ? {
                        scale: 1.05,
                        transition: {
                          duration: 0.5,
                          type: "spring",
                          stiffness: 300,
                        },
                      }
                    : {}
                }
                onClick={() => setSelectedMood(e.id.toString())}
              >
                <div className="text-4xl w-full py-6 px-3 flex items-center justify-center overflow-hidden ">
                  {e.emoji}
                </div>
                <div className="font-bold text-2xl">{e.mood}</div>
              </motion.div>
            ))}
          </div>
          <div className="my-5 flex flex-col items-center justify-center text-xl font-bold gap-2">
            <div
              className={`text-red-500 mr-2 text-base ${
                displayError ? "block" : "hidden"
              }`}
            >
              You must select at least one mood
            </div>
            <div className="flex items-center justify-center gap-6">
              <motion.div
                className="bg-lightBgColor text-lightMainColor dark:bg-darkBgColor dark:text-darkMainColor px-4 py-2 rounded-md cursor-pointer relative flex items-center justify-center overflow-hidden"
                onHoverStart={() => setPrevButtonAnimation(true)}
                onHoverEnd={() => setPrevButtonAnimation(false)}
                onClick={() => setCurrentPosition((prev) => prev - 1)}
              >
                <motion.div
                  className="absolute rounded-full bg-lightSecondMainColor  dark:bg-darkSecondMainColor"
                  whileHover={{
                    width: "150%",
                    height: "150%",
                    transition: { duration: 1 },
                  }}
                  initial={prevButtonAnimation ? {} : { width: 0, height: 0 }}
                  animate={
                    prevButtonAnimation
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
                    prevButtonAnimation
                      ? "dark:text-darkMainColor text-lightMainColor"
                      : ""
                  }`}
                >
                  Previous
                </motion.div>
              </motion.div>
              <motion.div
                className="bg-lightBgColor text-lightMainColor dark:bg-darkBgColor dark:text-darkMainColor px-4 py-2 rounded-md cursor-pointer relative flex items-center justify-center overflow-hidden"
                onHoverStart={() => setNextButtonAnimation(true)}
                onHoverEnd={() => setNextButtonAnimation(false)}
                onClick={() => {
                  selectedMood.length === 0 && setDispayError(true);
                  setCurrentPosition((prev) =>
                    selectedMood.length > 0 ? prev + 1 : prev
                  );
                }}
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
        </div>
      ) : (
        ""
      )}
    </>
  );
};
export default MoodPicker;
