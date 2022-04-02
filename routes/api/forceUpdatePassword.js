//for Forgot Password component in Vue

const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt')
const Doctor = require('../../models/adminList');
const Patient = require('../../models/user')
const Manager = require('../../models/manager')

router.put('/patient', async (req, res) => {
    let patientID = req.body.patientID
    let password = req.body.password

    bcrypt.hash(await password, 10, (err, hash) => {

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
});

router.put('/doctor', async (req, res) => {
    let doctorID = req.body.doctorID
    let password = req.body.password

    bcrypt.hash(await password, 10, (err, hash) => {

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
});

router.put('/manager', async (req, res) => {
    let managerID = req.body.managerID
    let password = req.body.password

    bcrypt.hash(await password, 10, (err, hash) => {

        if (err) {
            res.status(500).send(err)
        } else {
            Manager.findOneAndUpdate({
                _id: managerID
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
});
module.exports = router