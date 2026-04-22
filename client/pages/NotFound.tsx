import { Link, useLocation } from "react-router-dom";
import { useEffect } from "react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname,
    );
  }, [location.pathname]);

  return (
    <main className="not-found">
      <article className="not-found__card">
        <h1 className="not-found__title">404</h1>
        <p className="not-found__message">Oops! Page not found</p>
        <Link to="/" className="not-found__link">
          Return to Home
        </Link>
      </article>
    </main>
  );
};

export default NotFound;
