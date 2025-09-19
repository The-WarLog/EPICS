import server from './app.js'
import dotenv from 'dotenv'
dotenv.config()
import ConnectDB from './database/DBconnection.js'
const port=process.env.PORT || 3000
server.listen(port,()=>{
    ConnectDB().then(r => {
        console.log(`Server running at http://localhost:${port}`);
    }).catch(error => {
        console.error(`Error connecting to MongoDB: ${error}`);
        process.exit(1);
    });
})