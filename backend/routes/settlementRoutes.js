const express = require('express');
const router = express.Router();
const supabase = require('../supabase');



router.post('/', async (req, res) => {

    const { from_member, to_member, amount, group_id, created_by } = req.body

    const { data, error } = await supabase
        .from('settlements')
        .insert([{
            from_member,
            to_member,
            amount,
            group_id,
            created_by,
            status: 'pending'
        }])
        .select()

    if (error) return res.status(500).json({ error: error.message })

    res.json({
        message: "Payment recorded (pending approval)",
        settlement: data[0]
    })
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

//put - approve settlement
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

    res.json({
        message: "Settlement approved",
        settlement: data[0]
    })
});

//put - reject settlement
router.put('/:id/reject', async (req, res) => {

    const { id } = req.params

    const { data, error } = await supabase
        .from('settlements')
        .update({ status: 'rejected' })
        .eq('id', id)
        .select()

    if (error) return res.status(500).json({ error: error.message })

    res.json({
        message: "Settlement rejected",
        settlement: data[0]
    })
});


module.exports = router;
