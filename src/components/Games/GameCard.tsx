import { Link, NavLink, useParams } from "react-router";
import { DataProps, useData } from "../../assets/store/store";
import { motion } from "motion/react";
import { useEffect, useState } from "react";
import No_Preview_image_2 from "../../assets/imgs/No_Preview_image_2.png";
import {
  FaWindows,
  FaPlaystation,
  FaXbox,
  FaApple,
  FaAndroid,
  FaLinux,
} from "react-icons/fa";
import { BsNintendoSwitch } from "react-icons/bs";
import { SiWii } from "react-icons/si";
interface GameCardProps {
  data: DataProps;
}
// GameCard component
// This component is used to show a single game card
const GameCard = ({ data }: GameCardProps) => {
  const imageVariants = {
    initial: { scale: 1 },
    hover: {
      scale: 1.1,
      transition: {
        duration: 0.8,
        scale: { type: "spring", visualDuration: 0.4, bounce: 0.5 },
      },
    },
  };
  const titleVariants = {
    initial: { letterSpacing: "0px" },
    hover: {
      letterSpacing: "0.025em",
      transition: {
        duration: 0.8,
        scale: { type: "spring", visualDuration: 0.4, bounce: 0.5 },
      },
    },
  };
  const [isActive, setIsActive] = useState<boolean>(false);
  const { searching } = useData();
  const params = useParams();
  const [platformIcons, setPlatformIcons] = useState<string[]>([]);
  const [platformsReady, setPlatformsReady] = useState<boolean>(false);
  useEffect(() => {
    data.platforms.map((e) => {
      e.platform.slug === "pc" && setPlatformIcons((prev) => [...prev, "pc"]);
      (e.platform.slug === "playstation5" ||
        e.platform.slug === "playstation4" ||
        e.platform.slug === "playstation3" ||
        e.platform.slug === "playstation2" ||
        e.platform.slug === "playstation1" ||
        e.platform.slug === "ps-vita" ||
        e.platform.slug === "psp") &&
        setPlatformIcons((prev) => [...prev, "ps"]);
      (e.platform.slug === "xbox-one" ||
        e.platform.slug === "xbox-series-x" ||
        e.platform.slug === "xbox360" ||
        e.platform.slug === "xbox-old") &&
        setPlatformIcons((prev) => [...prev, "xbox"]);
      (e.platform.slug === "nintendo-switch" ||
        e.platform.slug === "nintendo-3ds" ||
        e.platform.slug === "nintendo-ds" ||
        e.platform.slug === "nintendo-dsi" ||
        e.platform.slug === "nintendo-64") &&
        setPlatformIcons((prev) => [...prev, "nintendo"]);
      (e.platform.slug === "ios" ||
        e.platform.slug === "macos" ||
        e.platform.slug === "macintosh" ||
        e.platform.slug === "apple-ii") &&
        setPlatformIcons((prev) => [...prev, "ios"]);
      e.platform.slug === "android" &&
        setPlatformIcons((prev) => [...prev, "android"]);
      e.platform.slug === "linux" &&
        setPlatformIcons((prev) => [...prev, "linux"]);
      (e.platform.slug === "wii" || e.platform.slug === "wii-u") &&
        setPlatformIcons((prev) => [...prev, "wii"]);
      setPlatformsReady(true);
    });
  }, []);
  useEffect(() => {
    if (platformsReady && platformIcons.length > 0) {
      setPlatformIcons([...new Set(platformIcons)]);
    }
  }, [platformsReady]);
  return (
    <>
      <motion.div
        key={data.id}
        onHoverStart={() => {
          setIsActive(true);
        }}
        onHoverEnd={() => {
          setIsActive(false);
        }}
        className="flex flex-wrap w-1/3 max-xl:w-1/2 max-md:w-full p-3 items-center justify-center"
      >
        <Link
          className="w-full rounded-t-lg"
          to={`${
            params.categoryId || params.tagSlug
              ? "../../"
              : searching
              ? "../"
              : ""
          }game/${data.id}/${data.name}`}
        >
          <div className="w-full pt-[80%] relative rounded-t-md overflow-hidden">
            {data.background_image ? (
              <motion.img
                className="absolute w-full h-full top-0 left-0 rounded-t-md object-center bg-cover "
                src={data.background_image}
                alt={data.name}
                variants={imageVariants}
                initial={isActive ? "" : "initial"}
                animate={isActive ? "hover" : ""}
              />
            ) : (
              <img
                className="absolute w-full h-full top-0 left-0 rounded-md object-center bg-cover"
                src={No_Preview_image_2}
                alt={data.name}
              />
            )}
          </div>
        </Link>
        <motion.div className="flex flex-wrap w-full rounded-b-md px-6 py-2 bg-lightBgColor dark:bg-darkBgColor">
          {platformsReady && platformIcons.length > 0 ? (
            <div className="flex gap-2 flex-wrap w-full text-xs pt-4">
              {platformIcons.map(
                (e) =>
                  (e === "pc" && <FaWindows key={Math.random()} />) ||
                  (e === "ps" && <FaPlaystation key={Math.random()} />) ||
                  (e === "xbox" && <FaXbox key={Math.random()} />) ||
                  (e === "nintendo" && (
                    <BsNintendoSwitch key={Math.random()} />
                  )) ||
                  (e === "ios" && <FaApple key={Math.random()} />) ||
                  (e === "android" && <FaAndroid key={Math.random()} />) ||
                  (e === "linux" && <FaLinux key={Math.random()} />) ||
                  (e === "wii" && <SiWii key={Math.random()} />)
              )}
            </div>
          ) : (
            ""
          )}
          <div className="flex gap-2 w-full items-center justify-between pb-2">
            {data.name ? (
              <motion.div
                variants={titleVariants}
                initial={isActive ? "" : "initial"}
                animate={isActive ? "hover" : ""}
                className="w-full text-lg font-bold"
              >
                <Link
                  className="flex"
                  to={`${
                    params.categoryId || params.tagSlug
                      ? "../../"
                      : searching
                      ? "../"
                      : ""
                  }game/${data.id}/${data.name}`}
                >
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
          {data.genres && data.genres.length > 0 ? (
            <div className="flex gap-2 w-full items-center justify-between pb-2">
              <h1 className="font-bold">Categories:</h1>
              <div className="flex gap-1">
                {data.genres.map((e, index) =>
                  index < 3 ? (
                    <NavLink
                      className="text-sm underline font-semibold"
                      key={e.id}
                      to={`/category/${e.name}/${e.id}`}
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
        </motion.div>
      </motion.div>
    </>
  );
};
export default GameCard;
