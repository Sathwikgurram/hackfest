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
});

//get all events of a group
router.get('/group/:group_id', async (req, res) => {
    const { group_id } = req.params

    const { data, error } = await supabase
        .from('events')
        .select('*')
        .eq('group_id', group_id)

    if (error) return res.status(500).json({ error: error.message })

    res.json(data)
});

//get event by id
router.get('/:id', async (req, res) => {
    const { id } = req.params

    const { data, error } = await supabase
        .from('events')
        .select('*')
        .eq('id', id)
        .single()

    if (error) return res.status(500).json({ error: error.message })

    res.json(data)
});

//update event
router.put('/:id', async (req, res) => {
    const { id } = req.params
    const { title } = req.body

    const { data, error } = await supabase
        .from('events')
        .update({ title })
        .eq('id', id)
        .select()

    if (error) return res.status(500).json({ error: error.message })

    res.json(data[0])
});

//delete event
router.delete('/:id', async (req, res) => {
    const { id } = req.params

    const { error } = await supabase
        .from('events')
        .delete()
        .eq('id', id)

    if (error) return res.status(500).json({ error: error.message })

    res.json({ message: "Event deleted successfully" })
});







module.exports = router
