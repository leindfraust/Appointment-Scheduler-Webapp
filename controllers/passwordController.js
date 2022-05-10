const bcrypt = require('bcrypt')
const Doctor = require('../models/doctor');
const Patient = require('../models/user')
const Manager = require('../models/manager')

const patientUpdatePassword = (async (req, res) => {
    let patientID = req.body.patientID
    let currentPassword = req.body.currentPassword
    let newPassword = req.body.newPassword

    Patient.findOne({
        _id: patientID
    }, async (err, result) => {
        if (err) {
            res.status(500).send(err)
        } else {
            userDetails = await result
            bcrypt.compare(await currentPassword, result.password, async (err, result) => {
                if (err) {
                    res.status(500).send(err);
                } else {
                    if (result == true) {
                        bcrypt.hash(await newPassword, 10, async (err, hash) => {

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
                                        res.status(200).send(true)
                                    }
                                })
                            }

                        });
                    } else {
                        res.status(200).send(false)
                    }
                }
            })
        }
    })
});

const doctorUpdatePassword = (async (req, res) => {
    let doctorID = req.body.doctorID
    let currentPassword = req.body.currentPassword
    let newPassword = req.body.newPassword

    Doctor.findOne({
        _id: doctorID
    }, async (err, result) => {
        if (err) {
            res.status(500).send(err)
        } else {
            userDetails = await result
            bcrypt.compare(await currentPassword, result.password, async (err, result) => {
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
                                        res.status(200).send(true)
                                    }
                                })
                            }

                        });
                    } else {
                        res.status(200).send(false)
                    }
                }
            })
        }
    })
});

const managerUpdatePassword = (async (req, res) => {
    let managerID = req.body.managerID
    let currentPassword = req.body.currentPassword
    let newPassword = req.body.newPassword

    Manager.findOne({
        _id: managerID
    }, async (err, result) => {
        if (err) {
            res.status(500).send(err)
        } else {
            userDetails = await result
            bcrypt.compare(await currentPassword, result.password, async (err, result) => {
                if (err) {
                    res.status(500).send(err);
                } else {
                    if (result == true) {
                        bcrypt.hash(await newPassword, 10, (err, hash) => {

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
                                        res.status(200).send(true)
                                    }
                                })
                            }

                        });
                    } else {
                        res.status(200).send(false)
                    }
                }
            })
        }
    })
});


const patientfUpdatePassword = (async (req, res) => {
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

const doctorfUpdatePassword = (async (req, res) => {
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

const managerfUpdatePassword = (async (req, res) => {
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

module.exports = {
    patientUpdatePassword,
    doctorUpdatePassword,
    managerUpdatePassword,
    patientfUpdatePassword,
    managerfUpdatePassword,
    doctorfUpdatePassword
}