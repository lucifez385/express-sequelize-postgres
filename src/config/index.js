export const urlPrefix = process.env.URL_PREFIX
export const appEnv = process.env.APP_ENV
export const nodePort = process.env.NODE_PORT

export const database = {
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  host: process.env.DB_HOSTNAME,
  port: process.env.DB_PORT,
}