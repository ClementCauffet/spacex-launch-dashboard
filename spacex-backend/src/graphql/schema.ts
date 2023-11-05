import { gql } from "apollo-server-express";


const typeDefs = gql`

  type LaunchDetails {
    name: String
    date_utc: String
    success: Boolean
    details: String
    rocket: String
    links: LaunchLinks
    crew: [CrewMember]
    launchpad: String
    payloads: [String]
  }

  type LaunchLinks {
    webcast: String
  }

  type CrewMember {
    crew: String
    role: String
  }

  type SmallPatch {
    small: String
  }

  type Patch {
    patch: SmallPatch
  }

  type Launch {
    name: String
    date_utc: String
    success: Boolean
    id: String
    links: Patch
  }

  type LaunchpadDetails {
    full_name: String
    region: String
    latitude: String
    longitude: String
    launch_attempts: String
    launch_successes: String
  }

  type RocketDetails {
    name: String
    type: String
    first_flight: String
    img: String
  }

  type CrewDetails {
    name: String
    agency: String
    image: String
  }

  type PayloadDetails {
    name: String
    type: String
    manufacturers: [String]
    mass_kg: String
  }

  type Query {
    allLaunches: [Launch]
    singleLaunch(id: String!): LaunchDetails
    launchpadDetails(id: String!): LaunchpadDetails
    rocketDetails(id: String!): RocketDetails
    crewDetails(id: String!): CrewDetails
    payloadDetails(id: String!): PayloadDetails
  }
`;

export default typeDefs;
