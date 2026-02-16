const express = require('express')
const router = express.Router()
const supabase = require('../supabase')

router.post('/', async (req, res) => {
    const { amount, paid_by, event_id, participants } = req.body

    const { data, error } = await supabase
        .from('expenses')
        .insert([{ amount, paid_by, event_id }])
        .select()

    if (error) return res.status(500).json({ error: error.message })

    const expenseId = data[0].id

    const participantRows = participants.map(member_id => ({
        expense_id: expenseId,
        member_id
    }))

    await supabase
        .from('expense_participants')
        .insert(participantRows)

    res.json({ message: "Expense added" })
})

module.exports = router
