const express = require('express')
const router = express.Router()
const { calculateGroupBalances } = require('../services/balanceService.js')

router.get('/group/:group_id', async (req, res) => {

    const { group_id } = req.params

    const result = await calculateGroupBalances(group_id)

    res.json(result)
})

module.exports = router
