import React from "react";
import MatchCard from "./MatchCard";

const MatchList = ({ matches }) => {
  return (
    <div>
      {matches.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-gray-500 text-xl">No matches found</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {matches.map((match) => (
            <MatchCard key={match.id} match={match} />
          ))}
        </div>
      )}
    </div>
  );
};

export default MatchList;
