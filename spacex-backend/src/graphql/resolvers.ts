import axios from "axios";

const resolvers = {
  Query: {
    allLaunches: async () => {
      try {
        const response = await axios.get("https://api.spacexdata.com/v5/launches");
        const launches = response.data.map((launch: any) => ({
          name: launch.name,
          date_utc: launch.date_utc,
          success: launch.success,
        }));
        return launches;
      } catch (error) {
        throw new Error("Failed to fetch SpaceX launches.");
      }
    },
  },
};

export default resolvers;
