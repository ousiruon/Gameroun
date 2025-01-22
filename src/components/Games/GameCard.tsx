import { Link, NavLink, useParams } from "react-router";
import { DataProps, useData } from "../../assets/store/store";
import { motion } from "motion/react";
import { useState } from "react";
import No_Preview_image_2 from "../../assets/imgs/No_Preview_image_2.png";
interface GameCardProps {
  data: DataProps;
}
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
  const [isActive, setIsActive] = useState(false);
  const { searching } = useData();
  const params = useParams();
  return (
    <>
      <motion.div
        key={data.id}
        className="gameCard flex flex-wrap w-1/3 max-xl:w-1/2 max-md:w-1 rounded-lg p-3 bg-lightBgColor dark:bg-darkBgColor"
        onHoverStart={() => {
          setIsActive(true);
        }}
        onHoverEnd={() => {
          setIsActive(false);
        }}
      >
        <Link
          className="w-full"
          to={`${
            params.categoryId || params.tagSlug
              ? "../../"
              : searching
              ? "../"
              : ""
          }game/${data.id}/${data.name}`}
        >
          <div className="w-full pt-[80%] relative rounded-lg overflow-hidden">
            {data.background_image ? (
              <motion.img
                className="absolute w-full h-full top-0 left-0 rounded-lg object-center bg-cover "
                src={data.background_image}
                alt={data.name}
                variants={imageVariants}
                initial={isActive ? "" : "initial"}
                animate={isActive ? "hover" : ""}
              />
            ) : (
              <img
                className="absolute w-full h-full top-0 left-0 rounded-lg object-center bg-cover"
                src={No_Preview_image_2}
                alt={data.name}
              />
            )}
          </div>
        </Link>
        <div className="flex gap-2 w-full items-center justify-between py-2">
          {data.name ? (
            <motion.div
              variants={titleVariants}
              initial={isActive ? "" : "initial"}
              animate={isActive ? "hover" : ""}
              className="w-full text-lg font-bold"
            >
              <Link
                className="w-full"
                to={`${
                  params.categoryId || params.tagSlug
                    ? "../../"
                    : searching
                    ? "../"
                    : ""
                }game/${data.id}/${data.name}`}
              >
                {data.name}
              </Link>
            </motion.div>
          ) : (
            "No title"
          )}
          {data.metacritic ? (
            <h1
              className={`p-2 rounded-lg font-bold text-xs ${
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
          <div className="flex gap-2 w-full items-center justify-between">
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
    </>
  );
};
export default GameCard;
