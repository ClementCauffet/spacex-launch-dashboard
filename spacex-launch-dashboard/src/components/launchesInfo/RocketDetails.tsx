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
    <div style={{textAlign: "center"}}>
      <p><strong>Name: </strong>{rocketInfo?.name}</p>
      <p><strong>Type: </strong>{rocketInfo?.type}</p>
      <p><strong>First flight: </strong>{rocketInfo?.first_flight}</p>
      <img
        src={rocketInfo?.img}
        alt="RocketImg"
        style={{width: "300px", height: "auto", borderRadius: "5%"}}                    
      />
    </div>
  );
}

export default RocketDetails;
