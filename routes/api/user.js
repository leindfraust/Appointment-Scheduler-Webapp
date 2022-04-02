const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const user = require('../../models/user');
const e = require('cors');

router.get('/', async (req, res) => {
    try {
        const userList = await user.find()
        if (!userList) throw new Error('no items')
        res.status(200).json(userList)
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
});

router.post('/', async (req, res) => {

    bcrypt.hash(req.body.password, 10, async(err, hash) => {
        if (err) {
            res.status(500).send(err)
        } else {
            req.body.password = hash
            const newuser = new user(req.body)
            try {
                const userList = await newuser.save()
                if (!userList) throw new Error('Cannot save')
                res.status(200).json(userList)
            } catch (err) {
                res.status(500).json({
                    message: err.message
                })
            }
        }
    })
});

router.put('/:id', async (req, res) => {
    const {
        id
    } = req.params
    try {
        const response = await user.findByIdAndUpdate(id, req.body)
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
        const removed = await user.findByIdAndDelete(id)

        if (!removed) throw new Error('something went wrong, try again later')
        res.status(200).json(removed)
    } catch (err) {
        res.status(500).json({
            message: err.message
        })
    }
});

module.exports = router;