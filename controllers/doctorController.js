const bcrypt = require('bcrypt')
const Doctor = require('../models/doctor');
const cloudinary = require('cloudinary')

cloudinary.config({
    cloud_name: process.env.cloudinary_cloud_name,
    api_key: process.env.cloudinary_api_key,
    api_secret: process.env.cloudinary_api_secret
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

const check_alias = (async (req, res) => {
    let alias = await req.body.alias
    try {
        const userAccount = await Doctor.findOne({
            alias: new RegExp(`^${alias.trim()}$`, 'i')
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

const check_username = (async (req, res) => {
    let username = await req.body.username
    try {
        const userAccount = await Doctor.findOne({
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
        const userAccount = await Doctor.findOne({
            username: username.trim()
        });
        if (await userAccount) {
            if (userAccount.gmail === email) {
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
            res.status(500)
        } else {
            console.log(success)
            res.status(200).end()
        }
    });
});

//get copy of doctor's messages to a patient
const pushMessages = ((req, res) => {
    Doctor.findOneAndUpdate({
        _id: req.body.id}, {
        $push: {
            messageHistory: req.body.message
        }, 
    }, {
        returnOriginal: false
    }, ((err, success) => {
        if(err) {
            console.log(err)
        } else {
            console.log(success)
            res.status(200).send(success.messageHistory)
        }
    }))
})

module.exports = {
    check_alias,
    check_username,
    verify_username,
    getDoctors,
    pushDoctor,
    updateDoctor,
    deleteDoctor,
    pullDoctorHospital,
    pushPatientDoctor,
    pushMessages
}