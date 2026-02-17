const express=require('express');
const cors=require('cors');
const app=express();
require('dotenv').config();
const supabase=require('./supabase.js');

const groupRoutes = require('./routes/groupRoutes');
const memberRoutes = require('./routes/memberRoutes');
const eventRoutes = require('./routes/eventRoutes');
const expenseRoutes = require('./routes/expenseRoutes');
const balanceRoutes = require('./routes/balanceRoutes');
const settlementRoutes = require('./routes/settlementRoutes');
const approveRoutes = require('./routes/approveRoutes');

const port=process.env.PORT ;
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use('/group', groupRoutes);
app.use('/member', memberRoutes);
app.use('/event', eventRoutes);
app.use('/expense', expenseRoutes);
app.use('/balance', balanceRoutes);
app.use('/settlement', settlementRoutes);
app.use('/approve', approveRoutes);


app.listen(port,()=>{
    console.log(`Server is running on port ${port}`);
});

