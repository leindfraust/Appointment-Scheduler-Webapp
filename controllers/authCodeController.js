const authenticationCode = require('../models/authenticationCodes');

const getCode = (async (req, res) => {
    try {
        const authenticationCodeList = await authenticationCode.find()
        if (!authenticationCodeList) throw new Error('no items')
        res.status(200).send(authenticationCodeList)
    } catch (error) {
        res.status(500).send({
            message: error.message
        })
    }
});

const pushCode = (async (req, res) => {
    const newAuthenticationCode = new authenticationCode(req.body)
    try {
        const authenticationCodeList = await newAuthenticationCode.save()
        if (!authenticationCodeList) throw new Error('Cannot save')
        res.status(200).send(authenticationCodeList)
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
    getCode,
    pushCode,
    updateCode,
    deleteCode
}