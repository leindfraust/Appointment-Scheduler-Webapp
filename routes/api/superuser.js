const express = require('express');
const router = express.Router();
const Superuser = require('../../models/superuser');

router.get('/', async (req, res) => {
    try {
        const SuperuserList = await Superuser.find()
        if (!SuperuserList) throw new Error('no items')
        res.status(200).json(SuperuserList)
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
});

router.post('/', async (req, res) => {
    const newSuperuser = new Superuser(req.body)
    try {
        const SuperuserList = await newSuperuser.save()
        if (!SuperuserList) throw new Error('Cannot save')
        res.status(200).json(SuperuserList)
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
        const response = await Superuser.findByIdAndUpdate(id, req.body)
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
        const removed = await Superuser.findByIdAndDelete(id)
        if (!removed) throw new Error('something went wrong, try again later')
        res.status(200).json(removed)
    } catch (err) {
        res.status(500).json({
            message: err.message
        })
    }
});

module.exports = router;