import express from 'express'
const router = express.Router();

router.get('/', (req, res) => {
    req.session.reload(() => {
        res.status(200).send(req.session)
    });
});

router.post('/', (req, res) => {
    req.session._id = req.body._id
    req.session.registrationCode = req.body.registrationCode
    req.session.hospital = req.body.hospital
    req.session.save((err) => {
        if (err) {
            console.log(err);
        }
    });
    res.status(200).send('OK');
});

router.put('/', (req, res) => {
    req.session.hospital = req.body.hospital || req.session.hospital
    req.session.registrationCode = req.body.registrationCode || req.session.registrationCode
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

export default router;