const express=require('express');
const aiRoutes=require('./routes/ai.routes.js');
const cors=require('cors');
const app=express();

// Log incoming HTTP requests before they reach route handlers.
// app.use((req, res, next) => {
//     console.log(`Incoming request: ${req.method} ${req.originalUrl}`);
//     next();
// });

app.use(cors());

app.use(express.json());

//test route
app.get('/',(req,res)=>{
    res.send("Hello World");
})

app.use('/ai',aiRoutes);
module.exports=app;
