import { AuthenticationCode } from '../models/authenticationCodes.js';

const verifySuperUser = (async (req, res) => {
    const { SuperUser } = await import('../models/superuser.js')
    try {
        const authSuperuser = await SuperUser.findOne({
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

//for forgot password
const verifyEmail = (async (req, res) => {
    try {
        const email = await AuthenticationCode.findOne({
            email: req.body.email
        });
        if (!email) {
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
        const authCode = await AuthenticationCode.findOne({
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
    const newAuthenticationCode = new AuthenticationCode(req.body)
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
        const response = await AuthenticationCode.findByIdAndUpdate(id, req.body)
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
        const removed = await AuthenticationCode.findByIdAndDelete(id)
        if (!removed) throw new Error('something went wrong, try again later')
        res.status(200).send(removed)
    } catch (err) {
        res.status(500).send({
            message: err.message
        })
    }
});

export {
    verifySuperUser,
    verifyEmail,
    verifyCode,
    pushCode,
    updateCode,
    deleteCode
}