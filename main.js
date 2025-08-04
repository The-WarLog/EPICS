const server=require('./app.js')
const port=3000
server.listen(port,()=>{
   console.log(`Server listening at the port ${port}  localhost:${port}`)
    
})