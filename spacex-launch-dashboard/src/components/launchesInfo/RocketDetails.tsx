import React from "react";
import { useQuery } from "@apollo/client";
import { gql } from "graphql-tag";

interface RocketData {
  rocketDetails: {
    name: string;
    type: string;
    first_flight: string;
    img: string;
  };
}

const GET_ROCKET_DETAILS = gql`
  query GetLaunchpadDetails($rocket: String!) {
    rocketDetails(id: $rocket) {
      name
      type
      first_flight
      img
    }
  }
`;

interface RocketDetailsProps {
  rocket: string | undefined;
}

function RocketDetails({ rocket }: RocketDetailsProps) {
  const { loading, error, data } = useQuery<RocketData>(GET_ROCKET_DETAILS, {
    variables: { rocket },
  });

  if (loading) return <p>Loading Launchpad Details...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const rocketInfo = data?.rocketDetails;

  return (
    <div>
      <h2>Rocket Details</h2>
      <p>Name: {rocketInfo?.name}</p>
      <p>Type: {rocketInfo?.type}</p>
      <p>First flight: {rocketInfo?.first_flight}</p>
      <p>Img: {rocketInfo?.img}</p>
    </div>
  );
}

export default RocketDetails;
