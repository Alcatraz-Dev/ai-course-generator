
/** @type { import("drizzle-kit").Config } */
const DB_CONNECTION_STRING = process?.env?.NEXT_PUBLIC_DB_CONNECTION_STRING;
export default {
  schema: "./configs/schema.jsx",
  dialect: 'postgresql',
  dbCredentials: {
    url: `${DB_CONNECTION_STRING}`
  }

};
