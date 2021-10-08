const express = require('express');
const router = express.Router();
const Admin = require('../../model/adminList');

router.get('/', async (req, res) => {
    try {
        const adminList = await Admin.find()
        if (!adminList) throw new Error('no items')
        res.status(200).json(adminList)
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
});

router.post('/', async (req, res) => {
    const newAdmin = new Admin(req.body)
    try {
        const adminList = await newAdmin.save()
        if (!adminList) throw new Error('Cannot save')
        res.status(200).json(adminList)
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
        const response = await Admin.findByIdAndUpdate(id, req.body)
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
        const removed = await Admin.findByIdAndDelete(id)

        if (!removed) throw new Error('something went wrong, try again later')
        res.status(200).json(removed)
    } catch (err) {
        res.status(500).json({
            message: err.message
        })
    }
});

module.exports = router;