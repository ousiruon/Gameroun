const NoResultsFound = () => {
  return (
    <>
      <div className="flex flex-col items-center justify-center w-full min-h-[500px] gap-12">
        <h1 className="text-5xl font-bold">No Results Found</h1>
        <span className="text-2xl">
          Try refining your search criteria or explore different options.
        </span>
      </div>
    </>
  );
};
export default NoResultsFound;
