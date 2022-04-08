const AppointmentList = require('../models/appointmentList');

const getAppointments = (async (req, res) => {
    try {
        const appointmentList = await AppointmentList.find()
        if (!appointmentList) throw new Error('no items')
        res.status(200).send(appointmentList)
    } catch (error) {
        res.status(500).send(err)
    }
});

const pushAppointment = (async (req, res) => {
    const newAppointment = new AppointmentList(req.body)
    try {
        const appointmentList = await newAppointment.save()
        if (!appointmentList) throw new Error('Cannot save')
        res.status(200).send(appointmentList)
    } catch (err) {
        res.status(500).send(err)
    }
});

const updateAppointment = (async (req, res) => {
    const {
        id
    } = req.params
    try {
        const response = await AppointmentList.findByIdAndUpdate(id, req.body)
        if (!response) throw new Error('cannot update')
        const updated = {
            ...response._doc,
            ...req.body
        }
        res.status(200).send(updated)
    } catch (err) {
        res.status(500).send(err)
    }
});

const deleteAppointment = (async (req, res) => {
    const {
        id
    } = req.params
    try {
        const removed = await AppointmentList.findByIdAndDelete(id)
        if (!removed) throw new Error('something went wrong, try again later')
        res.status(200).send(removed)
    } catch (err) {
        res.status(500).send(err)
    }
});

module.exports = {
    getAppointments,
    pushAppointment,
    updateAppointment,
    deleteAppointment
}