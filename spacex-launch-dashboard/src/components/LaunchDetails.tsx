import React from "react";
import { useLocation} from "react-router-dom";
import { useQuery } from "@apollo/client";
import { gql } from "graphql-tag";

interface CrewMember {
  name: string;
  agency: string;
}

interface Ship {
  name: String
  type: String
}

const GET_LAUNCH_DETAILS = gql`
  query GetLaunchDetails($id: String!) {
    singleLaunch(id: $id) {
      name
      date_utc
      success
      details
      rocket {
        name
      }
      links {
        webcast
        youtube_id
        reddit_campaign
      }
      crew {
        name
        agency
      }
      ships {
        name
        type
      }
    }
  }
`;

function LaunchDetails() {
  const location = useLocation();
  const launchId: string | undefined = location.state?.launchId;

  const { loading, error, data } = useQuery(GET_LAUNCH_DETAILS, {
    variables: { id: launchId },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const launch = data.singleLaunch;

  return (
    <div>
      <h2>Launch Details</h2>
      <p>Name: {launch.name}</p>
      <p>Launch Date (UTC): {launch.date_utc}</p>
      <p>Success: {launch.success ? "Yes" : "No"}</p>
      <p>Details: {launch.details}</p>
      <p>Rocket: {launch.rocket.name}</p>
      <p>Webcast: {launch.links.webcast}</p>
      <p>YouTube ID: {launch.links.youtube_id}</p>
      <p>Reddit Campaign: {launch.links.reddit_campaign}</p>
      <p>Crew Members:</p>
      <ul>
        {launch.crew.map((crewMember: CrewMember, index: number) => (
          <li key={index}>
            <p>Name: {crewMember.name}</p>
            <p>Agency: {crewMember.agency}</p>
          </li>
        ))}
      </ul>
      <p>Ships:</p>
      <ul>
        {launch.ships.map((ship: Ship, index: number) => (
          <li key={index}>
            <p>Name: {ship.name}</p>
            <p>Type: {ship.type}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default LaunchDetails;
