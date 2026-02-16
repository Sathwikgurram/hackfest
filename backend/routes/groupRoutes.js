const express = require('express')
const router = express.Router()
const supabase = require('../supabase');

router.post('/', async (req, res) => {
    const { name, created_by } = req.body

    const { data, error } = await supabase
        .from('groups')
        .insert([{ name, created_by }])
        .select()

    if (error) return res.status(500).json({ error: error.message })

    res.json(data[0])
});

//get all groups 
router.get('/', async (req, res) => {

    const { data, error } = await supabase
        .from('groups')
        .select('*')

    if (error) return res.status(500).json({ error: error.message })

    res.json(data)
});

//get group by id
router.get('/:id', async (req, res) => {

    const { id } = req.params

    const { data, error } = await supabase
        .from('groups')
        .select('*')
        .eq('id', id)
        .single()

    if (error) return res.status(500).json({ error: error.message })

    res.json(data)
});

//update group
router.put('/:id', async (req, res) => {

    const { id } = req.params
    const { name } = req.body

    const { data, error } = await supabase
        .from('groups')
        .update({ name })
        .eq('id', id)
        .select()

    if (error) return res.status(500).json({ error: error.message })

    res.json(data[0])
});

//delete group
router.delete('/:id', async (req, res) => {

    const { id } = req.params

    const { error } = await supabase
        .from('groups')
        .delete()
        .eq('id', id)

    if (error) return res.status(500).json({ error: error.message })

    res.json({ message: "Group deleted successfully" })
});









module.exports = router
