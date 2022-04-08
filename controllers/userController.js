const bcrypt = require('bcrypt');
const user = require('../models/user');

const check_username = (async (req, res) => {
    let username_client = req.body.username
    try {
        const username_found = await user.findOne({
            username: username_client
        }).exec();
        if (username_found) {
            res.status(200).send(true)
        } else {
            res.status(200).send(false)
        }
    } catch (err) {
        res.status(500).send(err)
    }
})

const getUsers = (async (req, res) => {
    try {
        const userList = await user.find()
        if (!userList) throw new Error('no items')
        res.status(200).send(userList)
    } catch (error) {
        res.status(500).send({
            message: error.message
        })
    }
});

const pushUser = (async (req, res) => {

    bcrypt.hash(req.body.password, 10, async (err, hash) => {
        if (err) {
            res.status(500).send(err)
        } else {
            req.body.password = hash
            const newuser = new user(req.body)
            try {
                const userList = await newuser.save()
                if (!userList) throw new Error('Cannot save')
                res.status(200).send(userList)
            } catch (err) {
                res.status(500).send({
                    message: err.message
                })
            }
        }
    })
});

const updateUser = (async (req, res) => {
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
        res.status(200).send(updated)
    } catch (err) {
        res.status(500).send({
            message: err.message
        })
    }
});

const deleteUser = (async (req, res) => {
    const {
        id
    } = req.params
    try {
        const removed = await user.findByIdAndDelete(id)

        if (!removed) throw new Error('something went wrong, try again later')
        res.status(200).send(removed)
    } catch (err) {
        res.status(500).send({
            message: err.message
        })
    }
});

module.exports = {
    check_username,
    getUsers,
    pushUser,
    updateUser,
    deleteUser
}