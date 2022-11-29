const AppointmentList = require('../models/appointmentList');

const getAppointments = (async (req, res) => {
    try {
        const appointmentList = await AppointmentList.find()
        if (!appointmentList) throw new Error('no items')
        res.status(200).send(appointmentList)
    } catch (err) {
        res.status(500).send(err)
    }
});

const getAppointmentsforManager = (async (req, res) => {
    try {
        const appointmentList = await AppointmentList.find({
            hospital: req.body.hospital
        })
        if (!appointmentList) throw new Error('no items')
        res.status(200).send(appointmentList)
    } catch (err) {
        res.status(500).send(err)
    }
});

const getAppointmentsforDoctor = (async (req, res) => {
    try {
        const appointmentList = await AppointmentList.find({
            doctorID: req.body.id,
            "schedule.date": req.body.ongoing ? { $gte: new Date().toISOString() } : { $lte: new Date().toISOString() },
            ifPatientVisited: req.body.ongoing ? false : true,
            $or: [{ ifPatientCancelled: { $exists: false } }, { ifPatientCancelled: false }] //OR filter method used to support older documents with missing ifPatientCancelled field
        })
        if (!appointmentList) throw new Error('no items')
        res.status(200).send(appointmentList)
    } catch (err) {
        res.status(500).send(err)
    }
});

const getAppointmentsforDoctorCheckPriority = (async (req, res) => {
    try {
        const appointmentList = await AppointmentList.find({
            doctorID: req.body.doctorID,
            "schedule.date": req.body.schedule,
            ifPatientCancelled: false
        })
        if (!appointmentList) throw new Error('no items')
        const priorityLength = appointmentList.length
        res.status(200).send(priorityLength.toString())
    } catch (err) {
        res.status(500).send(err)
    }
});

const getAppointmentsforPatient = (async (req, res) => {
    try {
        const appointmentList = await AppointmentList.find({
            patientID: req.body.id,
            "schedule.date": req.body.ongoing ? { $gte: new Date().toISOString() } : { $lte: new Date().toISOString() },
            ifPatientCancelled: false
        })
        if (!appointmentList) throw new Error('no items')
        res.status(200).send(appointmentList)
    } catch (err) {
        res.status(500).send(err)
    }
});

const getCancelledAppointmentsforPatientAndDoctor = (async (req, res) => {
    try {
        const appointmentList = await AppointmentList.find({
            $or: [{ patientID: req.body.id }, { doctorID: req.body.id }],
            ifPatientVisited: false,
            ifPatientCancelled: true
        })
        if (!appointmentList) throw new Error('no items')
        res.status(200).send(appointmentList)
    } catch (err) {
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
        res.status(200).end()
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
        res.status(200).end()
    } catch (err) {
        res.status(500).send(err)
    }
});

module.exports = {
    getAppointments,
    pushAppointment,
    updateAppointment,
    deleteAppointment,
    getAppointmentsforManager,
    getAppointmentsforDoctor,
    getAppointmentsforDoctorCheckPriority,
    getCancelledAppointmentsforPatientAndDoctor,
    getAppointmentsforPatient
}