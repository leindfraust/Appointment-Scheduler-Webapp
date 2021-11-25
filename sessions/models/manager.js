const express = require('express');
const router = express.Router();

router.get('/',(req, res) => {
    res.send(req.session)
});

router.post('/', (req, res) => {
    req.session._id = req.body._id
    req.session.hospital = req.body.hospital
    req.session.username = req.body.username
    req.session.password = req.body.password
    req.session.save((err) => {
        if (err) {
            return next(err);
        }
    });
    res.status(200).send('OK');
});

router.put('/', (req, res) => {
    req.session.hospital = req.body.hospital || req.session.hospital
    req.session.save((err) => {
        if (err) {
            return next(err);
        }
    });
    res.status(200).send('OK');
})
router.delete('/', (req, res) => {
    req.session.destroy()
    res.end()
});
module.exports = router;