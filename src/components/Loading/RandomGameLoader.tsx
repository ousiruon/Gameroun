// Same as the LoadingCard component but with a different layout
const RandomGameLoader = () => {
  return (
    <>
      <div className="mt-28 flex flex-col w-1/2 rounded max-md:w-[90%] max-lg:w-[75%]">
        <div className="flex" data-discover="true">
          <div className="pt-[80%] w-full relative rounded-t">
            <div className="absolute top-0 left-0 w-full h-full rounded-t dark:bg-darkBgColor bg-lightBgColor"></div>
          </div>
        </div>
        <div className="bg-lightBgColor dark:bg-darkBgColor p-6">
          <div className="w-full pb-2">
            <div className="w-full flex gap-3 flex-col">
              <div className="flex bg-secondLightBgColor dark:bg-secondDarkBgColor h-8 rounded"></div>
              <div className="flex bg-secondLightBgColor dark:bg-secondDarkBgColor h-8 rounded"></div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default RandomGameLoader;
