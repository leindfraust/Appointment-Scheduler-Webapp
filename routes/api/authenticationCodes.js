const express = require('express');
const router = express.Router();
const authenticationCode = require('../../model/authenticationCodes');

router.get('/', async (req, res) => {
    try {
        const authenticationCodeList = await authenticationCode.find()
        if (!authenticationCodeList) throw new Error('no items')
        res.status(200).json(authenticationCodeList)
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
});

router.post('/', async (req, res) => {
    const newAuthenticationCode = new authenticationCode(req.body)
    try {
        const authenticationCodeList = await newAuthenticationCode.save()
        if (!authenticationCodeList) throw new Error('Cannot save')
        res.status(200).json(authenticationCodeList)
    } catch (err) {
        res.status(500).json({
            message: err.message
        })
    }
});

router.put('/:id', async (req, res) => {
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
        res.status(200).json(updated)
    } catch (err) {
        res.status(500).json({
            message: err.message
        })
    }
});

router.delete('/:id', async (req, res) => {
    const {
        id
    } = req.params
    try {
        const removed = await authenticationCode.findByIdAndDelete(id)
        if (!removed) throw new Error('something went wrong, try again later')
        res.status(200).json(removed)
    } catch (err) {
        res.status(500).json({
            message: err.message
        })
    }
});

module.exports = router;