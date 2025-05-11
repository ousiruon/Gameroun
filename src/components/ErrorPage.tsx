import { Link } from "react-router-dom";
// ErrorPage component
// This component is used to show a 404 error page when no results are found
const ErrorPage = () => {
  return (
    <>
      <div className="min-h-screen flex w-full items-center justify-center">
        <div className="flex flex-col items-center justify-center w-full gap-12">
          <h1 className="text-6xl font-bold">404</h1>
          <h1 className="text-5xl font-bold">No Results Found</h1>
          <span className="text-2xl">
            Try refining your search criteria or explore different options.
          </span>
          <Link className="text-2xl font-bold" to="/">
            Go Back
          </Link>
        </div>
      </div>
    </>
  );
};

export default ErrorPage;
