import React from "react";
import { useQuery } from "@apollo/client";
import { gql } from "graphql-tag";

interface PayloadData {
  payloadDetails: {
    name: string;
    type: string;
    manufacturers: [string];
    mass_kg: string;
  };
}

const GET_PAYLOAD_DETAILS = gql`
  query GetPayloadDetails($payload: String!) {
    payloadDetails(id: $payload) {
      name
      type
      manufacturers
      mass_kg
    }
  }
`;

interface PayloadDetailsProps {
    payload: string | undefined;
}

function PayloadDetails({ payload }: PayloadDetailsProps) {
  const { loading, error, data } = useQuery<PayloadData>(GET_PAYLOAD_DETAILS, {
    variables: { payload },
  });

  if (loading) return <p>Loading Launchpad Details...</p>;
  if (error) return <p>Error: {error.message}</p>;

  console.log(data);

  const payloadInfo = data?.payloadDetails;

  return (
    <div>
      <p><strong>Name: </strong>{payloadInfo?.name}</p>
      <p><strong>Type: </strong>{payloadInfo?.type}</p>
      <p><strong>Manufacturers: </strong>{payloadInfo?.manufacturers}</p>
      <p><strong>Mass_kg: </strong>{payloadInfo?.mass_kg}</p>
    </div>
  );
}

export default PayloadDetails;
