import { gql } from "apollo-server-express";


const typeDefs = gql`

type LaunchDetails {
  name: String
  date_utc: String
  success: Boolean
  details: String
  rocket: Rocket
  links: LaunchLinks
  crew: [CrewMember]
  ships: [Ship]
}

type Rocket {
  name: String
}

type LaunchLinks {
  webcast: String
  youtube_id: String
  reddit_campaign: String
}

type CrewMember {
  name: String
  agency: String
}

type Ship {
  name: String
  type: String
}

  type Launch {
    name: String
    date_utc: String
    success: Boolean
    id: String
  }

  type Query {
    allLaunches: [Launch]
    singleLaunch(id: String!): LaunchDetails
  }
`;

export default typeDefs;
