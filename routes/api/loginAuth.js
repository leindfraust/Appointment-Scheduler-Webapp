const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt')
const Doctor = require('../../models/adminList');
const Patient = require('../../models/user')
const Manager = require('../../models/manager')

//patient login
router.post('/patient', async (req, res) => {
    let username = req.body.username
    let password = req.body.password
    let userDetails

    Patient.findOne({
        username: username
    }, async (err, result) => {
        if (err) {
            res.status(500).send(err)
        } else {
            userDetails = await result
            bcrypt.compare(await password, result.password, (err, result) => {
                delete userDetails.password
                if (err) {
                    res.status(500).send(err);
                } else {
                    if (result == true) {
                        let response_client = ({
                            ...userDetails
                        }._doc)
                        delete response_client.password
                        res.status(200).send(response_client)
                    } else {
                        res.status(200).send(result)
                    }
                }
            })
        }
    })
});

//doctor login
router.post('/doctor', async (req, res) => {
    let username = req.body.username
    let password = req.body.password
    let userDetails

    Doctor.findOne({
        username: username
    }, async (err, result) => {
        if (err) {
            res.status(500).send(err)
        } else {
            userDetails = await result
            bcrypt.compare(await password, result.password, (err, result) => {
                if (err) {
                    res.status(500).send(err);
                } else {
                    if (result == true) {
                        let response_client = ({
                            ...userDetails
                        }._doc)
                        delete response_client.password
                        res.status(200).send(response_client)
                    } else {
                        res.status(200).send(result)
                    }
                }
            })
        }
    })
});

//manager login
router.post('/manager', async (req, res) => {
    let username = req.body.username
    let password = req.body.password
    let userDetails

    Manager.findOne({
        username: username
    }, async (err, result) => {
        if (err) {
            res.status(500).send(err)
        } else {
            userDetails = await result
            bcrypt.compare(await password, result.password, (err, result) => {
                if (err) {
                    console.log(err)
                    res.status(500).send(err);
                } else {
                    if (result == true) {
                        let response_client = ({
                            ...userDetails
                        }._doc)
                        delete response_client.password
                        res.status(200).send(response_client)
                    } else {
                        res.status(200).send(result)
                    }
                }
            })
        }
    })
});

module.exports = router