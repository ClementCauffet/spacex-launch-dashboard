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
                }));
                return launches;
            }
            catch (error) {
                throw new Error("Failed to fetch SpaceX launches.");
            }
        },
    },
};
exports.default = resolvers;
