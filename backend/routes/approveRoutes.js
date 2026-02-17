const express = require('express');
const router = express.Router();
const supabase = require('../supabase');

router.put('/:id/approve', async (req, res) => {

    const { id } = req.params
    const { approved_by } = req.body

    const { data, error } = await supabase
        .from('settlements')
        .update({
            status: 'approved',
            approved_by,
            approved_at: new Date()
        })
        .eq('id', id)
        .select()

    if (error) return res.status(500).json({ error: error.message })

    res.json({ message: "Settlement approved", settlement: data[0] })
});


router.put('/:id/reject', async (req, res) => {

    const { id } = req.params

    const { error } = await supabase
        .from('settlements')
        .update({ status: 'rejected' })
        .eq('id', id)

    if (error) return res.status(500).json({ error: error.message })

    res.json({ message: "Settlement rejected" })
});


module.exports = router;