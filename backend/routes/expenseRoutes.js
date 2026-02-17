const express = require('express')
const router = express.Router()
const supabase = require('../supabase')

router.post('/', async (req, res) => {

    const { amount, paid_by, event_id, participants } = req.body;

    const totalShare = participants.reduce((sum, p) => sum + p.share, 0)

    if (totalShare !== amount) {
        return res.status(400).json({
            error: "Invalid expense: total share must equal amount"
        })
    }


    const { data, error } = await supabase
        .from('expenses')
        .insert([{ amount, paid_by, event_id }])
        .select()

    if (error) return res.status(500).json({ error: error.message })

    const expenseId = data[0].id

    const participantRows = participants.map(p => ({
        expense_id: expenseId,
        member_id: p.member_id,
        share_amount: p.share
    }))

    const { error: pError } = await supabase
        .from('expense_participants')
        .insert(participantRows)

    if (pError) return res.status(500).json({ error: pError.message })

    res.json({ message: "Custom split expense added successfully" })
});

//get expense of an event by id
router.get('/event/:event_id', async (req, res) => {

    const { event_id } = req.params

    const { data, error } = await supabase
        .from('expenses')
        .select(`
            id,
            amount,
            paid_by,
            expense_participants(member_id, share_amount)
        `)
        .eq('event_id', event_id)

    if (error) return res.status(500).json({ error: error.message })

    res.json(data)
});

//update expense
router.put('/:id', async (req, res) => {

    const { id } = req.params
    const { amount, participants } = req.body

    const { data, error } = await supabase
        .from('expenses')
        .update({ amount })
        .eq('id', id)
        .select()

    if (error) return res.status(500).json({ error: error.message })

    await supabase
        .from('expense_participants')
        .delete()
        .eq('expense_id', id)

    const participantRows = participants.map(p => ({
        expense_id: id,
        member_id: p.member_id,
        share_amount: p.share
    }))

    const { error: pError } = await supabase
        .from('expense_participants')
        .insert(participantRows)

    if (pError) return res.status(500).json({ error: pError.message })

    res.json({ message: "Expense updated successfully" })
});

//delete expense
router.delete('/:id', async (req, res) => {

    const { id } = req.params

    await supabase
        .from('expense_participants')
        .delete()
        .eq('expense_id', id)

    const { error } = await supabase
        .from('expenses')
        .delete()
        .eq('id', id)

    if (error) return res.status(500).json({ error: error.message })

    res.json({ message: "Expense deleted successfully" })
});






module.exports = router
