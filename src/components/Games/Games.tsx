import { ChangeEvent, useEffect, useState } from "react";
import {
  fetchGames,
  useData,
  DataProps,
  fetchPlatforms,
} from "../../assets/store/store";
import GameCard from "./GameCard";
import { useParams, useSearchParams } from "react-router";
import Loader from "../../assets/Loader";
import LoadingCard from "../Loading/LoadingCard";
import NoResultsFound from "../Loading/NoResultsFound";
export interface PlatformsProps {
  id: number;
  name: string;
}
const Games = () => {
  const {
    apiKey,
    filters,
    data,
    platforms,
    setData,
    setGenre,
    setPage,
    setTag,
    setOrdering,
    setPlatform,
    setPlatforms,
    searching,
    setSearching,
    searchQuery,
    setSearchQuery,
  } = useData();
  const [updated, setUpdated] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loadMore, setLoadMore] = useState(false);
  const [totalCount, setTotalCount] = useState(0);
  const [showError, setShowError] = useState(false);
  const params = useParams();
  const [searchParams] = useSearchParams();
  const query = searchParams.get("query");
  useEffect(() => {
    const fetchedPlatforms = async () => {
      const returnedPlatforms = await fetchPlatforms(apiKey);
      setPlatforms(returnedPlatforms.results);
      localStorage.setItem(
        "platforms",
        JSON.stringify(returnedPlatforms.results)
      );
    };
    if (localStorage.getItem("platforms")) {
      const fetchedPlatforms = JSON.parse(
        localStorage.getItem("platforms") as string
      );
      setPlatforms(fetchedPlatforms);
    } else {
      fetchedPlatforms();
    }
  }, []);
  // Reset filter on first load or when another category is selected
  const resetFilters = () => {
    setData([]);
    setPage(1);
    setOrdering(null);
    setPlatform(null);
    setTag(null);
    setShowError(false);
    if (params.categoryId !== null) {
      setGenre(params.categoryId as string);
    }
    if (params.tagSlug !== null && params.tagSlug !== undefined) {
      setGenre(null);
      setTag(params.tagSlug as string);
    }
    const ordering = document.querySelector("#ordering") as HTMLInputElement;
    const platforms = document.querySelector("#platforms") as HTMLInputElement;
    ordering ? (ordering.value = "ordering") : "";
    platforms ? (platforms.value = "platform") : "";
  };
  const changeOrder = (e: ChangeEvent<HTMLSelectElement>) => {
    setData([]);
    setPage(1);
    e.currentTarget.value !== "ordering"
      ? setOrdering(e.currentTarget.value)
      : setOrdering(null);
    setUpdated(true);
    setLoadMore(false);
    setLoading(false);
  };
  const changePlatform = (e: ChangeEvent<HTMLSelectElement>) => {
    setData([]);
    setPage(1);
    e.currentTarget.value !== "platform"
      ? setPlatform(e.currentTarget.value)
      : setPlatform(null);
    setUpdated(true);
    setLoadMore(false);
    setLoading(false);
  };
  // Reset if category linked is clicked or search mode is activated
  useEffect(() => {
    resetFilters();
    setUpdated(true);
    setLoadMore(false);
    setLoading(false);
    query ? setSearching(true) : setSearching(false);
    query ? setSearchQuery(query) : setSearchQuery(null);
  }, [params.categoryId, params.tagSlug, query]);
  // If bottom is reached and filter page is less than 10, update page number
  useEffect(() => {
    if (loadMore && !loading) {
      if (filters.page < 10 && filters.page < Math.round(totalCount / 10)) {
        setPage(filters.page + 1);
        setLoadMore(false);
        setUpdated(true);
      }
    }
  }, [loadMore, loading]);
  // If total count of games change, update
  useEffect(() => {
    setUpdated(true);
  }, [totalCount]);
  // If updated is true, fetch Games
  useEffect(() => {
    if (updated) {
      const fetchData = async () => {
        setLoading(true);
        const fetchedData = await fetchGames(
          apiKey,
          filters.platforms,
          filters.ordering,
          filters.genres,
          filters.tag,
          filters.page,
          searching,
          searchQuery
        );
        if (fetchedData.results.length === 0) {
          setShowError(true);
        }
        setTotalCount(fetchedData.count);
        if (filters.page <= 1 && filters.page <= Math.round(totalCount / 10)) {
          setData(fetchedData.results);
        } else if (
          filters.page > 1 &&
          filters.page <= 10 &&
          filters.page <= Math.round(totalCount / 10)
        ) {
          setData(data.concat(fetchedData.results));
        }
        setLoading(false);
      };
      fetchData();
      setLoadMore(false);
      setUpdated(false);
    }
  }, [updated]);
  // Scroll Handler to detect when bottom is reached and change loadMore to true
  const handleScroll = () => {
    if (
      window.innerHeight + window.scrollY >= document.body.scrollHeight - 20 &&
      !loading
    ) {
      setLoadMore(true);
    }
  };
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [loading]);
  return (
    <>
      {searching ? (
        ""
      ) : (
        <div className="filters flex gap-5 pb-5 text-lg max-sm:text-base w-[95%] mt-0 mb-0 ml-auto mr-auto">
          <div className="max-sm:w-1/3">
            <select
              name="ordering"
              id="ordering"
              className="bg-lightBgColor dark:bg-darkBgColor px-2 py-1 rounded focus:outline-none w-full"
              onChange={changeOrder}
            >
              <option value="ordering">Ordering</option>
              <option value="name">Name</option>
              <option value="released">Released</option>
              <option value="rating">Rating</option>
              <option value="metacritic">Metacritic</option>
            </select>
          </div>
          <div className="max-sm:w-2/3">
            <select
              name="platforms"
              id="platforms"
              className="bg-lightBgColor dark:bg-darkBgColor px-2 py-1 rounded focus:outline-none w-full"
              onChange={changePlatform}
            >
              <option value="platform">Platforms</option>
              {platforms.map((e: PlatformsProps) => (
                <option key={e.id} value={`${e.id}`}>
                  {e.name}
                </option>
              ))}
            </select>
          </div>
        </div>
      )}
      <div className="flex flex-row w-full flex-wrap">
        {data && data.length > 0 ? (
          data.map((data: DataProps) => <GameCard key={data.id} data={data} />)
        ) : loading ? (
          <LoadingCard />
        ) : showError ? (
          <NoResultsFound />
        ) : (
          ""
        )}
      </div>
      {loading && data.length > 0 ? <Loader /> : ""}
    </>
  );
};
export default Games;