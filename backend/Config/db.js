import dotenv from 'dotenv';
import { Sequelize } from 'sequelize';
import { config } from 'dotenv';

config();

const sequelize = new Sequelize(
   process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        dialect: "postgres",
        logging: false
    }
);

const connection = async () => {
  try {
    await sequelize.authenticate();
    console.log('Connexion à la base de données réussie.');
  } catch (error) {
    console.error('Impossible de se connecter à la base de données :', error);
  }
};

export { sequelize, connection };