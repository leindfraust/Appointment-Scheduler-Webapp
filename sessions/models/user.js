const express = require('express');
const router = express.Router();

router.get('/',(req, res) => {
    res.send(req.session)
});

router.post('/', (req, res) => {
    req.session._id = req.body._id
    req.session.fullname = req.body.fullname
    req.session.username = req.body.username
    req.session.password = req.body.password
    req.session.province = req.body.province
    req.session.city = req.body.city
    req.session.save((err) => {
        if (err) {
            return next(err);
        }
    });
    res.status(200).send('OK');
});

router.put('/', (req, res) => {
    req.session.alias = req.body.alias || req.session.alias
    req.session.fullname = req.body.fullname || req.session.fullname
    req.session.username = req.body.username || req.session.username
    req.session.password = req.body.password || req.session.password
    req.session.province = req.body.province || req.session.province
    req.session.city = req.body.city         || req.session.city
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