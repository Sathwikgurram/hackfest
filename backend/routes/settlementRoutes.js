const express = require('express');
const router = express.Router();
const supabase = require('../supabase');


// Create settlement (direct, no approval)
router.post('/', async (req, res) => {

    console.log("Received settlement request:", req.body);
    const { from_member, to_member, amount, group_id } = req.body;

    const { data, error } = await supabase
        .from('settlements')
        .insert([{
            from_member,
            to_member,
            amount,
            group_id,
            
        }])
        .select();

    if (error) {
        return res.status(500).json({ error: error.message });
    }

    res.json({
        message: "Settlement recorded successfully",
        settlement: data[0]
    });

});


// Get all settlements of a group
router.get('/group/:group_id', async (req, res) => {

    const { group_id } = req.params;

    const { data, error } = await supabase
        .from('settlements')
        .select('*')
        .eq('group_id', group_id)
        .order('created_at', { ascending: false });

    if (error) {
        return res.status(500).json({ error: error.message });
    }

    res.json(data);

});


// Optional: Delete settlement (if mistake)
router.delete('/:id', async (req, res) => {

    const { id } = req.params;

    const { error } = await supabase
        .from('settlements')
        .delete()
        .eq('id', id);

    if (error) {
        return res.status(500).json({ error: error.message });
    }

    res.json({
        message: "Settlement deleted successfully"
    });

});


module.exports = router;