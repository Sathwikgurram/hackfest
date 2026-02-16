const express = require('express');
const router = express.Router();
const supabase = require('../supabase');

router.post('/', async (req, res) => {
    const { name, email, group_id } = req.body

    const { data, error } = await supabase
        .from('members')
        .insert([{ name,group_id, email }])
        .select()

    if (error) return res.status(500).json({ error: error.message })

    res.json(data[0])
});

//get all members of a group
router.get('/group/:group_id', async (req, res) => {
    const { group_id } = req.params

    const { data, error } = await supabase
        .from('members')
        .select('*')
        .eq('group_id', group_id)

    if (error) return res.status(500).json({ error: error.message })

    res.json(data)
});

//get member by id
router.get('/:id', async (req, res) => {
    const { id } = req.params

    const { data, error } = await supabase
        .from('members')
        .select('*')
        .eq('id', id)
        .single()

    if (error) return res.status(500).json({ error: error.message })

    res.json(data)
});

//update member
router.put('/:id', async (req, res) => {
    const { id } = req.params
    const { name, email } = req.body

    const { data, error } = await supabase
        .from('members')
        .update({ name, email })
        .eq('id', id)
        .select()

    if (error) return res.status(500).json({ error: error.message })

    res.json(data[0])
});

//delete member
router.delete('/:id', async (req, res) => {
    const { id } = req.params

    const { error } = await supabase
        .from('members')
        .delete()
        .eq('id', id)

    if (error) return res.status(500).json({ error: error.message })

    res.json({ message: "Member deleted successfully" })
});








module.exports = router;
