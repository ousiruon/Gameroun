import { DataProps } from "../../assets/store/store";
import No_Preview_image_2 from "../../assets/imgs/No_Preview_image_2.png";
import { motion } from "motion/react";
import { Link, NavLink } from "react-router-dom";
import { useState } from "react";
// This component is used to show a random game card
// It takes in the data of the game, the maximum length of the data, the current index, and a function to set the current index if changed
/* --------------------------------------------------------------------------------------- */
// This interface is used to define the props that the RandomGameCard component will receive
interface RandomGameCardProps {
  data: DataProps;
  maxLength: number;
  currentIndex: number;
  setCurrentIndex: (index: number | ((prev: number) => number)) => void;
}
const RandomGameCard = ({
  data,
  maxLength,
  setCurrentIndex,
  currentIndex,
}: RandomGameCardProps) => {
  const [nextButtonAnimation, setNextButtonAnimation] = useState(false);
  const [prevButtonAnimation, setPrevButtonAnimation] = useState(false);
  return (
    <>
      {data && (
        <div className="my-28 flex flex-col w-1/2 rounded max-md:w-[90%] max-lg:w-[75%]">
          <div className="flex w-full justify-between my-7">
            <motion.div
              className={`bg-lightBgColor text-lightMainColor dark:bg-darkBgColor dark:text-darkMainColor px-4 py-2 rounded-md cursor-pointer font-bold relative flex items-center justify-center overflow-hidden ${
                currentIndex === 0 && "opacity-0"
              } `}
              onHoverStart={() => setPrevButtonAnimation(true)}
              onHoverEnd={() => setPrevButtonAnimation(false)}
              onClick={() =>
                setCurrentIndex((prev) => (prev > 0 ? prev - 1 : prev))
              }
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
              className={`bg-lightBgColor text-lightMainColor dark:bg-darkBgColor dark:text-darkMainColor px-4 py-2 rounded-md cursor-pointer font-bold relative flex items-center justify-center overflow-hidden ${
                currentIndex + 1 === maxLength && "opacity-0"
              }`}
              onHoverStart={() => setNextButtonAnimation(true)}
              onHoverEnd={() => setNextButtonAnimation(false)}
              onClick={() =>
                setCurrentIndex((prev) =>
                  prev + 1 <= maxLength ? prev + 1 : prev
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
          <Link className="flex" to={`../game/${data.id}/${data.name}`}>
            <div className="pt-[80%] w-full relative rounded-t">
              <img
                className="absolute top-0 left-0 w-full h-full rounded-t"
                src={
                  data.background_image
                    ? data.background_image
                    : No_Preview_image_2
                }
                alt={`${data.name}'s Image`}
              />
            </div>
          </Link>
          {data.ratings.length > 0 ? (
            <div className="w-full flex flex-col max-lg:items-center">
              <motion.div
                className="w-full flex"
                variants={{
                  intial: {},
                  animate: {
                    transition: {
                      staggerChildren: 0.5,
                    },
                  },
                }}
                initial="initial"
                animate="animate"
              >
                {data.ratings.map((rating, index) => (
                  <motion.div
                    key={`${rating.id}-bar-${index}`}
                    className={`flex h-[30px] items-center justify-center text-lg ${
                      rating.title === "exceptional"
                        ? "bg-green-500"
                        : rating.title === "recommended"
                        ? "bg-blue-500"
                        : rating.title === "meh"
                        ? "bg-yellow-500"
                        : rating.title === "skip"
                        ? "bg-red-500"
                        : "bg-gray-500"
                    } text-white`}
                    variants={{
                      initial: { width: "0%" },
                      animate: { width: `${rating.percent}%` },
                    }}
                    transition={{ duration: 0.5, ease: "linear" }}
                  ></motion.div>
                ))}
              </motion.div>
            </div>
          ) : (
            ""
          )}
          <div className="bg-lightBgColor dark:bg-darkBgColor p-6">
            <div className="flex gap-2 w-full items-center justify-between pb-2">
              {data.name ? (
                <motion.div className="w-full text-2xl font-bold grow-1">
                  <Link className="flex" to={`../game/${data.id}/${data.name}`}>
                    <div className="flex gap-2">
                      {data.name}
                      {data.ratings && data.ratings.length > 0 ? (
                        <div className="flex items-center justify-center">
                          <h1 className="text-xs font-semibold">
                            {data.ratings[0].title === "exceptional"
                              ? "💯"
                              : data.ratings[0].title === "recommended"
                              ? "👏"
                              : data.ratings[0].title === "meh"
                              ? "👍"
                              : data.ratings[0].title === "skip"
                              ? "🛑"
                              : ""}
                          </h1>
                        </div>
                      ) : (
                        ""
                      )}
                    </div>
                  </Link>
                </motion.div>
              ) : (
                "No title"
              )}
              {data.metacritic ? (
                <h1
                  className={`p-2 rounded-md font-bold text-xs ${
                    data.metacritic > 80
                      ? "bg-green-700 text-lightBgColor"
                      : data.metacritic <= 80 && data.metacritic > 50
                      ? "bg-yellow-600 text-darkBgColor"
                      : "bg-red-600 text-lightBgColor"
                  }`}
                >
                  {data.metacritic}
                </h1>
              ) : (
                ""
              )}
            </div>
            <div className="flex flex-col w-full">
              {data.genres && data.genres.length > 0 ? (
                <div className="flex gap-2 w-full items-center justify-between pb-2">
                  <h1 className="font-bold">Categories:</h1>
                  <div className="flex gap-1">
                    {data.genres.map((e, index) =>
                      index < 3 ? (
                        <NavLink
                          className="text-sm underline font-semibold"
                          key={e.id}
                          to={`../category/${e.name}/${e.id}`}
                        >
                          {e.name}
                        </NavLink>
                      ) : (
                        ""
                      )
                    )}
                  </div>
                </div>
              ) : (
                ""
              )}
              {data.ratings.length > 0 && (
                <div className="w-full flex gap-2">
                  {data.ratings.map((rating, index) => (
                    <div
                      key={`${rating.id}-label-${index}`}
                      className={`flex items-center justify-center text-lg gap-1`}
                    >
                      <div
                        className={`w-2 h-2 rounded-full ${
                          rating.title === "exceptional"
                            ? "bg-green-500"
                            : rating.title === "recommended"
                            ? "bg-blue-500"
                            : rating.title === "meh"
                            ? "bg-yellow-500"
                            : rating.title === "skip"
                            ? "bg-red-500"
                            : "bg-gray-500"
                        }`}
                      ></div>
                      <div className="capitalize">{rating.title}</div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};
export default RandomGameCard;
