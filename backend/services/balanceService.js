const supabase = require('../supabase')

// const supabase = require('../supabase')

async function calculateGroupBalances(group_id) {

    // Get events
    const { data: events } = await supabase
        .from('events')
        .select('id')
        .eq('group_id', group_id)

    const eventIds = events.map(e => e.id)

    // Get expenses
    const { data: expenses } = await supabase
        .from('expenses')
        .select(`
            id,
            amount,
            paid_by,
            expense_participants(member_id, share_amount)
        `)
        .in('event_id', eventIds)

    const balances = {}

    // Expense logic
    for (let exp of expenses) {

        const paidBy = exp.paid_by

        if (!balances[paidBy]) balances[paidBy] = 0
        balances[paidBy] += Number(exp.amount)

        for (let p of exp.expense_participants) {

            const member = p.member_id
            const share = Number(p.share_amount)

            if (!balances[member]) balances[member] = 0
            balances[member] -= share
        }
    }

    // Settlement logic (direct settlement only)
    const { data: payments } = await supabase
        .from('settlements')
        .select('from_member, to_member, amount')
        .eq('group_id', group_id)

    for (let pay of payments) {

        const from = pay.from_member
        const to = pay.to_member
        const amount = Number(pay.amount)

        if (!balances[from]) balances[from] = 0
        if (!balances[to]) balances[to] = 0

        // settlement cancels debt
        balances[from] += amount
        balances[to] -= amount
    }

    return simplifyDebts(balances)
}



function simplifyDebts(balances) {

    const creditors = []
    const debtors = []

    for (let person in balances) {

        let value = parseFloat(balances[person].toFixed(2))

        if (value > 0)
            creditors.push({ person, amount: value })
        else if (value < 0)
            debtors.push({ person, amount: -value })
    }

    creditors.sort((a, b) => b.amount - a.amount)
    debtors.sort((a, b) => b.amount - a.amount)
    const settlements = []
    let i = 0, j = 0

    while (i < debtors.length && j < creditors.length) {

        let debit = debtors[i]
        let credit = creditors[j]

        let settleAmount = Math.min(debit.amount, credit.amount)

        settlements.push({
            from: debit.person,
            to: credit.person,
            amount: settleAmount
        })

        debit.amount -= settleAmount
        credit.amount -= settleAmount

        if (debit.amount === 0) i++
        if (credit.amount === 0) j++
    }

    return settlements
}

module.exports = { calculateGroupBalances };