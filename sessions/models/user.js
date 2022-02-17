const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.send(req.session)
});

router.post('/', (req, res) => {
    req.session._id = req.body._id
    req.session.firstName = req.body.firstName
    req.session.lastName = req.body.lastName
    req.session.username = req.body.username
    req.session.province = req.body.province
    req.session.city = req.body.city
    req.session.currentAddress = req.body.currentAddress
    req.session.save((err) => {
        if (err) {
            return next(err);
        }
    });
    res.status(200).send('OK');
});

router.put('/', (req, res) => {
    req.session.alias = req.body.alias || req.session.alias
    req.session.firstName = req.body.fullname || req.session.lastName
    req.session.lastName = req.body.lastName || req.session.lastName
    req.session.username = req.body.username || req.session.username
    req.session.province = req.body.province || req.session.province
    req.session.city = req.body.city || req.session.city
    req.session.currentAddress = req.body.currentAddress || req.session.currentAddress
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