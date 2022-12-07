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
//checks strictly the patient's first name and last name of the appointment on that schedule
const checkDoubleAppointment = (async (req, res) => {
    try {
        const appointment = await AppointmentList.find({
            schedule: req.body.schedule,
            patientID: req.body.patientID,
            doctorID: req.body.doctorID,
            firstName: { $regex: `.*${req.body.firstName}*.`, $options: 'i' },
            lastName: { $regex: `.*${req.body.lastName}*.`, $options: 'i' },
            ifPatientCancelled: false
        }).select("_id");
        if (!appointment) throw new Error('no items')
        if (appointment.length !== 0) {
            res.status(200).send(appointment[0]._id)
        } else {
            res.status(200).send(false)
        }
    } catch (err) {
        res.status(500).send(err)
    }
})
//checks only if patient has already appointed already on that schedule regardless of who appointed using their account
const checkMultipleAppointment = (async (req, res) => {
    try {
        const appointment = await AppointmentList.find({
            schedule: req.body.schedule,
            patientID: req.body.patientID,
            doctorID: req.body.doctorID,
            ifPatientCancelled: false
        });
        if (!appointment) throw new Error('no items')
        if (appointment.length !== 0) {
            res.status(200).send(true)
        } else {
            res.status(200).send(false)
        }
    } catch (err) {
        res.status(500).send(err)
    }
})

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
            "schedule.date": req.body.ongoing ? { $gte: new Date(new Date().toDateString()).toISOString() } : { $lte: new Date(new Date().toDateString()).toISOString() },
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
            "schedule.date": req.body.ongoing ? { $gte: new Date(new Date().toDateString()).toISOString() } : { $lte: new Date(new Date().toDateString()).toISOString() },
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
    checkDoubleAppointment,
    checkMultipleAppointment,
    pushAppointment,
    updateAppointment,
    deleteAppointment,
    getAppointmentsforManager,
    getAppointmentsforDoctor,
    getAppointmentsforDoctorCheckPriority,
    getCancelledAppointmentsforPatientAndDoctor,
    getAppointmentsforPatient
}