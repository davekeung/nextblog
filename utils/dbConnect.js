import mongoose from "mongoose"
import sql from 'mssql'


const dbConnect = async () => {
    if(mongoose.connection.readyState >= 1){
        return;
    }
    mongoose.connect(process.env.DB_URI);
}

export default dbConnect;

const config = {
    user: 'test',
    password: '1000',
    server: '.\sqlexpress',
    database: 'DATABASE_NAME',
    port: 1433,
    options: {
        instancename: 'SQLEXPRESS',
        trustedconnection: true,
        trustServerCertificate: true
    },
}

export async function ExcuteQueryFromMSSQL(query, options) {
    try {
        let conn = await sql.connect(config);
        let result = await conn.request().query(query);
        return {data: result.recordsets, status:200};
    }
    catch (error) {
        console.log(error);
    }
}