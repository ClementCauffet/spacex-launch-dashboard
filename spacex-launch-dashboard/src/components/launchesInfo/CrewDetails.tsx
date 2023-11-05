import React from "react";
import { useQuery } from "@apollo/client";
import { gql } from "graphql-tag";

interface CrewData {
  crewDetails: {
    name: string;
    agency: string;
    image: string;
  };
}

const GET_CREW_DETAILS = gql`
  query GetCrewDetails($crew: String!) {
    crewDetails(id: $crew) {
      name
      agency
      image
    }
  }
`;

interface CrewDetailsProps {
  crew: string | undefined;
}

function CrewDetails({ crew }: CrewDetailsProps) {
  const { loading, error, data } = useQuery<CrewData>(GET_CREW_DETAILS, {
    variables: { crew },
  });

  if (loading) return <p>Loading Crew Details...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const crewInfo = data?.crewDetails;

  return (
    <div>
      <h2>Crew Details</h2>
      <p>Name: {crewInfo?.name}</p>
      <p>Agency: {crewInfo?.agency}</p>
      <p>Image: {crewInfo?.image}</p>
    </div>
  );
}

export default CrewDetails;
