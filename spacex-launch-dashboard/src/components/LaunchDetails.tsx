// LaunchDetails.tsx

import React from "react";
import { useLocation } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { gql } from "graphql-tag";

interface CrewMember {
  crew: string;
  role: string;
}

const GET_LAUNCH_DETAILS = gql`
  query GetLaunchDetails($id: String!) {
    singleLaunch(id: $id) {
      details
      rocket
      links {
        webcast
      }
      crew {
        crew
        role
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
      {/* Affichez les données passées en tant que props */}
      <p>Name: {location.state?.name}</p>
      <p>Launch Date (UTC): {location.state?.date_utc}</p>
      <p>Success: {location.state?.success ? "Yes" : "No"}</p>
      <p>Details: {launch.details}</p>
      <p>Rocket: {launch.rocket}</p>
      <p>Webcast: {launch.links.webcast}</p>
      <p>Patch: {location.state?.patch}</p>
      <p>Crew Members:</p>
      <ul>
        {launch.crew.map((crewMember: CrewMember, index: number) => (
          <li key={index}>
            <p>Crew: {crewMember.crew}</p>
            <p>Role: {crewMember.role}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default LaunchDetails;
