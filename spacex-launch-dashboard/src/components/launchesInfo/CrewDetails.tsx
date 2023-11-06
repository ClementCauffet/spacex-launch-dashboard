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
      <p><strong>Name: </strong>{crewInfo?.name}</p>
      <p><strong>Agency: </strong>{crewInfo?.agency}</p>
      <img
        src={crewInfo?.image}
        alt="RocketImg"
        style={{width: "300px", height: "auto", borderRadius: "5%"}}                    
      />
    </div>
  );
}

export default CrewDetails;
