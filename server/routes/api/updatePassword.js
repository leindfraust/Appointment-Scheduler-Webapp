const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt')
const Doctor = require('../../models/adminList');
const Patient = require('../../models/user')
const Manager = require('../../models/manager')

router.put('/patient', async (req, res) => {
    let patientID = req.body.patientID
    let currentPassword = req.body.currentPassword
    let newPassword = req.body.newPassword

    Patient.findOne({
        _id: patientID
    }, async(err, result) => {
        if (err) {
            res.status(500).send(err)
        } else {
            userDetails = await result
            bcrypt.compare(await currentPassword, result.password, async(err, result) => {
                if (err) {
                    res.status(500).send(err);
                } else {
                    if (result == true) {
                        bcrypt.hash(await newPassword, 10, async(err, hash) => {

                            if (err) {
                                res.status(500).send(err)
                            } else {
                                Patient.findOneAndUpdate({
                                    _id: patientID
                                }, {
                                    $set: {
                                        password: hash
                                    }
                                }, {
                                    returnOriginal: false,
                                }, (err, success) => {
                                    if (err) {
                                        res.status(500).send(err)
                                    } else {
                                        res.status(200).end()
                                    }
                                })
                            }

                        });
                    } else {
                        res.status(500).send('Incorrect current password')
                    }
                }
            })
        }
    })
});

router.put('/doctor', async (req, res) => {
    let doctorID = req.body.doctorID
    let currentPassword = req.body.currentPassword
    let newPassword = req.body.newPassword

    Doctor.findOne({
        _id: doctorID
    }, async(err, result) => {
        if (err) {
            res.status(500).send(err)
        } else {
            userDetails = await result
            bcrypt.compare(await currentPassword, result.password, async(err, result) => {
                if (err) {
                    res.status(500).send(err);
                } else {
                    if (result == true) {
                        bcrypt.hash(await newPassword, 10, (err, hash) => {

                            if (err) {
                                res.status(500).send(err)
                            } else {
                                Doctor.findOneAndUpdate({
                                    _id: doctorID
                                }, {
                                    $set: {
                                        password: hash
                                    }
                                }, {
                                    returnOriginal: false,
                                }, (err, success) => {
                                    if (err) {
                                        res.status(500).send(err)
                                    } else {
                                        res.status(200).end()
                                    }
                                })
                            }

                        });
                    } else {
                        res.status(500).send('Incorrect current password')
                    }
                }
            })
        }
    })
});

module.exports = router