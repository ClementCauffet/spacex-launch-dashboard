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
      <h2>Launchpad Details</h2>
      <p>Full Name: {launchpadInfo?.full_name}</p>
      <p>Region: {launchpadInfo?.region}</p>
      <p>Latitude: {launchpadInfo?.latitude}</p>
      <p>Longitude: {launchpadInfo?.longitude}</p>
      <p>Launch Attempts: {launchpadInfo?.launch_attempts}</p>
      <p>Launch Successes: {launchpadInfo?.launch_successes}</p>
    </div>
  );
}

export default LaunchpadDetails;
