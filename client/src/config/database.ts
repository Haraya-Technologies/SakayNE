const MONGODB_URI = process.env.EXPO_PUBLIC_MONGODB_URI as string;
const DB_NAME = process.env.EXPO_PUBLIC_DB_NAME || 'SakayNE';

export const databaseConfig = {
  uri: MONGODB_URI,
  dbName: DB_NAME,
  collections: {
    users: 'users',
    drivers: 'drivers',
    rides: 'rides',
  },
};
