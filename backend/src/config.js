import dotenv from "dotenv";

//Ejecutar la libreria dotenv
// para acceder al archivo .env
dotenv.config();

export const config = {
  db: {
    URI: process.env.DB_URI,
  },
  server: {
    port: process.env.PORT,
  },
};
