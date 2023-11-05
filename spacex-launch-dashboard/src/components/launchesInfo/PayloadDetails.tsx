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
      <h2>Payload Details</h2>
      <p>Name: {payloadInfo?.name}</p>
      <p>Type: {payloadInfo?.type}</p>
      <p>Manufacturers: {payloadInfo?.manufacturers}</p>
      <p>Mass_kg: {payloadInfo?.mass_kg}</p>
    </div>
  );
}

export default PayloadDetails;
