import { Manager } from '../models/manager.js';

const getManagers = (async (req, res) => {
    try {
        const managerList = await Manager.find().select('-password -username')
        if (!managerList) throw new Error('no items')
        res.status(200).send(managerList)
    } catch (err) {
        res.status(500).send(err)
    }
});

const getManager = (async (req, res) => {
    const {
        id
    } = req.params
    try {
        const paramManager = await Manager.findById(id).select('-password -username')
        if (!paramManager) throw new Error('no item')
        res.status(200).send(paramManager)
    } catch (err) {
        res.status(500).send(err)
    }
})

const check_username = (async (req, res) => {
    let username = await req.body.username
    try {
        const userAccount = await Manager.findOne({
            username: new RegExp(`^${username.trim()}$`, 'i')
        });
        if (userAccount) {
            res.status(200).send(true)
        } else {
            res.status(200).send(false)
        }
    } catch (err) {
        res.status(500).send(err)
    }
});

const check_provider = (async (req, res) => {
    let provider = await req.body.provider
    try {
        const userAccount = await Manager.findOne({
            hospital: new RegExp(`^${provider.trim()}$`, 'i')
        });
        if (userAccount) {
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
        const userAccount = await Manager.findOne({
            username: username.trim(),
            email: email
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

const pushManager = (async (req, res) => {
    const bcrypt = await import('bcrypt')

    bcrypt.hash(req.body.password, 10, async (err, hash) => {
        if (err) {
            res.status(500).send(err)
        } else {
            req.body.password = hash
            const newManagerList = new Manager(req.body)
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
        const managerList = await Manager.findByIdAndUpdate(id, req.body)
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
        const managerList = await Manager.findByIdAndDelete(id)
        if (!managerList) throw new Error('something went wrong, try again later')
        res.status(200).end()
    } catch (err) {
        res.status(500).send(err)
    }
});

export {
    verify_username,
    check_provider,
    check_username,
    getManagers,
    getManager,
    pushManager,
    updateManager,
    deleteManager
}