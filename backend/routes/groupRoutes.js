const express = require('express')
const router = express.Router()
const supabase = require('../supabase')

router.post('/', async (req, res) => {
    const { name, created_by } = req.body

    const { data, error } = await supabase
        .from('groups')
        .insert([{ name, created_by }])
        .select()

    if (error) return res.status(500).json({ error: error.message })

    res.json(data[0])
})

module.exports = router
