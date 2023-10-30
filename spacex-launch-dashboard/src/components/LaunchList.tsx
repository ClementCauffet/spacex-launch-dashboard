import React from "react";
import { useQuery } from "@apollo/client";
import { gql } from "graphql-tag";

interface Launch {
  name: string;
  date_utc: string;
  success: boolean;
}

const GET_LAUNCHES = gql`
  query {
    allLaunches {
      name
      date_utc
      success
    }
  }
`;

function LaunchList() {
  const { loading, error, data } = useQuery(GET_LAUNCHES);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const launches: Launch[] = data.allLaunches;

  return (
    <div>
      <h2>SpaceX Launch List</h2>
      <ul>
        {launches.map((launch: Launch, index: number) => (
          <li key={index}>
            <p>Name: {launch.name}</p>
            <p>Launch Date (UTC): {launch.date_utc}</p>
            <p>Success: {launch.success ? "Yes" : "No"}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default LaunchList;
