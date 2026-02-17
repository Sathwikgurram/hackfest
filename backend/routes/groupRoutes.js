const express = require('express')
const router = express.Router()
const supabase = require('../supabase');

router.post('/', async (req, res) => {

    const { name } = req.body

    const { data, error } = await supabase
        .from('groups')
        .insert([{ name }])
        .select()

    if (error) return res.status(500).json({ error: error.message })

    res.json(data[0])
});


router.put('/:group_id/creator', async (req, res) => {

    const { group_id } = req.params
    const { member_id } = req.body

    const { data, error } = await supabase
        .from('groups')
        .update({ created_by: member_id })
        .eq('id', group_id)
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
