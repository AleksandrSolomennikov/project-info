import React from "react";

const MatchCard = ({ match }) => {
  // Format date
  const matchDate = new Date(match.utcDate);
  const formattedDate = matchDate.toLocaleDateString();
  const formattedTime = matchDate.toLocaleTimeString();

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <div className="p-4">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm text-gray-500">
            {match.competition?.name || "Unknown League"}
          </span>
          <span className="text-sm text-gray-500">{formattedDate}</span>
        </div>

        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center">
            <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center mr-2">
              {match.homeTeam?.crest ? (
                <img
                  src={match.homeTeam.crest}
                  alt={match.homeTeam.name}
                  className="w-6 h-6"
                />
              ) : (
                <span className="text-xs">
                  {match.homeTeam?.name?.charAt(0) || "H"}
                </span>
              )}
            </div>
            <span className="font-medium">
              {match.homeTeam?.name || "Home Team"}
            </span>
          </div>

          <div className="flex items-center font-bold">
            <span className="mx-1">
              {match.score?.fullTime?.home !== null
                ? match.score.fullTime.home
                : "-"}
            </span>
            <span className="mx-1">-</span>
            <span className="mx-1">
              {match.score?.fullTime?.away !== null
                ? match.score.fullTime.away
                : "-"}
            </span>
          </div>

          <div className="flex items-center">
            <span className="font-medium">
              {match.awayTeam?.name || "Away Team"}
            </span>
            <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center ml-2">
              {match.awayTeam?.crest ? (
                <img
                  src={match.awayTeam.crest}
                  alt={match.awayTeam.name}
                  className="w-6 h-6"
                />
              ) : (
                <span className="text-xs">
                  {match.awayTeam?.name?.charAt(0) || "A"}
                </span>
              )}
            </div>
          </div>
        </div>

        <div className="flex justify-between items-center text-sm text-gray-500">
          <span>{match.venue || "Unknown Venue"}</span>
          <span>{formattedTime}</span>
        </div>

        <div className="mt-3 text-sm">
          <span
            className={`inline-block px-2 py-1 rounded ${
              match.status === "FINISHED"
                ? "bg-green-100 text-green-800"
                : match.status === "IN_PLAY"
                ? "bg-yellow-100 text-yellow-800"
                : "bg-blue-100 text-blue-800"
            }`}
          >
            {match.status === "FINISHED"
              ? "Completed"
              : match.status === "IN_PLAY"
              ? "Live"
              : "Scheduled"}
          </span>
        </div>
      </div>
    </div>
  );
};

export default MatchCard;
