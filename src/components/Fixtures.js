import React, { useContext } from "react";
import { Table } from "react-bootstrap";
import { apiContext } from "../context/APIContext";

const Fixtures = () => {
  const { fixtures } = useContext(apiContext);

  return (
    fixtures && (
      <Table striped responsive hover>
        <thead>
          <tr>
            <th>Gameweek 2</th>
          </tr>
        </thead>
        <tbody>
          {fixtures.map((element, index) => (
            <tr key={index}>
              <td>{element.team1}</td>
              <td>{element.score1}</td>
              <td>{element.score2}</td>
              <td>{element.team2}</td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
          ))}
        </tbody>
      </Table>
    )
  );
};

export default Fixtures;
