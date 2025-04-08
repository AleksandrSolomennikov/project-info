"use client";

import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Progress } from "@/components/ui/progress";

// Mock data for Soccer
const liveGames = [
  {
    id: 1,
    league: "Premier League",
    homeTeam: "Manchester City",
    homeScore: 2,
    awayTeam: "Liverpool",
    awayScore: 1,
    status: "70'",
    homeOdds: 1.85,
    drawOdds: 3.5,
    awayOdds: 4.2,
  },
  {
    id: 2,
    league: "La Liga",
    homeTeam: "Barcelona",
    homeScore: 1,
    awayTeam: "Real Madrid",
    awayScore: 1,
    status: "65'",
    homeOdds: 2.1,
    drawOdds: 3.25,
    awayOdds: 3.6,
  },
  {
    id: 3,
    league: "Bundesliga",
    homeTeam: "Bayern Munich",
    homeScore: 3,
    awayTeam: "Borussia Dortmund",
    awayScore: 1,
    status: "80'",
    homeOdds: 1.4,
    drawOdds: 5.5,
    awayOdds: 7.2,
  },
];

const leagues = [
  { id: "premier-league", name: "Premier League", country: "England" },
  { id: "la-liga", name: "La Liga", country: "Spain" },
  { id: "bundesliga", name: "Bundesliga", country: "Germany" },
  { id: "serie-a", name: "Serie A", country: "Italy" },
];

const premierLeagueTeams = [
  { position: 1, name: "Manchester City", played: 36, won: 28, drawn: 5, lost: 3, points: 89, gd: 62, form: "WWWDW", winOdds: 1.2 },
  { position: 2, name: "Arsenal", played: 36, won: 26, drawn: 5, lost: 5, points: 83, gd: 58, form: "WWLWW", winOdds: 4.5 },
  { position: 3, name: "Liverpool", played: 36, won: 24, drawn: 9, lost: 3, points: 81, gd: 47, form: "WDWLW", winOdds: 5.0 },
  { position: 4, name: "Aston Villa", played: 36, won: 20, drawn: 7, lost: 9, points: 67, gd: 23, form: "WWDWL", winOdds: 80.0 },
  { position: 5, name: "Tottenham", played: 36, won: 18, drawn: 6, lost: 12, points: 60, gd: 12, form: "LWDWL", winOdds: 150.0 },
  { position: 6, name: "Newcastle", played: 36, won: 16, drawn: 9, lost: 11, points: 57, gd: 21, form: "DWWDL", winOdds: 200.0 },
];

const laLigaTeams = [
  { position: 1, name: "Real Madrid", played: 36, won: 28, drawn: 7, lost: 1, points: 91, gd: 58, form: "DWWWD", winOdds: 1.1 },
  { position: 2, name: "Barcelona", played: 36, won: 24, drawn: 5, lost: 7, points: 77, gd: 48, form: "LWWWW", winOdds: 8.0 },
  { position: 3, name: "Girona", played: 36, won: 22, drawn: 8, lost: 6, points: 74, gd: 31, form: "DLDWW", winOdds: 15.0 },
  { position: 4, name: "Atletico Madrid", played: 36, won: 22, drawn: 5, lost: 9, points: 71, gd: 27, form: "LWWWD", winOdds: 20.0 },
  { position: 5, name: "Athletic Bilbao", played: 36, won: 18, drawn: 10, lost: 8, points: 64, gd: 24, form: "DWWDW", winOdds: 80.0 },
  { position: 6, name: "Real Sociedad", played: 36, won: 15, drawn: 11, lost: 10, points: 56, gd: 16, form: "WLLDW", winOdds: 150.0 },
];

const bundesligaTeams = [
  { position: 1, name: "Bayer Leverkusen", played: 34, won: 28, drawn: 6, lost: 0, points: 90, gd: 67, form: "WWWDW", winOdds: 2.0 },
  { position: 2, name: "Bayern Munich", played: 34, won: 24, drawn: 4, lost: 6, points: 76, gd: 65, form: "LWWWW", winOdds: 1.5 },
  { position: 3, name: "Stuttgart", played: 34, won: 21, drawn: 5, lost: 8, points: 68, gd: 36, form: "LWWWW", winOdds: 10.0 },
  { position: 4, name: "RB Leipzig", played: 34, won: 19, drawn: 7, lost: 8, points: 64, gd: 36, form: "WLLWW", winOdds: 12.0 },
  { position: 5, name: "Borussia Dortmund", played: 34, won: 17, drawn: 9, lost: 8, points: 60, gd: 23, form: "WWLWD", winOdds: 15.0 },
  { position: 6, name: "Eintracht Frankfurt", played: 34, won: 14, drawn: 10, lost: 10, points: 52, gd: 9, form: "DWLDW", winOdds: 50.0 },
];

const serieATeams = [
  { position: 1, name: "Inter Milan", played: 36, won: 29, drawn: 5, lost: 2, points: 92, gd: 70, form: "WWWWW", winOdds: 1.1 },
  { position: 2, name: "Milan", played: 36, won: 22, drawn: 8, lost: 6, points: 74, gd: 28, form: "LWWDW", winOdds: 15.0 },
  { position: 3, name: "Juventus", played: 36, won: 19, drawn: 11, lost: 6, points: 68, gd: 25, form: "DLLLD", winOdds: 20.0 },
  { position: 4, name: "Bologna", played: 36, won: 18, drawn: 12, lost: 6, points: 66, gd: 23, form: "WDWDL", winOdds: 50.0 },
  { position: 5, name: "Atalanta", played: 35, won: 19, drawn: 7, lost: 9, points: 64, gd: 26, form: "WWLWW", winOdds: 40.0 },
  { position: 6, name: "Roma", played: 36, won: 17, drawn: 9, lost: 10, points: 60, gd: 17, form: "LWWDW", winOdds: 100.0 },
];

const topScorers = [
  { position: 1, name: "Erling Haaland", team: "Manchester City", league: "Premier League", goals: 26, games: 30 },
  { position: 2, name: "Harry Kane", team: "Bayern Munich", league: "Bundesliga", goals: 36, games: 32 },
  { position: 3, name: "Lautaro Martinez", team: "Inter Milan", league: "Serie A", goals: 24, games: 33 },
  { position: 4, name: "Kylian Mbappé", team: "PSG", league: "Ligue 1", goals: 27, games: 29 },
  { position: 5, name: "Jude Bellingham", team: "Real Madrid", league: "La Liga", goals: 19, games: 28 },
  { position: 6, name: "Cole Palmer", team: "Chelsea", league: "Premier League", goals: 22, games: 33 },
  { position: 7, name: "Viktor Gyokeres", team: "Sporting CP", league: "Primeira Liga", goals: 29, games: 33 },
];

const recentResults = [
  { id: 1, homeTeam: "Chelsea", homeScore: 2, awayTeam: "West Ham", awayScore: 0, date: "May 5, 2025", league: "Premier League" },
  { id: 2, homeTeam: "Atletico Madrid", homeScore: 1, awayTeam: "Athletic Bilbao", awayScore: 1, date: "May 4, 2025", league: "La Liga" },
  { id: 3, homeTeam: "Milan", homeScore: 3, awayTeam: "Genoa", awayScore: 0, date: "May 4, 2025", league: "Serie A" },
  { id: 4, homeTeam: "Frankfurt", homeScore: 1, awayTeam: "Bayer Leverkusen", awayScore: 5, date: "May 3, 2025", league: "Bundesliga" },
  { id: 5, homeTeam: "Barcelona", homeScore: 4, awayTeam: "Valencia", awayScore: 2, date: "May 3, 2025", league: "La Liga" },
];

export const Soccer = () => {
  const [tab, setTab] = useState("live");
  const [leagueTab, setLeagueTab] = useState("premier-league");

  const getTeamsByLeague = (leagueId: string) => {
    switch (leagueId) {
      case "premier-league":
        return premierLeagueTeams;
      case "la-liga":
        return laLigaTeams;
      case "bundesliga":
        return bundesligaTeams;
      case "serie-a":
        return serieATeams;
      default:
        return premierLeagueTeams;
    }
  };

  return (
    <div className="container p-4 mb-20">
      {tab === "live" && (
        <div className="grid gap-4 mb-8">
          {liveGames.map((game) => (
            <Card key={game.id}>
              <CardHeader className="pb-2">
                <CardTitle className="text-base flex justify-between items-center">
                  <span>{game.league}</span>
                  <span className="text-sm font-normal text-red-500">{game.status}</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-7 gap-2 items-center">
                  <div className="col-span-3">
                    <div className="font-semibold text-lg">{game.homeTeam}</div>
                    <div className="font-semibold text-lg">{game.awayTeam}</div>
                  </div>
                  <div className="col-span-1 text-center">
                    <div className="font-bold text-xl">{game.homeScore}</div>
                    <div className="font-bold text-xl">{game.awayScore}</div>
                  </div>
                  <div className="col-span-3 flex flex-col gap-2 items-end">
                    <div className="grid grid-cols-3 gap-2">
                      <button className="bg-green-600 text-white px-3 py-1 rounded text-sm font-medium hover:bg-green-700 w-16 text-center">
                        {game.homeOdds}
                      </button>
                      <button className="bg-amber-600 text-white px-3 py-1 rounded text-sm font-medium hover:bg-amber-700 w-16 text-center">
                        {game.drawOdds}
                      </button>
                      <button className="bg-blue-600 text-white px-3 py-1 rounded text-sm font-medium hover:bg-blue-700 w-16 text-center">
                        {game.awayOdds}
                      </button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      <Tabs defaultValue="standings" className="mb-4">
        <TabsList>
          <TabsTrigger value="standings">Standings</TabsTrigger>
          <TabsTrigger value="scorers">Top Scorers</TabsTrigger>
          <TabsTrigger value="results">Recent Results</TabsTrigger>
        </TabsList>

        <TabsContent value="standings">
          <Card className="mb-4">
            <CardHeader>
              <CardTitle>Leagues</CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs
                value={leagueTab}
                onValueChange={setLeagueTab}
                className="w-full"
              >
                <TabsList className="grid w-full" style={{ gridTemplateColumns: "repeat(4, 1fr)" }}>
                  {leagues.map((league) => (
                    <TabsTrigger key={league.id} value={league.id}>
                      {league.name}
                    </TabsTrigger>
                  ))}
                </TabsList>
              </Tabs>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>{leagues.find(l => l.id === leagueTab)?.name} Standings</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Pos</TableHead>
                      <TableHead>Team</TableHead>
                      <TableHead className="text-center">P</TableHead>
                      <TableHead className="text-center">W</TableHead>
                      <TableHead className="text-center">D</TableHead>
                      <TableHead className="text-center">L</TableHead>
                      <TableHead className="text-center">GD</TableHead>
                      <TableHead className="text-center">Pts</TableHead>
                      <TableHead className="text-center">Form</TableHead>
                      <TableHead className="text-right">League Odds</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {getTeamsByLeague(leagueTab).map((team) => (
                      <TableRow key={team.position}>
                        <TableCell className="font-medium">{team.position}</TableCell>
                        <TableCell>{team.name}</TableCell>
                        <TableCell className="text-center">{team.played}</TableCell>
                        <TableCell className="text-center">{team.won}</TableCell>
                        <TableCell className="text-center">{team.drawn}</TableCell>
                        <TableCell className="text-center">{team.lost}</TableCell>
                        <TableCell className="text-center">{team.gd > 0 ? `+${team.gd}` : team.gd}</TableCell>
                        <TableCell className="text-center font-bold">{team.points}</TableCell>
                        <TableCell className="text-center">
                          <div className="flex gap-1 justify-center">
                            {team.form.split('').map((result, i) => (
                              <span
                                key={i}
                                className={`w-6 h-6 flex items-center justify-center text-xs text-white font-bold rounded-full
                                  ${result === 'W' ? 'bg-green-600' : result === 'D' ? 'bg-amber-600' : 'bg-red-600'}`}
                              >
                                {result}
                              </span>
                            ))}
                          </div>
                        </TableCell>
                        <TableCell className="text-right">
                          <button className="bg-green-600 text-white px-2 py-1 rounded text-xs font-medium hover:bg-green-700">
                            {team.winOdds}
                          </button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="scorers">
          <Card>
            <CardHeader>
              <CardTitle>Top Scorers</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Rank</TableHead>
                    <TableHead>Player</TableHead>
                    <TableHead>League</TableHead>
                    <TableHead className="text-center">Goals</TableHead>
                    <TableHead className="text-center">Matches</TableHead>
                    <TableHead className="text-center">Goals/Match</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {topScorers.map((player) => (
                    <TableRow key={player.position}>
                      <TableCell className="font-medium">{player.position}</TableCell>
                      <TableCell>
                        <div className="flex flex-col">
                          <span>{player.name}</span>
                          <span className="text-xs text-muted-foreground">{player.team}</span>
                        </div>
                      </TableCell>
                      <TableCell>{player.league}</TableCell>
                      <TableCell className="text-center font-bold">{player.goals}</TableCell>
                      <TableCell className="text-center">{player.games}</TableCell>
                      <TableCell className="text-center">{(player.goals / player.games).toFixed(2)}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="results">
          <Card>
            <CardHeader>
              <CardTitle>Recent Results</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>League</TableHead>
                    <TableHead>Match</TableHead>
                    <TableHead>Result</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {recentResults.map((game) => (
                    <TableRow key={game.id}>
                      <TableCell className="font-medium">{game.date}</TableCell>
                      <TableCell>{game.league}</TableCell>
                      <TableCell>{game.homeTeam} vs {game.awayTeam}</TableCell>
                      <TableCell>
                        <span className="font-bold">{game.homeScore} - {game.awayScore}</span>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="flex justify-center mt-4">
        <Tabs value={tab} onValueChange={setTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="live">Live Matches</TabsTrigger>
            <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
    </div>
  );
};
