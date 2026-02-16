const express = require('express')
const router = express.Router()
const supabase = require('../supabase')

router.post('/', async (req, res) => {
    const { title, group_id } = req.body

    const { data, error } = await supabase
        .from('events')
        .insert([{ title, group_id }])
        .select()

    if (error) return res.status(500).json({ error: error.message })

    res.json(data[0])
})

module.exports = router
