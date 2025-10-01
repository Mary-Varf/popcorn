import { useState } from "react";
import WatchedMovieList from "./WatchedMovieList";
import WatchedSummary from "./WatchedSummary";

const WatchedBox = () => {
  const [isOpen2, setIsOpen2] = useState(true);

  return (
    <div className="box">
      <button
        className="btn-toggle"
        onClick={() => setIsOpen2((open) => !open)}
      >
        {isOpen2 ? "–" : "+"}
      </button>
      {isOpen2 && (
        <>
          <WatchedSummary />
          <WatchedMovieList />
        </>
      )}
    </div>
  );
};

export default WatchedBox;
