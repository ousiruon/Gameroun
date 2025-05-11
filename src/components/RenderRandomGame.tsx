import { useEffect, useState } from "react";
import {
  SingleDataProps,
  fetchRandomGames,
  useData,
} from "../assets/store/store";
import NoResultsFound from "./Loading/NoResultsFound";
import RandomGameLoader from "./Loading/RandomGameLoader";
import RandomGameCard from "./Random Game/RandomGameCard";
// Interface for the RendenrRandomGame component, it is used to define the props of the RenderRandomGame component
interface RenderRandomGameProps {
  selectedConsole: string[];
  selectedMood: string;
}
// RenderRandomGame component
// This component is used to show a random game based on the selected console and mood
const RenderRandomGame = ({
  selectedConsole,
  selectedMood,
}: RenderRandomGameProps) => {
  const { apiKey } = useData();
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [data, setData] = useState<SingleDataProps[] | []>([]);
  useEffect(() => {
    const fetchGames = async () => {
      try {
        const res = await fetchRandomGames(
          apiKey,
          selectedConsole.toString(),
          selectedMood
        );
        setLoading(false);
        setData(res);
      } catch (error) {
        console.log(`Can't connect to the server!`, error);
      }
    };
    fetchGames();
    setCurrentIndex(0);
  }, []);
  return (
    <>
      {loading && <RandomGameLoader />}
      {data.length === 0 && !loading && <NoResultsFound />}
      {data.length > 0 && !loading && (
        <div className="flex flex-col w-full items-center">
          <div className="flex w-full text-2xl text-secondLightBgColor dark:text-darkBgColor font-bold gap-1">
            {[...Array(data.length <= 3 ? 3 : data.length)].map((_, index) => (
              <div
                key={index}
                className={`w-1/3 flex items-center justify-center  py-4 bg-lightMainColor dark:bg-darkMainColor ${
                  index === currentIndex
                    ? "bg-lightSecondMainColor dark:bg-darkSecondMainColor text-lightBgColor dark:text-darkMainColor"
                    : ""
                }`}
              >
                {index + 1}
              </div>
            ))}
          </div>
          <RandomGameCard
            currentIndex={currentIndex}
            setCurrentIndex={setCurrentIndex}
            maxLength={data.length <= 3 ? 3 : data.length}
            data={data[currentIndex]}
          />
        </div>
      )}
    </>
  );
};
export default RenderRandomGame;
