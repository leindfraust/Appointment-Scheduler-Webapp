const authenticationCode = require('../models/authenticationCodes');
const superuser = require('../models/superuser')

const verifySuperUser = (async (req, res) => {
    try {
        const authSuperuser = await superuser.findOne({
            gmail: req.body.email
        });
        if (!authSuperuser) {
            res.status(200).send(false)
        } else {
            res.status(200).send(true)
        }
    } catch (error) {
        res.status(500).send({
            message: error.message
        })
    }
});

const verifyCode = (async (req, res) => {
    try {
        const authCode = await authenticationCode.findOne({
            code: req.body.code
        });
        if (!authCode) {
            res.status(200).send(false)
        } else {
            res.status(200).send(true)
        }
    } catch (error) {
        res.status(500).send({
            message: error.message
        })
    }
});

const pushCode = (async (req, res) => {
    const newAuthenticationCode = new authenticationCode(req.body)
    try {
        const authCode = await newAuthenticationCode.save()
        if (!authCode) throw new Error('Cannot save')
        res.status(200).send(authCode)
    } catch (err) {
        res.status(500).send({
            message: err.message
        })
    }
});

const updateCode = (async (req, res) => {
    const {
        id
    } = req.params
    try {
        const response = await authenticationCode.findByIdAndUpdate(id, req.body)
        if (!response) throw new Error('cannot update')
        const updated = {
            ...response._doc,
            ...req.body
        }
        res.status(200).send(updated)
    } catch (err) {
        res.status(500).send({
            message: err.message
        })
    }
});

const deleteCode = (async (req, res) => {
    const {
        id
    } = req.params
    try {
        const removed = await authenticationCode.findByIdAndDelete(id)
        if (!removed) throw new Error('something went wrong, try again later')
        res.status(200).send(removed)
    } catch (err) {
        res.status(500).send({
            message: err.message
        })
    }
});

module.exports = {
    verifySuperUser,
    verifyCode,
    pushCode,
    updateCode,
    deleteCode
}