import { gql } from "apollo-server-express";

const typeDefs = gql`
  type Launch {
    name: String
    date_utc: String
    success: Boolean
  }

  type Query {
    allLaunches: [Launch]
  }
`;

export default typeDefs;
