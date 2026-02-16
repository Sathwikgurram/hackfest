const express = require('express');
const router = express.Router();
const supabase = require('../supabase');

router.post('/', async (req, res) => {
    const { name, group_id } = req.body;

    const { data, error } = await supabase
        .from('members')
        .insert([{ name, group_id }])
        .select()

    if (error) return res.status(500).json({ error: error.message })

    res.json(data[0])
})

module.exports = router;
