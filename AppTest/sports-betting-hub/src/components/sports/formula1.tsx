"use client";

import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Avatar } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";

// Mock data for F1
const currentRace = {
  name: "Monaco Grand Prix",
  circuit: "Circuit de Monaco",
  date: "May 28, 2025",
  status: "Live - Lap 45/78",
};

const drivers = [
  { position: 1, name: "Max Verstappen", team: "Red Bull Racing", points: 386, odds: 1.5, avatar: "🇳🇱" },
  { position: 2, name: "Charles Leclerc", team: "Ferrari", points: 328, odds: 4.5, avatar: "🇲🇨" },
  { position: 3, name: "Lewis Hamilton", team: "Mercedes", points: 315, odds: 6.0, avatar: "🇬🇧" },
  { position: 4, name: "Lando Norris", team: "McLaren", points: 280, odds: 8.0, avatar: "🇬🇧" },
  { position: 5, name: "Carlos Sainz", team: "Ferrari", points: 278, odds: 10.0, avatar: "🇪🇸" },
  { position: 6, name: "Oscar Piastri", team: "McLaren", points: 210, odds: 15.0, avatar: "🇦🇺" },
  { position: 7, name: "Sergio Perez", team: "Red Bull Racing", points: 189, odds: 18.0, avatar: "🇲🇽" },
  { position: 8, name: "George Russell", team: "Mercedes", points: 186, odds: 20.0, avatar: "🇬🇧" },
];

const teams = [
  { position: 1, name: "Red Bull Racing", points: 575, winOdds: 1.2 },
  { position: 2, name: "Ferrari", points: 545, winOdds: 3.0 },
  { position: 3, name: "Mercedes", points: 501, winOdds: 5.0 },
  { position: 4, name: "McLaren", points: 490, winOdds: 6.0 },
  { position: 5, name: "Aston Martin", points: 198, winOdds: 50.0 },
];

const races = [
  { name: "Bahrain Grand Prix", winner: "Max Verstappen", date: "March 2, 2025" },
  { name: "Saudi Arabian Grand Prix", winner: "Charles Leclerc", date: "March 9, 2025" },
  { name: "Australian Grand Prix", winner: "Max Verstappen", date: "March 24, 2025" },
  { name: "Japanese Grand Prix", winner: "Max Verstappen", date: "April 7, 2025" },
  { name: "Chinese Grand Prix", winner: "Lando Norris", date: "April 21, 2025" },
  { name: "Miami Grand Prix", winner: "Lewis Hamilton", date: "May 5, 2025" },
  { name: "Emilia Romagna Grand Prix", winner: "Charles Leclerc", date: "May 19, 2025" },
];

export const Formula1 = () => {
  const [tab, setTab] = useState("live");

  return (
    <div className="container p-4 mb-20">
      {tab === "live" && (
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex justify-between items-center">
              <span>{currentRace.name}</span>
              <span className="text-sm font-normal text-red-500">{currentRace.status}</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">{currentRace.circuit} - {currentRace.date}</p>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Pos</TableHead>
                  <TableHead>Driver</TableHead>
                  <TableHead>Team</TableHead>
                  <TableHead>Gap</TableHead>
                  <TableHead className="text-right">Bet</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {drivers.slice(0, 5).map((driver) => (
                  <TableRow key={driver.position}>
                    <TableCell className="font-medium">{driver.position}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <span className="text-lg">{driver.avatar}</span>
                        {driver.name}
                      </div>
                    </TableCell>
                    <TableCell>{driver.team}</TableCell>
                    <TableCell>{driver.position === 1 ? "Leader" : `+${driver.position * 2.5}s`}</TableCell>
                    <TableCell className="text-right">
                      <button className="bg-green-600 text-white px-2 py-1 rounded text-xs font-medium hover:bg-green-700">
                        {driver.odds}
                      </button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      )}

      <Tabs defaultValue="standings" className="mb-4">
        <TabsList>
          <TabsTrigger value="standings">Standings</TabsTrigger>
          <TabsTrigger value="results">Results</TabsTrigger>
          <TabsTrigger value="teams">Teams</TabsTrigger>
        </TabsList>
        <TabsContent value="standings">
          <Card>
            <CardHeader>
              <CardTitle>Driver Standings</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Pos</TableHead>
                    <TableHead>Driver</TableHead>
                    <TableHead>Points</TableHead>
                    <TableHead className="text-right">Championship Odds</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {drivers.map((driver) => (
                    <TableRow key={driver.position}>
                      <TableCell className="font-medium">{driver.position}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <span className="text-lg">{driver.avatar}</span>
                          {driver.name}
                        </div>
                      </TableCell>
                      <TableCell>{driver.points}</TableCell>
                      <TableCell className="text-right">
                        <button className="bg-green-600 text-white px-2 py-1 rounded text-xs font-medium hover:bg-green-700">
                          {driver.odds}
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
              <CardTitle>Race Results</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Race</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Winner</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {races.map((race) => (
                    <TableRow key={race.name}>
                      <TableCell className="font-medium">{race.name}</TableCell>
                      <TableCell>{race.date}</TableCell>
                      <TableCell>{race.winner}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="teams">
          <Card>
            <CardHeader>
              <CardTitle>Constructor Standings</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Pos</TableHead>
                    <TableHead>Team</TableHead>
                    <TableHead>Points</TableHead>
                    <TableHead>Performance</TableHead>
                    <TableHead className="text-right">Championship Odds</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {teams.map((team) => (
                    <TableRow key={team.position}>
                      <TableCell className="font-medium">{team.position}</TableCell>
                      <TableCell>{team.name}</TableCell>
                      <TableCell>{team.points}</TableCell>
                      <TableCell className="w-[200px]">
                        <Progress value={(team.points / teams[0].points) * 100} className="h-2" />
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
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="flex justify-center mt-4">
        <Tabs value={tab} onValueChange={setTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="live">Live Race</TabsTrigger>
            <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
    </div>
  );
};
