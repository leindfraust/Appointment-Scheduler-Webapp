const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    req.session.reload((err) => {
        if (err) console.log(err)
        res.status(200).send(req.session)
    });
});

router.post('/', (req, res) => {
    req.session.verified = req.body.verified
    req.session._id = req.body._id
    req.session.alias = req.body.alias
    req.session.licenseNo = req.body.licenseNo
    req.session.fullname = req.body.fullname
    req.session.schedule = req.body.schedule
    req.session.specialist = req.body.specialist
    req.session.gmail = req.body.gmail
    req.session.hospitalOrigin = req.body.hospitalOrigin
    req.session.username = req.body.username
    req.session.messageHistory = req.body.messageHistory
    req.session.save((err) => {
        if (err) {
            console.log(err);
        }
    });
    res.status(200).send('OK');
});

router.put('/', (req, res) => {
    req.session.verified = req.body.verified || req.session.verified
    req.session.alias = req.body.alias || req.session.alias
    req.session.licenseNo = req.body.licenseNo || req.session.licenseNo
    req.session.fullname = req.body.fullname || req.session.fullname
    req.session.schedule = req.body.schedule || req.session.schedule
    req.session.specialist = req.body.specialist || req.session.specialist
    req.session.gmail = req.body.gmail || req.session.gmail
    req.session.hospitalOrigin = req.body.hospitalOrigin || req.session.hospitalOrigin
    req.session.username = req.body.username || req.session.username
    req.session.messageHistory = req.body.messageHistory || req.session.messageHistory
    req.session.save((err) => {
        if (err) {
            console.log(err);
        }
    });
    res.status(200).send('OK');
})
router.delete('/', (req, res) => {
    req.session.destroy()
    res.end()
});
module.exports = router;