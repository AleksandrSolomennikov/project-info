"use client";

import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Progress } from "@/components/ui/progress";

// Mock data for NFL
const liveGames = [
  {
    id: 1,
    homeTeam: "Kansas City Chiefs",
    homeScore: 17,
    awayTeam: "Buffalo Bills",
    awayScore: 14,
    status: "3rd Quarter - 8:45",
    homeOdds: 1.85,
    awayOdds: 1.95,
  },
  {
    id: 2,
    homeTeam: "Dallas Cowboys",
    homeScore: 24,
    awayTeam: "Philadelphia Eagles",
    awayScore: 21,
    status: "4th Quarter - 5:20",
    homeOdds: 1.75,
    awayOdds: 2.1,
  },
];

const teams = [
  { position: 1, name: "Kansas City Chiefs", division: "AFC West", wins: 14, losses: 3, pct: 0.824, streak: "W5", winOdds: 3.5 },
  { position: 2, name: "Baltimore Ravens", division: "AFC North", wins: 13, losses: 4, pct: 0.765, streak: "W3", winOdds: 4.0 },
  { position: 3, name: "San Francisco 49ers", division: "NFC West", wins: 12, losses: 5, pct: 0.706, streak: "W4", winOdds: 5.0 },
  { position: 4, name: "Dallas Cowboys", division: "NFC East", wins: 12, losses: 5, pct: 0.706, streak: "W2", winOdds: 6.0 },
  { position: 5, name: "Buffalo Bills", division: "AFC East", wins: 11, losses: 6, pct: 0.647, streak: "L1", winOdds: 7.0 },
  { position: 6, name: "Philadelphia Eagles", division: "NFC East", wins: 11, losses: 6, pct: 0.647, streak: "W1", winOdds: 8.0 },
  { position: 7, name: "Detroit Lions", division: "NFC North", wins: 10, losses: 7, pct: 0.588, streak: "L2", winOdds: 10.0 },
  { position: 8, name: "Cincinnati Bengals", division: "AFC North", wins: 10, losses: 7, pct: 0.588, streak: "W3", winOdds: 12.0 },
];

const players = [
  { position: 1, name: "Patrick Mahomes", team: "Kansas City Chiefs", passYds: 4835, passTD: 38, int: 10, mvpOdds: 3.0 },
  { position: 2, name: "Lamar Jackson", team: "Baltimore Ravens", passYds: 3678, passTD: 29, int: 7, mvpOdds: 3.5 },
  { position: 3, name: "Josh Allen", team: "Buffalo Bills", passYds: 4306, passTD: 32, int: 12, mvpOdds: 5.0 },
  { position: 4, name: "Jalen Hurts", team: "Philadelphia Eagles", passYds: 3858, passTD: 27, int: 9, mvpOdds: 7.0 },
  { position: 5, name: "Joe Burrow", team: "Cincinnati Bengals", passYds: 4215, passTD: 30, int: 11, mvpOdds: 8.0 },
  { position: 6, name: "Dak Prescott", team: "Dallas Cowboys", passYds: 4125, passTD: 29, int: 8, mvpOdds: 10.0 },
  { position: 7, name: "Justin Herbert", team: "Los Angeles Chargers", passYds: 4089, passTD: 28, int: 10, mvpOdds: 12.0 },
];

const recentGames = [
  { id: 1, homeTeam: "Kansas City Chiefs", homeScore: 31, awayTeam: "Cincinnati Bengals", awayScore: 24, date: "May 1, 2025" },
  { id: 2, homeTeam: "Buffalo Bills", homeScore: 27, awayTeam: "New England Patriots", awayScore: 17, date: "April 30, 2025" },
  { id: 3, homeTeam: "San Francisco 49ers", homeScore: 24, awayTeam: "Los Angeles Rams", awayScore: 20, date: "April 29, 2025" },
  { id: 4, homeTeam: "Baltimore Ravens", homeScore: 30, awayTeam: "Pittsburgh Steelers", awayScore: 21, date: "April 28, 2025" },
  { id: 5, homeTeam: "Philadelphia Eagles", homeScore: 28, awayTeam: "New York Giants", awayScore: 13, date: "April 27, 2025" },
];

export const Football = () => {
  const [tab, setTab] = useState("live");

  return (
    <div className="container p-4 mb-20">
      {tab === "live" && (
        <div className="grid gap-4 mb-8">
          {liveGames.map((game) => (
            <Card key={game.id}>
              <CardHeader className="pb-2">
                <CardTitle className="text-base flex justify-between items-center">
                  <span>NFL Regular Season</span>
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
                    <button className="bg-green-600 text-white px-3 py-1 rounded text-sm font-medium hover:bg-green-700 w-24 text-center">
                      {game.homeOdds}
                    </button>
                    <button className="bg-green-600 text-white px-3 py-1 rounded text-sm font-medium hover:bg-green-700 w-24 text-center">
                      {game.awayOdds}
                    </button>
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
          <TabsTrigger value="stats">Player Stats</TabsTrigger>
          <TabsTrigger value="results">Recent Games</TabsTrigger>
        </TabsList>
        <TabsContent value="standings">
          <Card>
            <CardHeader>
              <CardTitle>NFL Standings</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Pos</TableHead>
                    <TableHead>Team</TableHead>
                    <TableHead className="text-center">W</TableHead>
                    <TableHead className="text-center">L</TableHead>
                    <TableHead className="text-center">PCT</TableHead>
                    <TableHead className="text-center">Streak</TableHead>
                    <TableHead className="text-right">Super Bowl Odds</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {teams.map((team) => (
                    <TableRow key={team.position}>
                      <TableCell className="font-medium">{team.position}</TableCell>
                      <TableCell>
                        <div className="flex flex-col">
                          <span>{team.name}</span>
                          <span className="text-xs text-muted-foreground">{team.division}</span>
                        </div>
                      </TableCell>
                      <TableCell className="text-center">{team.wins}</TableCell>
                      <TableCell className="text-center">{team.losses}</TableCell>
                      <TableCell className="text-center">{team.pct.toFixed(3)}</TableCell>
                      <TableCell className="text-center">{team.streak}</TableCell>
                      <TableCell className="text-right">
                        <button className="bg-green-600 text-white px-2 py-1 rounded text-xs font-medium hover:bg-green-700">
                          {team.winOdds}
                        </button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="stats">
          <Card>
            <CardHeader>
              <CardTitle>QB Statistics</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Rank</TableHead>
                    <TableHead>Quarterback</TableHead>
                    <TableHead className="text-center">Pass Yds</TableHead>
                    <TableHead className="text-center">TD</TableHead>
                    <TableHead className="text-center">INT</TableHead>
                    <TableHead className="text-right">MVP Odds</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {players.map((player) => (
                    <TableRow key={player.position}>
                      <TableCell className="font-medium">{player.position}</TableCell>
                      <TableCell>
                        <div className="flex flex-col">
                          <span>{player.name}</span>
                          <span className="text-xs text-muted-foreground">{player.team}</span>
                        </div>
                      </TableCell>
                      <TableCell className="text-center">{player.passYds}</TableCell>
                      <TableCell className="text-center">{player.passTD}</TableCell>
                      <TableCell className="text-center">{player.int}</TableCell>
                      <TableCell className="text-right">
                        <button className="bg-green-600 text-white px-2 py-1 rounded text-xs font-medium hover:bg-green-700">
                          {player.mvpOdds}
                        </button>
                      </TableCell>
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
              <CardTitle>Recent Games</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Matchup</TableHead>
                    <TableHead>Result</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {recentGames.map((game) => (
                    <TableRow key={game.id}>
                      <TableCell className="font-medium">{game.date}</TableCell>
                      <TableCell>{game.awayTeam} @ {game.homeTeam}</TableCell>
                      <TableCell>
                        {game.awayScore} - {game.homeScore}
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
            <TabsTrigger value="live">Live Games</TabsTrigger>
            <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
    </div>
  );
};
