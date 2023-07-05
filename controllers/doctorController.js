import bcrypt from 'bcrypt'
import cloudinary from 'cloudinary'

import { Doctor } from '../models/doctor.js';


cloudinary.config({
    cloud_name: process.env.cloudinary_cloud_name,
    api_key: process.env.cloudinary_api_key,
    api_secret: process.env.cloudinary_api_secret,
    secure: true
});

const getDoctors = (async (req, res) => {
    try {
        const doctorList = await Doctor.find().select('-password -username -licenseNo')
        if (!doctorList) throw new Error('no items')
        res.status(200).send(doctorList)
    } catch (error) {
        res.status(500).send({
            message: error.message
        })
    }
});

const getDoctorsForManager = (async (req, res) => {
    try {
        const doctorList = await Doctor.find({
            "hospitalOrigin.hospital": req.body.hospital
        }).select('-password -username -licenseNo')
        if (!doctorList) throw new Error('no items')
        res.status(200).send(doctorList)
    } catch (error) {
        res.status(500).send({
            message: error.message
        })
    }
});

const getDoctorsForFilter = (async (req, res) => {
    const today = new Date(new Date()).toLocaleDateString()
    const customDate = new Date(req.body.date).toLocaleDateString()
    let querySpecialistOnly = {
        verified: true,
        "hospitalOrigin.hospital": req.body.hospital,
        specialist: req.body.filterSpecialist,
        schedule: { $elemMatch: { date: { $gt: new Date(today).toISOString() }, hospital: req.body.hospital } }
    }
    let querySpecialistWithDateTime;
    if (req.body.date && new Date(req.body.date) instanceof Date && !isNaN(new Date(req.body.date))) {
        querySpecialistWithDateTime = {
            verified: true,
            "hospitalOrigin.hospital": req.body.hospital,
            schedule: { $elemMatch: { date: new Date(customDate).toISOString(), timeStart: { $regex: `.*${req.body.time}.*` }, hospital: req.body.hospital } }
        }
        if (req.body.filterSpecialist) {
            querySpecialistWithDateTime.specialist = req.body.filterSpecialist
        }
    } else {
        querySpecialistWithDateTime = {
            verified: true,
            "hospitalOrigin.hospital": req.body.hospital,
            schedule: { $elemMatch: { date: { $gt: new Date(today).toISOString() }, timeStart: { $regex: `.*${req.body.time}.*` }, hospital: req.body.hospital } }
        }
        if (req.body.filterSpecialist) {
            querySpecialistWithDateTime.specialist = req.body.filterSpecialist
        }
    }

    try {
        const doctorList = await Doctor.find(querySpecialistWithDateTime ? querySpecialistWithDateTime : querySpecialistOnly).select('-password -username -licenseNo -verified -messageHistory -_id -gmail -__v -patients -alias -gmail')
        if (!doctorList) throw new Error('no items')
        res.status(200).send(doctorList)
    } catch (error) {
        res.status(500).send({
            message: error.message
        })
    }
});

const checkAvailabilityDoctors = (async (req, res) => {
    const today = new Date(new Date()).toLocaleDateString()
    let hospital = req.body.hospital
    let specialist = req.body.specialist
    let filterDate = req.body.filterDate
    let filterTime = req.body.filterTime
    let query = {
        verified: true,
        "hospitalOrigin.hospital": hospital,
        schedule: { $elemMatch: { date: { $gt: new Date(today).toISOString() }, hospital: hospital } }
    }
    if (typeof specialist !== 'undefined') {
        query.specialist = specialist
    }
    if (filterDate && filterDate !== undefined && new Date(filterDate) instanceof Date) {
        query.schedule = { $elemMatch: { date: new Date(new Date(filterDate).toDateString()).toISOString(), hospital: hospital } }
        if (filterTime !== '' && filterTime) {
            query.schedule = { $elemMatch: { date: new Date(new Date(req.body.filterDate).toDateString()).toISOString(), hospital: hospital, timeStart: { $regex: `.*${req.body.filterTime}.*` } } }
        }
    }
    try {
        const availableDoctors = await Doctor.find(query).select('-password -username -licenseNo -messageHistory -gmail -hospitalOrigin');
        if (availableDoctors) {
            res.status(200).send(availableDoctors)
        } else {
            res.status(200).send(false)
        }
    } catch (err) {
        res.status(500).send(err)
        console.log(err)
    }
})

const check_registrationCode = (async (req, res) => {

    const { Manager } = await import('../models/manager.js')

    let registrationCode = await req.body.registrationCode
    try {
        const hospital = await Manager.findOne({
            registrationCode: registrationCode
        }).select('-password -username');
        if (hospital) {
            res.status(200).send(hospital)
        } else {
            res.status(200).send(false)
        }
    } catch (err) {
        res.status(500).send(err)
    }
});

const check_alias = (async (req, res) => {
    let alias = await req.body.alias
    try {
        const userAccount = await Doctor.findOne({
            alias: new RegExp(`^${alias.trim()}$`, 'i')
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

const check_email = (async (req, res) => {
    let email = await req.body.email
    try {
        const userAccount = await Doctor.findOne({
            gmail: new RegExp(`^${email.trim()}$`, 'i')
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

const check_username = (async (req, res) => {
    let username = await req.body.username
    try {
        const userAccount = await Doctor.findOne({
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

const verify_username = (async (req, res) => {
    let username = await req.body.username
    let email = await req.body.email
    try {
        const userAccount = await Doctor.findOne({
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

const pushDoctor = (async (req, res) => {
    bcrypt.hash(req.body.password, 10, async (err, hash) => {
        if (err) {
            res.status(500).send(err)
        } else {
            req.body.password = hash
            const newDoctor = new Doctor(req.body)
            try {
                const doctorList = await newDoctor.save()
                if (!doctorList) throw new Error('Cannot save')
                res.status(200).end()
            } catch (err) {
                res.status(500).send({
                    message: err.message
                })
            }
        }
    })
});

const updateDoctor = (async (req, res) => {
    const {
        id
    } = req.params
    try {
        const response = await Doctor.findByIdAndUpdate(id, req.body)
        if (!response) throw new Error('cannot update')
        res.status(200).end()
    } catch (err) {
        res.status(500).send({
            message: err.message
        })
    }
});

const updateDoctorSchedule = (async (req, res) => {
    const { id } = req.params
    try {
        const response = await Doctor.findOneAndUpdate(
            { _id: id, "schedule.id": req.body.schedule.id },
            { $set: { "schedule.$": req.body.schedule } },
            { new: true }
        ).select("schedule")
        if (!response) throw new Error('cannot update')
        res.status(200).send(response)
    } catch (err) {
        console.log(err)
        res.status(500).send({
            message: err.message
        })
    }
})

const deleteDoctor = (async (req, res) => {
    const {
        id
    } = req.params
    try {
        const removed = await Doctor.findByIdAndDelete(id)

        if (!removed) throw new Error('something went wrong, try again later')
        if (removed) {
            cloudinary.v2.uploader.destroy(`assets/doctors/${removed.alias}`, {
                invalidate: true
            }, ((err, result) => {
                err ? console.log(err) : console.log(result)
            }));
        }
        res.status(200).end()
    } catch (err) {
        res.status(500).send({
            message: err.message
        })
    }
});

//pull doctor from a hospital
const pullDoctorHospital = (async (req, res) => {
    let doctorID = await req.body.doctorID
    let hospital = await req.body.hospital

    try {
        const pullOperation = await Doctor.findOneAndUpdate({
            _id: doctorID
        }, {
            $pull: {
                hospitalOrigin: {
                    hospital: hospital
                }
            }
        }, {
            new: true
        })
        if (pullOperation) {
            res.status(200).end()
        }
    } catch (err) {
        console.log(err)
        res.status(500).send(err)
    }
});

//add patient records to the doctor of a new patient
const pushPatientDoctor = (async (req, res) => {
    let doctorID = await req.body.doctorID
    let patientID = await req.body.patientID
    let patientFullName = await req.body.patientFullName

    try {
        const pushOperation = await Doctor.findOneAndUpdate({
            _id: doctorID
        }, {
            $push: {
                patients: {
                    patient: patientID,
                    patientName: patientFullName
                }
            }
        }, {
            new: true
        })
        if (pushOperation) {
            res.status(200).end()
        }
    } catch (err) {
        console.log(err)
        res.status(500).send(err)
    }
});

const pullPatientDoctor = (async (req, res) => {
    let doctorID = await req.body.doctorID
    let patientID = await req.body.patientID
    let patientFullName = await req.body.patientFullName

    try {
        const pullOperation = await Doctor.findOneAndUpdate({
            _id: doctorID
        }, {
            $pull: {
                patients: {
                    patient: patientID,
                    patientName: patientFullName
                }
            }
        }, {
            mew: true
        })
        if (pullOperation) {
            res.status(200).end()
        }
    } catch (err) {
        console.log(err)
        res.status(500).send(err)
    }
});

//get copy of doctor's messages to a patient
const pushMessages = (async (req, res) => {
    try {
        const doctorMsg = await Doctor.findOneAndUpdate({
            _id: req.body.id
        }, {
            $push: {
                messageHistory: req.body.message
            },
        }, {
            new: true
        })
        res.status(200).send(doctorMsg.messageHistory)
    } catch (err) {
        console.log(err)
        res.status(500).send(err)
    }
});

//delete a copy of a doctor's message to a patient
const pullMessage = (async (req, res) => {
    try {
        const doctorMsg = await Doctor.findOneAndUpdate({
            _id: req.body.id
        }, {
            $pull: {
                messageHistory: req.body.message
            },
        }, {
            new: true
        })
        res.status(200).send(doctorMsg.messageHistory)
    } catch (err) {
        console.log(err)
        res.status(500).send(err)
    }
});

//delete all copies of a doctor's message to a patient
const clearMessages = (async (req, res) => {
    try {
        const doctorMsg = await Doctor.findOneAndUpdate({
            _id: req.body.id
        }, {
            $set: {
                messageHistory: Array
            },
        }, {
            new: true
        })
        res.status(200).send(doctorMsg.messageHistory)
    } catch (err) {
        console.log(err)
        res.status(500).send(err)
    }
});

export {
    check_registrationCode,
    check_alias,
    check_email,
    check_username,
    checkAvailabilityDoctors,
    verify_username,
    getDoctors,
    getDoctorsForManager,
    getDoctorsForFilter,
    pushDoctor,
    updateDoctor,
    updateDoctorSchedule,
    deleteDoctor,
    pullDoctorHospital,
    pushPatientDoctor,
    pullPatientDoctor,
    pushMessages,
    pullMessage,
    clearMessages
}