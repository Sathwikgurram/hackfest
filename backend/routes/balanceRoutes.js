const express = require('express')
const router = express.Router()
const { calculateBalances } = require('../services/balanceService')

router.get('/', async (req, res) => {
    const { event_id } = req.query
    const result = await calculateBalances(event_id)
    res.json(result)
})

module.exports = router
