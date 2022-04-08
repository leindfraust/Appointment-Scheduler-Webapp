const bcrypt = require('bcrypt')
const Doctor = require('../models/doctor');

const getDoctors = (async (req, res) => {
    try {
        const doctorList = await Doctor.find().select('-password -username -licenseNo -__v -_id')
        if (!doctorList) throw new Error('no items')
        res.status(200).send(doctorList)
    } catch (error) {
        res.status(500).send({
            message: error.message
        })
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
                res.status(200)
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

const deleteDoctor = (async (req, res) => {
    const {
        id
    } = req.params
    try {
        const removed = await Doctor.findByIdAndDelete(id)

        if (!removed) throw new Error('something went wrong, try again later')
        res.status(200)
    } catch (err) {
        res.status(500).send({
            message: err.message
        })
    }
});

//pull doctor from a hospital
const pullDoctorHospital = ((req, res) => {
    let doctorID = req.body.doctorID
    let hospital = req.body.hospital

    Doctor.findOneAndUpdate({
        _id: doctorID
    }, {
        $pull: {
            hospitalOrigin: {
                hospital: hospital
            }
        }
    }, {
        returnOriginal: false,
        multi: true
    }, function (error, success) {
        if (error) {
            console.log(error)
        } else {
            console.log(success)
            res.status(200).end()
        }
    });
});

//add patient records to the doctor of a new patient
const pushPatientDoctor = ((req, res) => {
    let doctorID = req.body.doctorID
    let patientID = req.body.patientID
    let patientFullName = req.body.patientFullName

    Doctor.findOneAndUpdate({
        _id: doctorID
    }, {
        $push: {
            patients: {
                patient: patientID,
                patientName: patientFullName
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

module.exports = {
    getDoctors,
    pushDoctor,
    updateDoctor,
    deleteDoctor,
    pullDoctorHospital,
    pushPatientDoctor
}