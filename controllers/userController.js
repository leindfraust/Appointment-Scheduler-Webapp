const bcrypt = require('bcrypt');
const user = require('../models/user');

const check_username = (async (req, res) => {
    let username = await req.body.username
    try {
        const userAccount = await user.findOne({
            username: new RegExp(`^${username.trim()}$`, 'i')
        });
        if (userAccount) {
            await res.status(200).send(true)
        } else {
            await res.status(200).send(false)
        }
    } catch (err) {
        res.status(500).send(err)
    }
});

const check_email = (async (req, res) => {
    let email = await req.body.email
    try {
        const userAccount = await user.findOne({
            gmail: new RegExp(`^${email.trim()}$`, 'i')
        });
        if (userAccount) {
            await res.status(200).send(true)
        } else {
            await res.status(200).send(false)
        }
    } catch (err) {
        res.status(500).send(err)
    }
});

const verify_username = (async (req, res) => {
    let username = await req.body.username
    let email = await req.body.email

    try {
        const userAccount = await user.findOne({
            username: username.trim(),
            gmail: email
        });
        if (userAccount) {
            res.status(200).send(req.body.forgotPassword ? userAccount._id : true)
        } else {
            res.status(200).send(false)
        }
    } catch (err) {
        res.status(500).send(err)
    }
});

const getUsers = (async (req, res) => {
    try {
        const userList = await user.find().select('-password -username')
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
                res.status(200).end()
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
        res.status(200).end()
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
    check_email,
    verify_username,
    getUsers,
    pushUser,
    updateUser,
    deleteUser
}