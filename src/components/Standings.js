import React, { useContext } from "react";
import Table from "react-bootstrap/Table";
import Loader from "../components/Loader";
import { apiContext } from "../context/APIContext";

const Standings = () => {
  const { standings, managers, error, loading, amountInTRY } =
    useContext(apiContext);

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
};

export default Standings;
