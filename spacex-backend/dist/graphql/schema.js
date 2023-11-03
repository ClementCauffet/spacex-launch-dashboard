"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const apollo_server_express_1 = require("apollo-server-express");
const typeDefs = (0, apollo_server_express_1.gql) `

type LaunchDetails {
  name: String
  date_utc: String
  success: Boolean
  details: String
  rocket: String
  links: LaunchLinks
  crew: [CrewMember]
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

  type Query {
    allLaunches: [Launch]
    singleLaunch(id: String!): LaunchDetails
  }
`;
exports.default = typeDefs;
