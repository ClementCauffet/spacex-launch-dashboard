import axios from "axios";

const resolvers = {
  Query: {
    allLaunches: async () => {
      try {
        const response = await axios.get("https://api.spacexdata.com/v5/launches");
        const launches = response.data.map((launch) => ({
          name: launch.name,
          date_utc: launch.date_utc,
          success: launch.success,
          id: launch.id,
          links: launch.links,
        }));
        return launches;
      } catch (error) {
        throw new Error("Failed to fetch SpaceX launches.");
      }
    },
    singleLaunch: async (_, { id }) => {
      try {
        const response = await axios.get(`https://api.spacexdata.com/v5/launches/${id}`);
        const launch = response.data;
        const launchDetails = {
          name: launch.name,
          date_utc: launch.date_utc,
          success: launch.success,
          details: launch.details,
          rocket: launch.rocket,
          links: launch.links,
          crew: launch.crew,
        };
        return launchDetails;
      } catch (error) {
        throw new Error(`Failed to fetch SpaceX launch details for ID: ${id}`);
      }
    },
  },
};

export default resolvers;
