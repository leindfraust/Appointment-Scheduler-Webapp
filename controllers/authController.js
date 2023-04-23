const bcrypt = require('bcrypt')
const Doctor = require('../models/doctor');
const Patient = require('../models/user')
const Manager = require('../models/manager')

//patient login
const patientAuth = (async (req, res) => {
    let username = req.body.username
    let password = req.body.password

    try {
        const result = await Patient.findOne({ username: username }).exec();

        if (result) {
            const userDetails = result;
            const match = await bcrypt.compare(password, result.password);
            delete userDetails.password;

            if (match) {
                const response_client = { ...userDetails }._doc;
                delete response_client.password;
                res.status(200).send(response_client);
            } else {
                res.status(200).send(match);
            }
        } else {
            res.status(200).send(false);
        }
    } catch (error) {
        res.status(500).send(error);
    }
});

//doctor login
const doctorAuth = (async (req, res) => {
    let username = req.body.username
    let password = req.body.password

    try {
        const result = await Doctor.findOne({ username: username }).exec();

        if (result) {
            const userDetails = result;
            const match = await bcrypt.compare(password, result.password);
            delete userDetails.password;

            if (match) {
                const response_client = { ...userDetails }._doc;
                delete response_client.password;
                res.status(200).send(response_client);
            } else {
                res.status(200).send(match);
            }
        } else {
            res.status(200).send(false);
        }
    } catch (error) {
        res.status(500).send(error);
    }
});

//manager login
const managerAuth = (async (req, res) => {
    let username = req.body.username
    let password = req.body.password

    try {
        const result = await Manager.findOne({ username: username });
        if (result) {
            const userDetails = result;
            const isMatch = await bcrypt.compare(password, result.password);
            delete userDetails.password;
            if (isMatch) {
                let response_client = { ...userDetails }._doc;
                delete response_client.password;
                res.status(200).send(response_client);
            } else {
                res.status(200).send(isMatch);
            }
        } else {
            res.status(200).send(false);
        }
    } catch (err) {
        console.log(err);
        res.status(500).send(err);
    }
});

module.exports = {
    patientAuth,
    doctorAuth,
    managerAuth
}