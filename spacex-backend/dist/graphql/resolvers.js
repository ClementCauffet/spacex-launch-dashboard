"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
const resolvers = {
    Query: {
        allLaunches: async () => {
            try {
                const response = await axios_1.default.get("https://api.spacexdata.com/v5/launches");
                const launches = response.data.map((launch) => ({
                    name: launch.name,
                    date_utc: launch.date_utc,
                    success: launch.success,
                    id: launch.id,
                    links: launch.links,
                }));
                return launches;
            }
            catch (error) {
                throw new Error("Failed to fetch SpaceX launches.");
            }
        },
        singleLaunch: async (_, { id }) => {
            try {
                const response = await axios_1.default.get(`https://api.spacexdata.com/v5/launches/${id}`);
                const launch = response.data;
                const launchDetails = {
                    name: launch.name,
                    date_utc: launch.date_utc,
                    success: launch.success,
                    details: launch.details,
                    rocket: launch.rocket,
                    links: launch.links,
                    crew: launch.crew,
                    launchpad: launch.launchpad,
                    payloads: launch.payloads,
                };
                return launchDetails;
            }
            catch (error) {
                throw new Error(`Failed to fetch SpaceX launch details for ID: ${id}`);
            }
        },
        launchpadDetails: async (_, { id }) => {
            try {
                const response = await axios_1.default.get(`https://api.spacexdata.com/v4/launchpads/${id}`);
                const launchpad = response.data;
                const launchpadDetails = {
                    full_name: launchpad.full_name,
                    region: launchpad.region,
                    latitude: launchpad.latitude,
                    longitude: launchpad.longitude,
                    launch_attempts: launchpad.launch_attempts,
                    launch_successes: launchpad.launch_successes,
                };
                return launchpadDetails;
            }
            catch (error) {
                throw new Error(`Failed to fetch SpaceX launch details for ID: ${id}`);
            }
        },
        rocketDetails: async (_, { id }) => {
            try {
                const response = await axios_1.default.get(`https://api.spacexdata.com/v4/rockets/${id}`);
                const rocket = response.data;
                const rocketDetails = {
                    name: rocket.name,
                    type: rocket.type,
                    first_flight: rocket.first_flight,
                    img: rocket.flickr_images[0],
                };
                return rocketDetails;
            }
            catch (error) {
                throw new Error(`Failed to fetch SpaceX rocket details for ID: ${id}`);
            }
        },
        crewDetails: async (_, { id }) => {
            try {
                const response = await axios_1.default.get(`https://api.spacexdata.com/v4/crew/${id}`);
                const crew = response.data;
                const crewDetails = {
                    name: crew.name,
                    agency: crew.agency,
                    image: crew.image,
                };
                return crewDetails;
            }
            catch (error) {
                throw new Error(`Failed to fetch SpaceX crew details for ID: ${id}`);
            }
        },
        payloadDetails: async (_, { id }) => {
            try {
                const response = await axios_1.default.get(`https://api.spacexdata.com/v4/payloads/${id}`);
                const payload = response.data;
                const payloadDetails = {
                    name: payload.name,
                    type: payload.type,
                    manufacturers: payload.manufacturers,
                    mass_kg: payload.mass_kg,
                };
                return payloadDetails;
            }
            catch (error) {
                throw new Error(`Failed to fetch SpaceX payload details for ID: ${id}`);
            }
        },
    },
};
exports.default = resolvers;
