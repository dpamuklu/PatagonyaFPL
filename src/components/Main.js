import { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import Loader from "../components/Loader";
import axios from "axios";
import data from "../data/contents.json";

function Main() {
  const [standings, setStandings] = useState("");
  const [managers, setManagers] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [amountInTRY, setAmountInTRY] = useState(0);

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

  const getTeamName = (id) => {
    console.log(id, "test");
    let team = "";
    managers.forEach((manager) => {
      if (manager.id === id) {
        team = `${manager.player_first_name} - ${manager.player_last_name}`;
        return;
      }
    });
    return team;
  };
  const setAmountByRank = (rank) => {
    switch (rank) {
      case 1:
        return (amountInTRY * 0.5).toFixed(1);
      case 2:
        return (amountInTRY * 0.25).toFixed(1);
      case 3:
        return (amountInTRY * 0.15).toFixed(1);
      case 4:
        return (amountInTRY * 0.1).toFixed(1);
      default:
    }
  };
  const baseURL = "https://draft.premierleague.com/api/league/99028/details";
  const proxyURL = "https://cors-anywhere.herokuapp.com/";
  const config = {
    baseURL,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
      "Access-Control-Allow-Headers": "Origin",
    },
  };
  useEffect(() => {
    const getData = async () => {
      setLoading(true);
      try {
        const response = await axios(config);
        console.log(response);
        // setStandings(response.data.standings);
        setManagers(data.league_entries);
      } catch (error) {
        setError(error);
      }
      setLoading(false);
    };

    const getPrice = async () => {
      const priceUrl = "https://blockchain.info/ticker";
      const response = await axios.get(priceUrl);
      setAmountInTRY(0.00577931 * response.data.TRY.last);
    };
    getData();
    getPrice();
  }, []);

  if (error) return <div className="error">{error.message}</div>;
  if (loading) return <Loader></Loader>;

  return (
    standings && (
      <Table striped responsive hover>
        <thead>
          <tr>
            <th>Rank</th>
            <th>Team</th>
            <th>W</th>
            <th>D</th>
            <th>L</th>
            <th>+Score</th>
            <th>Pts</th>
            <th>Reward in TRY</th>
          </tr>
        </thead>
        <tbody>
          {standings.map((element) => (
            <tr
              key={element.rank_sort}
              className={
                element.rank_sort <= 4
                  ? "reward"
                  : element.rank_sort >= 11
                  ? "relagate"
                  : ""
              }
            >
              <td>{element.rank_sort}</td>

              <td>{getTeam(element.league_entry)}</td>

              <td>{element.matches_won}</td>
              <td>{element.matches_drawn}</td>
              <td>{element.matches_lost}</td>
              <td>{element.points_for}</td>
              <td>{element.total}</td>
              <td>{setAmountByRank(element.rank_sort)}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    )
  );
}

export default Main;
