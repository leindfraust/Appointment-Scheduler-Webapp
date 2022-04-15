const bcrypt = require('bcrypt')
const manager = require('../models/manager')

const getManagers = (async (req, res) => {
    try {
        const managerList = await manager.find().select('-password -username')
        if (!managerList) throw new Error('no items')
        res.status(200).send(managerList)
    } catch (error) {
        res.status(500).send(err)
    }
});

const check_username = (async (req, res) => {
    let username = await req.body.username
    try {
        const userAccount = await manager.findOne({
            username: new RegExp(`^${username.trim()}$`, 'i')
        });
        if (await userAccount) {
            res.status(200).send(true)
        } else {
            res.status(200).send(false)
        }
    } catch (err) {
        res.status(500).send(err)
    }
});

const verify_username = (async (req, res) => {
    let username = await req.body.username
    let email = await req.body.email
    try {
        const userAccount = await manager.findOne({
            username: username.trim()
        });
        if (await userAccount) {
            if (await userAccount.email === email) {
                res.status(200).send(true)
            } else {
                res.status(200).send(false)
            }
        } else {
            res.status(200).send(false)
        }
    } catch (err) {
        res.status(500).send(err)
    }
});

const pushManager = (async (req, res) => {
    bcrypt.hash(req.body.password, 10, async (err, hash) => {
        if (err) {
            res.status(500).send(err)
        } else {
            req.body.password = hash
            const newManagerList = new manager(req.body)
            try {
                const managerList = await newManagerList.save()
                if (!managerList) throw new Error('Cannot save')
                res.status(200).end()
            } catch (err) {
                res.status(500).send(err)
            }
        }
    })
});

const updateManager = (async (req, res) => {
    const {
        id
    } = req.params
    try {
        const managerList = await manager.findByIdAndUpdate(id, req.body)
        if (!managerList) throw new Error('cannot update')
        res.status(200).end()
    } catch (err) {
        res.status(500).send(err)
    }
});

const deleteManager = (async (req, res) => {
    const {
        id
    } = req.params
    try {
        const managerList = await manager.findByIdAndDelete(id)
        if (!managerList) throw new Error('something went wrong, try again later')
        res.status(200).end()
    } catch (err) {
        res.status(500).send(err)
    }
});

module.exports = {
    verify_username,
    check_username,
    getManagers,
    pushManager,
    updateManager,
    deleteManager
}