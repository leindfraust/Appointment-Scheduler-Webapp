const express = require('express');
const router = express.Router();

router.get('/',(req, res) => {
    res.send(req.session)
});

router.post('/', (req, res) => {
    req.session.alias = req.body.alias
    req.session.username = req.body.username
    req.session.password = req.body.password
    res.end()
});

router.delete('/', (req, res) => {
    req.session.destroy()
    res.end()
});
module.exports = router;