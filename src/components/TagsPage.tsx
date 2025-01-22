import { useParams } from "react-router";
import Categories from "./Categories";
import Games from "./Games/Games";

const TagsPage = () => {
  const params = useParams<{ tagSlug: string }>();
  return (
    <>
      <div className="w-2/12 p-5 max-sm:hidden">
        <Categories />
      </div>
      <div className="w-10/12 py-5 flex flex-col max-sm:w-full">
        <h1 className="text-3xl font-bold pb-6">
          {params.tagSlug ? `Results for tag: #${params.tagSlug}` : ""}
        </h1>
        <Games />
      </div>
    </>
  );
};
export default TagsPage;
