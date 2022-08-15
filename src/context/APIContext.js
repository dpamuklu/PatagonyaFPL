import { createContext, useEffect, useState } from "react";
import axios from "axios";

export const apiContext = createContext();

export default function APIContext({ children }) {
  const [standings, setStandings] = useState("");
  const baseURL = "https://patagonya-fplb-ackend.vercel.app/";
  const [managers, setManagers] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [amountInTRY, setAmountInTRY] = useState(0);
  const [results, setResults] = useState("");
  const [gameweek, setGameweek] = useState(0);
  const [fixtures, setFixtures] = useState("");

  useEffect(() => {
    const getData = async () => {
      setLoading(true);
      try {
        const response = await axios(baseURL);
        setStandings(response.data.standings);

        setGameweek(
          response.data.standings[0].matches_drawn +
            response.data.standings[0].matches_lost +
            response.data.standings[0].matches_won
        );
        setManagers(response.data.league_entries);
        setResults(filterMatches(response.data.matches));
        setFixtures(filterNextMatches(response.data.matches));
      } catch (error) {
        setError(error);
      }
      setLoading(false);
    };

    const getTeam = (id) => {
      let team = "";
      managers.forEach((manager) => {
        if (manager.id === id) {
          team = manager.entry_name;
          return;
        }
      });
      return team;
    };

    const getRank = (id) => {
      let rank = "";
      standings.forEach((team) => {
        if (team.league_entry === id) {
          rank = team.rank_sort;
          return;
        }
      });
      return rank;
    };

    const filterMatches = (matches) => {
      const result = [];
      if (standings) {
        const filteredMatches = matches.filter((match) => {
          return match.event === gameweek;
        });

        for (const match of filteredMatches) {
          const team1 = getTeam(match.league_entry_1);
          const team1Rank = getRank(match.league_entry_1);
          const team2 = getTeam(match.league_entry_2);
          const team2Rank = getRank(match.league_entry_2);
          const score1 = match.league_entry_1_points;
          const score2 = match.league_entry_2_points;
          result.push({ team1, team1Rank, score1, team2, team2Rank, score2 });
        }
        return result;
      }
    };

    const filterNextMatches = (matches) => {
      const result = [];
      if (standings) {
        const filteredMatches = matches.filter((match) => {
          return match.event === gameweek + 1;
        });

        for (const match of filteredMatches) {
          const team1 = getTeam(match.league_entry_1);
          const team1Rank = getRank(match.league_entry_1);
          const team2 = getTeam(match.league_entry_2);
          const team2Rank = getRank(match.league_entry_2);
          const score1 = match.league_entry_1_points;
          const score2 = match.league_entry_2_points;
          result.push({ team1, team1Rank, score1, team2, team2Rank, score2 });
        }
        return result;
      }
    };

    const getPrice = async () => {
      const priceUrl = "https://blockchain.info/ticker";
      const response = await axios.get(priceUrl);
      setAmountInTRY(0.00577931 * response.data.TRY.last);
    };
    getData();
    getPrice();
  }, [gameweek]);

  return (
    <apiContext.Provider
      value={{
        standings,
        managers,
        error,
        loading,
        amountInTRY,
        results,
        fixtures,
        gameweek,
      }}
    >
      {children}
    </apiContext.Provider>
  );
}
