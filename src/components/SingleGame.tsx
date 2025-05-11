import { Link, NavLink, useParams } from "react-router";
import { singleGame, useData } from "../assets/store/store";
import { useEffect, useState } from "react";
import Loader from "../assets/Loader";
import { motion } from "motion/react";
import { containerVariants } from "./IndexPage";
// SingleGame component
// This component is used to show a single game page
// It fetches the game data from the API and displays it
const SingleGame = () => {
  const { gameId, gameName } = useParams();
  const { setSingleData, singleData, apiKey } = useData();
  const [updated, setUpdated] = useState<boolean>(false);
  const [loaded, setLoaded] = useState<boolean>(false);
  const [arrayedTitle, setArrayedTitle] = useState<string[]>([]);
  useEffect(() => {
    gameId ? setUpdated(true) : setUpdated(false);
  }, [gameId]);
  useEffect(() => {
    if (updated && gameId) {
      const fetchGame = async () => {
        try {
          setLoaded(false);
          const fetchedGames = await singleGame(apiKey, gameId);
          setSingleData(fetchedGames);
          setLoaded(true);
          document.title = `${gameName} - GameRoun`;
        } catch (error) {
          console.log(`Can't connect to the server!`, error);
        }
      };
      fetchGame();
      setUpdated(false);
    }
  }, [updated]);
  useEffect(() => {
    if (loaded) {
      if (singleData?.name) {
        setArrayedTitle(singleData.name.split(""));
      }
    }
  }, [loaded]);
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="w-full"
    >
      {singleData && Object.keys(singleData).length > 0 && loaded ? (
        <div className="w-full flex flex-col gap-10 items-center justify-center">
          <div
            className={`w-full h-[70vh] relative flex items-center justify-center ${
              singleData.background_image
                ? "text-white"
                : "text-lightMainColor dark:text-darkMainColor"
            } `}
          >
            {singleData.background_image ? (
              <motion.div
                className="w-full h-full absolute top-0 left-0 right-0 bottom-0 z-0"
                initial={{ opacity: 0.5 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1.5, delay: 0.5 }}
                style={
                  singleData.background_image
                    ? {
                        background: `linear-gradient(
                          rgba(0, 0, 0, 0.5),
                          rgba(0, 0, 0, 0.5)
                        ),
                        url(${singleData.background_image})`,
                        backgroundAttachment: "fixed",
                        backgroundPosition: "center",
                        backgroundSize: "cover",
                        textShadow: "0 1px 0 black",
                      }
                    : {}
                }
              ></motion.div>
            ) : (
              ""
            )}
            <div
              className="absolute top-0 left-0 w-full flex flex-col items-center justify-between z-10 pt-5 px-5 font-bold"
              style={
                singleData.background_image
                  ? { textShadow: "0 1px 0 black" }
                  : {}
              }
            >
              <div className="flex items-center w-full">
                <Link className="flex items-center pr-1" to="/">
                  Home
                </Link>
                / {singleData.name}
              </div>
              {singleData.released || singleData.playtime ? (
                <div className="flex items-center w-full py-6 justify-between">
                  {singleData.playtime ? (
                    <div className="flex flex-col items-center text-sm">
                      <div>Average playtime: {singleData.playtime} Hours</div>
                    </div>
                  ) : (
                    ""
                  )}
                  {singleData.released ? (
                    <div className="flex flex-col items-center text-sm">
                      <div>Released: {singleData.released}</div>
                    </div>
                  ) : (
                    ""
                  )}
                </div>
              ) : (
                ""
              )}
            </div>
            <div
              className="relative z-10 text-6xl font-bold max-md:text-4xl flex flex-wrap items-center justify-center px-4"
              style={{ textShadow: "0 1px 0 black" }}
            >
              {arrayedTitle.length > 0
                ? arrayedTitle.map((letter, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      {letter === " " ? "\u00A0" : letter}
                    </motion.div>
                  ))
                : singleData.name}
            </div>
            <div className="absolute bottom-0 left-0 w-full flex justify-center mb-4">
              {singleData.ratings.length > 0 ? (
                <div className="w-[960px] flex flex-col max-lg:items-center max-lg:w-[90%]">
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
                    {singleData.ratings.map((rating, index) => (
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
                  <div className="w-full flex gap-2">
                    {singleData.ratings.map((rating, index) => (
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
                </div>
              ) : (
                ""
              )}
              {!singleData.ratings.length ? (
                <div className="w-[960px] flex flex-col max-lg:items-center max-lg:w-[90%]">
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
                    <motion.div
                      className={`flex items-center justify-center text-lg bg-gray-500
                      } text-white font-bold py-2 rounded`}
                      variants={{
                        initial: { width: "0%" },
                        animate: { width: "100%" },
                      }}
                      transition={{ duration: 0.5, ease: "linear" }}
                    >
                      No reviews 😴
                    </motion.div>
                  </motion.div>
                </div>
              ) : (
                ""
              )}
            </div>
          </div>
          <div
            className="w-[960px] max-lg:w-[90%] flex flex-col gap-4 justify-center bg-lightBgColor dark:bg-darkBgColor rounded-lg p-6 m-5"
            key={Math.random()}
          >
            {singleData.description_raw ? (
              <div className="w-full font-semibold text-justify	">
                <div className="font-bold text-2xl">About</div>
                {singleData.description_raw}
              </div>
            ) : (
              ""
            )}
            {singleData.genres.length > 0 ? (
              <div className="w-full relative flex items-baseline gap-2 flex-wrap">
                <div className="font-bold text-2xl">Genres: </div>
                {singleData.genres.map((genre) => (
                  <NavLink
                    key={genre.id}
                    to={`/category/${genre.name}/${genre.id}`}
                    className="underline"
                  >
                    {genre.name}
                  </NavLink>
                ))}
              </div>
            ) : (
              ""
            )}
            {singleData.background_image_additional ? (
              <div className="w-full pt-[70%] relative overflow-hidden">
                <motion.img
                  initial={{ scale: 1.3 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.5,
                    delay: 0.2,
                    type: "spring",
                    stiffness: 50,
                  }}
                  className="absolute top-0 left-0 w-full h-full object-cover bg-fixed rounded"
                  src={singleData.background_image_additional}
                  alt="additional"
                />
              </div>
            ) : (
              ""
            )}
            {singleData.publishers.length > 0 ? (
              <div className="flex w-full gap-2 items-center flex-wrap">
                <div className="font-bold text-2xl flex">Publishers:</div>
                {singleData.publishers.map((publisher) => (
                  <div
                    className="p-1 bg-lightMainColor dark:bg-secondDarkBgColor text-lightBgColor dark:text-darkMainColor rounded text-xs"
                    key={publisher.id}
                  >
                    {publisher.name}
                  </div>
                ))}
              </div>
            ) : (
              ""
            )}
            {singleData.metacritic || singleData.website ? (
              <div className="w-full relative flex items-center gap-2">
                <div className="font-bold text-base flex w-full gap-2 justify-between flex-wrap">
                  {singleData.website ? (
                    <div className="flex gap-2 items-center grow-1 break-words">
                      Website:
                      <a
                        className="underline break-all"
                        href={singleData.website}
                        target="_blank"
                      >
                        {singleData.website}
                      </a>
                    </div>
                  ) : (
                    ""
                  )}
                  {singleData.metacritic ? (
                    <div
                      className={`text-right p-2 grow-1 ${
                        singleData.metacritic > 80
                          ? "bg-green-700 text-lightBgColor"
                          : singleData.metacritic <= 80 &&
                            singleData.metacritic > 50
                          ? "bg-yellow-600 text-darkBgColor"
                          : "bg-red-600 text-lightBgColor"
                      }`}
                    >
                      {singleData.metacritic}
                    </div>
                  ) : (
                    ""
                  )}
                </div>
              </div>
            ) : (
              ""
            )}
            {singleData.tags.length > 0 ? (
              <div className="flex w-full gap-2 items-center flex-wrap">
                <div className="font-bold text-2xl flex">Tags:</div>
                {singleData.tags.map((tag) => (
                  <Link
                    to={`/tags/${tag.slug}`}
                    className="p-1 bg-lightMainColor dark:bg-secondDarkBgColor text-lightBgColor dark:text-darkMainColor rounded text-xs"
                    key={tag.id}
                  >
                    {tag.name}
                  </Link>
                ))}
              </div>
            ) : (
              ""
            )}
            {singleData.platforms.length > 0
              ? singleData.platforms.map((platform) =>
                  platform.platform.name === "PC" ||
                  platform.requirements.minimum ||
                  platform.requirements.recommended ? (
                    <div
                      className="flex flex-col gap-4 text-justify"
                      key={Math.random()}
                    >
                      <div className="font-bold text-2xl">Requirements</div>
                      {platform.requirements.minimum ? (
                        <div
                          className="flex w-full gap-2 items-center"
                          key={Math.random()}
                        >
                          {platform.requirements.minimum}
                        </div>
                      ) : (
                        ""
                      )}
                      {platform.requirements.recommended ? (
                        <div
                          className="flex w-full gap-2 items-center"
                          key={Math.random()}
                        >
                          {platform.requirements.recommended}
                        </div>
                      ) : (
                        ""
                      )}
                    </div>
                  ) : (
                    ""
                  )
                )
              : ""}
            {singleData.platforms.length > 0 ? (
              <div className="flex w-full gap-2 items-center flex-wrap">
                <div className="font-bold text-2xl flex">Platforms:</div>
                {singleData.platforms.map((platform) => (
                  <div
                    className="p-1 bg-lightMainColor dark:bg-secondDarkBgColor text-lightBgColor dark:text-darkMainColor rounded text-xs"
                    key={Math.random()}
                  >
                    {platform.platform.name}
                  </div>
                ))}
              </div>
            ) : (
              ""
            )}
          </div>
        </div>
      ) : (
        <div className="flex w-full h-full items-center justify-center">
          <Loader />
        </div>
      )}
    </motion.div>
  );
};
export default SingleGame;
