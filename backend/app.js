const express=require('express');
const cors=require('cors');
const app=express();
const port=process.env.PORT || 8000;
require('dotenv').config();
const supabase = require("./supabase.js");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}));



app.post('/group',async(req,res)=>{
    const {name,created_by}=req.body;
    const {data,error}=await supabase.from('groups').insert([{name,created_by}]);
    if(error){
        res.status(500).json({error:error.message});
    }else{
        res.status(200).json({message:'Group created successfully',group:data[0]});
    }
}); 
app.listen(port,()=>{
    console.log(`Server is running on port ${port}`);
});

