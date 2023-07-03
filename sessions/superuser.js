import express from 'express'
const router = express.Router();

router.get('/', (req, res) => {
    req.session.reload(() => {
        res.status(200).send(req.session)
    });
});

router.post('/', (req, res) => {
    req.session.superuser = req.body.superuser
    req.session.save((err) => {
        if (err) {
            console.log(err);
        }
    });
    res.status(200).send('OK');
});

router.delete('/', (req, res) => {
    req.session.destroy()
    res.end()
});
export default router;