const express = require('express');
const router = express.Router();
const supabase = require('../supabase');



router.post('/', async (req, res) => {

    const { from_member, to_member, amount } = req.body

    const { data, error } = await supabase
        .from('settlements')
        .insert([{ from_member, to_member, amount }])
        .select()

    if (error) return res.status(500).json({ error: error.message })

    res.json({ message: "Payment recorded", settlement: data[0] })
});


router.get('/group/:group_id', async (req, res) => {

    const { group_id } = req.params

    const { data, error } = await supabase
        .from('settlements')
        .select('*')
        .eq('group_id', group_id)

    if (error) return res.status(500).json({ error: error.message })

    res.json(data)
});


