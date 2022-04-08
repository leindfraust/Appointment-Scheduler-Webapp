const bcrypt = require('bcrypt')
const Doctor = require('../models/doctor');
const Patient = require('../models/user')
const Manager = require('../models/manager')

//patient login
const patientAuth = (async (req, res) => {
    let username = req.body.username
    let password = req.body.password
    let userDetails

    Patient.findOne({
        username: username
    }, async (err, result) => {
        if (err) {
            res.status(500).send(err)
        } else {
            if (result) {
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
            } else {
                res.status(200).send(false)
            }
        }
    })
});

//doctor login
const doctorAuth = (async (req, res) => {
    let username = req.body.username
    let password = req.body.password
    let userDetails

    Doctor.findOne({
        username: username
    }, async (err, result) => {
        if (err) {
            res.status(500).send(err)
        } else {
            if (result) {
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
            } else {
                res.status(200).send(false)
            }
        }
    })
});

//manager login
const managerAuth = (async (req, res) => {
    let username = req.body.username
    let password = req.body.password
    let userDetails

    Manager.findOne({
        username: username
    }, async (err, result) => {
        if (err) {
            res.status(500).send(err)
        } else {
            if (result) {
                userDetails = await result
                bcrypt.compare(await password, result.password, (err, result) => {
                    delete userDetails.password
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
            } else {
                res.status(200).send(false)
            }
        }
    })
});

module.exports = {
    patientAuth,
    doctorAuth,
    managerAuth
}