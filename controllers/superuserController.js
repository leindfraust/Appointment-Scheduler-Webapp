const Superuser = require('../models/superuser');

const getSuperusers = (async (req, res) => {
    try {
        const SuperuserList = await Superuser.find()
        if (!SuperuserList) throw new Error('no items')
        res.status(200).send(SuperuserList)
    } catch (error) {
        res.status(500).send({
            message: error.message
        })
    }
});

const pushSuperuser = (async (req, res) => {
    const newSuperuser = new Superuser(req.body)
    try {
        const SuperuserList = await newSuperuser.save()
        res.status(200).end()
    } catch (err) {
        res.status(500).send({
            message: err.message
        })
    }
});

const updateSuperuser = (async (req, res) => {
    const {
        id
    } = req.params
    try {
        const response = await Superuser.findByIdAndUpdate(id, req.body)
        if (!response) throw new Error('cannot update')
        res.status(200).end()
    } catch (err) {
        res.status(500).send({
            message: err.message
        })
    }
});

const deleteSuperuser = (async (req, res) => {
    const {
        id
    } = req.params
    try {
        const removed = await Superuser.findByIdAndDelete(id)
        if (!removed) throw new Error('something went wrong, try again later')
        res.status(200).end()
    } catch (err) {
        res.status(500).send({
            message: err.message
        })
    }
});

const submitTicket = (async (req, res) => {
    let ticketTitle = req.body.ticketTitle
    let ticketType = req.body.ticketType
    let email = req.body.email
    let ticketID = req.body.ticketID
    let ticketMessage = req.body.ticketMessage
    Superuser.findOneAndUpdate({
        _id: '6187884b847ca9434716e7ba'
    }, {
        $push: {
            tickets: {
                id: ticketID,
                type: ticketType,
                email: email,
                title: ticketTitle,
                message: ticketMessage,
                active: true
            }

        }
    }, {
        returnOriginal: false
    }, function (error, success) {
        if (error) {
            console.log(error)
        } else {
            console.log(success)
            res.end()
        }
    });
});

const deleteTicket = (async (req, res) => {
    let ticketTitle = req.body.ticketTitle
    let ticketType = req.body.ticketType
    let email = req.body.email
    let ticketID = req.body.ticketID
    let ticketMessage = req.body.ticketMessage
    let ticketActive = req.body.ticketActive
    Superuser.findOneAndUpdate({
        _id: '6187884b847ca9434716e7ba'
    }, {
        $pull: {
            tickets: {
                id: ticketID,
                type: ticketType,
                email: email,
                title: ticketTitle,
                message: ticketMessage,
                active: ticketActive
            }

        }
    }, {
        returnOriginal: false
    }, function (error, success) {
        if (error) {
            console.log(error)
        } else {
            console.log(success)
            res.end()
        }
    });
});

const updateTicket = (async (req, res) => {
    let ticketID = req.body.ticketID
    let ticketActive = req.body.ticketActive
    Superuser.findOneAndUpdate({
        _id: '6187884b847ca9434716e7ba',
        'tickets.id': ticketID
    }, {
        'tickets.$.active': ticketActive
    }, {
        returnOriginal: false
    }, function (error, success) {
        if (error) {
            console.log(error)
        } else {
            console.log(success)
            res.end()
        }
    });
});

module.exports = {
    getSuperusers,
    pushSuperuser,
    updateSuperuser,
    deleteSuperuser,
    submitTicket,
    updateTicket,
    deleteTicket
}