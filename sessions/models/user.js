const express = require('express');
const router = express.Router();
const app = express()
const parser = app.use(express.json())

router.get('/', (req, res) => {
    res.send(req.session)
});

router.post('/', parser, (req, res) => {
    req.session._id = req.body._id
    req.session.name = req.body.name
    req.session.email = req.body.email
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

router.put('/', parser, (req, res) => {
    req.session.alias = req.body.alias || req.session.alias
    req.session.name = req.body.name || req.session.name
    req.session.email = req.body.email || req.session.email
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