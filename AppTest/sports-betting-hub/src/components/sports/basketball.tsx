"use client";

import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Progress } from "@/components/ui/progress";

// Mock data for NBA
const liveGames = [
  {
    id: 1,
    homeTeam: "Los Angeles Lakers",
    homeScore: 85,
    awayTeam: "Boston Celtics",
    awayScore: 82,
    status: "3rd Quarter - 4:25",
    homeOdds: 1.9,
    awayOdds: 1.85,
  },
  {
    id: 2,
    homeTeam: "Golden State Warriors",
    homeScore: 102,
    awayTeam: "Dallas Mavericks",
    awayScore: 98,
    status: "4th Quarter - 7:12",
    homeOdds: 1.75,
    awayOdds: 2.1,
  },
];

const teams = [
  { position: 1, name: "Boston Celtics", conference: "East", wins: 62, losses: 20, pct: 0.756, streak: "W5", winOdds: 2.5 },
  { position: 2, name: "Milwaukee Bucks", conference: "East", wins: 58, losses: 24, pct: 0.707, streak: "W3", winOdds: 4.0 },
  { position: 3, name: "Denver Nuggets", conference: "West", wins: 57, losses: 25, pct: 0.695, streak: "W2", winOdds: 4.5 },
  { position: 4, name: "Los Angeles Lakers", conference: "West", wins: 56, losses: 26, pct: 0.683, streak: "L1", winOdds: 5.0 },
  { position: 5, name: "Oklahoma City Thunder", conference: "West", wins: 55, losses: 27, pct: 0.671, streak: "W4", winOdds: 8.0 },
  { position: 6, name: "New York Knicks", conference: "East", wins: 53, losses: 29, pct: 0.646, streak: "W1", winOdds: 12.0 },
  { position: 7, name: "Golden State Warriors", conference: "West", wins: 51, losses: 31, pct: 0.622, streak: "W5", winOdds: 10.0 },
  { position: 8, name: "Phoenix Suns", conference: "West", wins: 49, losses: 33, pct: 0.598, streak: "L2", winOdds: 15.0 },
];

const players = [
  { position: 1, name: "Luka Dončić", team: "Dallas Mavericks", ppg: 29.8, rpg: 8.6, apg: 9.2, mvpOdds: 3.5 },
  { position: 2, name: "Nikola Jokić", team: "Denver Nuggets", ppg: 26.4, rpg: 12.4, apg: 9.0, mvpOdds: 2.2 },
  { position: 3, name: "Joel Embiid", team: "Philadelphia 76ers", ppg: 30.2, rpg: 11.2, apg: 4.3, mvpOdds: 4.5 },
  { position: 4, name: "Giannis Antetokounmpo", team: "Milwaukee Bucks", ppg: 28.7, rpg: 11.5, apg: 5.6, mvpOdds: 5.0 },
  { position: 5, name: "Jayson Tatum", team: "Boston Celtics", ppg: 27.2, rpg: 8.1, apg: 4.9, mvpOdds: 8.0 },
  { position: 6, name: "Shai Gilgeous-Alexander", team: "Oklahoma City Thunder", ppg: 30.1, rpg: 5.5, apg: 6.2, mvpOdds: 10.0 },
  { position: 7, name: "Stephen Curry", team: "Golden State Warriors", ppg: 26.1, rpg: 4.8, apg: 5.9, mvpOdds: 15.0 },
];

const recentGames = [
  { id: 1, homeTeam: "Boston Celtics", homeScore: 115, awayTeam: "Miami Heat", awayScore: 98, date: "May 5, 2025" },
  { id: 2, homeTeam: "Denver Nuggets", homeScore: 126, awayTeam: "Los Angeles Clippers", awayScore: 112, date: "May 4, 2025" },
  { id: 3, homeTeam: "Philadelphia 76ers", homeScore: 104, awayTeam: "New York Knicks", awayScore: 109, date: "May 3, 2025" },
  { id: 4, homeTeam: "Los Angeles Lakers", homeScore: 121, awayTeam: "Golden State Warriors", awayScore: 114, date: "May 2, 2025" },
  { id: 5, homeTeam: "Milwaukee Bucks", homeScore: 118, awayTeam: "Indiana Pacers", awayScore: 105, date: "May 1, 2025" },
];

export const Basketball = () => {
  const [tab, setTab] = useState("live");

  return (
    <div className="container p-4 mb-20">
      {tab === "live" && (
        <div className="grid gap-4 mb-8">
          {liveGames.map((game) => (
            <Card key={game.id}>
              <CardHeader className="pb-2">
                <CardTitle className="text-base flex justify-between items-center">
                  <span>NBA Regular Season</span>
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
              <CardTitle>NBA Standings</CardTitle>
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
                    <TableHead className="text-right">Championship Odds</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {teams.map((team) => (
                    <TableRow key={team.position}>
                      <TableCell className="font-medium">{team.position}</TableCell>
                      <TableCell>
                        <div className="flex flex-col">
                          <span>{team.name}</span>
                          <span className="text-xs text-muted-foreground">{team.conference}</span>
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
              <CardTitle>Player Statistics</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Rank</TableHead>
                    <TableHead>Player</TableHead>
                    <TableHead className="text-center">PPG</TableHead>
                    <TableHead className="text-center">RPG</TableHead>
                    <TableHead className="text-center">APG</TableHead>
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
                      <TableCell className="text-center">{player.ppg}</TableCell>
                      <TableCell className="text-center">{player.rpg}</TableCell>
                      <TableCell className="text-center">{player.apg}</TableCell>
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
