import mongoose from "mongoose"
import sql from 'mssql'


const dbConnect = async () => {
    if(mongoose.connection.readyState >= 1){
        return;
    }
    mongoose.connect(process.env.DB_URI);
}

//export default dbConnect;


const dbConfig = {
    user: 'SpeedyEXT',
    password: 'SpeedyRR&%',
    server: 'tbiztalk-sql',
    database: 'Speedy_Website',
    options: {
      encrypt: true, // Use this if you're on Windows Azure
      trustServerCertificate: true, // Use this if you're on Windows Azure
    },
  };

  export default async function ExcuteQueryFromMSSQL(query, options) {
    try {
        let conn = await sql.connect(dbConfig);
        let result = await conn.request().query(query);
        return {Email: result.recordsets[0][0].Email, Password:result.recordsets[0][0].Password ,Token:result.recordsets[0][0].Token, Name : result.recordsets[0][0].FirstName + ' ' + result.recordsets[0][0].LastName } ;
    }
    catch (error) {
        console.log(error);
    }
}

export const connectMSSQLDB = async () => {
    try {
      await sql.connect(dbConfig);
      console.log('Connected to MSSQL');
    } catch (error) {
      console.error('Error connecting to MSSQL:', error);
    }
  };

