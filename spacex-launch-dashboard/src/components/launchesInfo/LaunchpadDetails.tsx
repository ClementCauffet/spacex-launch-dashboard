import React from "react";
import { useQuery } from "@apollo/client";
import { gql } from "graphql-tag";

interface LaunchpadData {
  launchpadDetails: {
    full_name: string;
    region: string;
    latitude: string;
    longitude: string;
    launch_attempts: string;
    launch_successes: string;
  };
}

const GET_LAUNCHPAD_DETAILS = gql`
  query GetLaunchpadDetails($launchpad: String!) {
    launchpadDetails(id: $launchpad) {
      full_name
      region
      latitude
      longitude
      launch_attempts
      launch_successes
    }
  }
`;

interface LaunchpadDetailsProps {
  launchpad: string | undefined;
}

function LaunchpadDetails({ launchpad }: LaunchpadDetailsProps) {
  const { loading, error, data } = useQuery<LaunchpadData>(GET_LAUNCHPAD_DETAILS, {
    variables: { launchpad },
  });

  if (loading) return <p>Loading Launchpad Details...</p>;
  if (error) return <p>Error: {error.message}</p>;

  console.log(data);

  const launchpadInfo = data?.launchpadDetails;

  return (
    <div>      
      <p><strong>Name: </strong>{launchpadInfo?.full_name}</p>
      <p><strong>Region: </strong>{launchpadInfo?.region}</p>
      <p><strong>Latitude</strong>{launchpadInfo?.latitude}</p>
      <p><strong>Longitude: </strong>{launchpadInfo?.longitude}</p>
      <p><strong>Launch Attempts: </strong>{launchpadInfo?.launch_attempts}</p>
      <p><strong>Launch Successes: </strong>{launchpadInfo?.launch_successes}</p>
    </div>
  );
}

export default LaunchpadDetails;
