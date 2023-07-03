import bcrypt from 'bcrypt'
import { Doctor } from '../models/doctor.js';
import { User } from '../models/user.js';
import { Manager } from '../models/manager.js';

const patientUpdatePassword = (async (req, res) => {
    let patientID = req.body.patientID
    let currentPassword = req.body.currentPassword
    let newPassword = req.body.newPassword

    try {
        const result = await User.findOne({ _id: patientID });
        const match = await bcrypt.compare(currentPassword, result.password);

        if (match) {
            const hash = await bcrypt.hash(newPassword, 10);
            await User.findOneAndUpdate(
                { _id: patientID },
                { $set: { password: hash } },
                { returnOriginal: false }
            );

            res.status(200).send(true);
        } else {
            res.status(200).send(false);
        }
    } catch (err) {
        res.status(500).send(err);
    }
});

const doctorUpdatePassword = (async (req, res) => {
    let doctorID = req.body.doctorID
    let currentPassword = req.body.currentPassword
    let newPassword = req.body.newPassword

    try {
        const result = await Doctor.findOne({ _id: doctorID });
        const match = await bcrypt.compare(currentPassword, result.password);

        if (match) {
            const hash = await bcrypt.hash(newPassword, 10);
            await Doctor.findOneAndUpdate(
                { _id: doctorID },
                { $set: { password: hash } },
                { returnOriginal: false }
            );

            res.status(200).send(true);
        } else {
            res.status(200).send(false);
        }
    } catch (err) {
        res.status(500).send(err);
    }
});

const managerUpdatePassword = (async (req, res) => {
    let managerID = req.body.managerID
    let currentPassword = req.body.currentPassword
    let newPassword = req.body.newPassword

    try {
        const result = await Manager.findOne({ _id: managerID });
        const match = await bcrypt.compare(currentPassword, result.password);

        if (match) {
            const hash = await bcrypt.hash(newPassword, 10);
            await Manager.findOneAndUpdate(
                { _id: managerID },
                { $set: { password: hash } },
                { returnOriginal: false }
            );

            res.status(200).send(true);
        } else {
            res.status(200).send(false);
        }
    } catch (err) {
        res.status(500).send(err);
    }
});


const patientfUpdatePassword = (async (req, res) => {
    let patientID = req.body.patientID
    let password = req.body.password

    try {
        const hash = await bcrypt.hash(password, 10);
        await User.findOneAndUpdate(
            { _id: patientID },
            { $set: { password: hash } },
            { returnOriginal: false }
        );
        res.status(200).end();
    } catch (err) {
        res.status(500).send(err);
    }
});

const doctorfUpdatePassword = (async (req, res) => {
    let doctorID = req.body.doctorID
    let password = req.body.password

    try {
        const hash = await bcrypt.hash(password, 10);
        await Doctor.findOneAndUpdate(
            { _id: doctorID },
            { $set: { password: hash } },
            { returnOriginal: false }
        );

        res.status(200).end();
    } catch (err) {
        res.status(500).send(err);
    }
});

const managerfUpdatePassword = (async (req, res) => {
    let managerID = req.body.managerID
    let password = req.body.password

    try {
        const hash = await bcrypt.hash(password, 10);
        await Manager.findOneAndUpdate({
            _id: managerID
        }, {
            $set: {
                password: hash
            }
        }, {
            returnOriginal: false,
        });
        res.status(200).end();
    } catch (err) {
        res.status(500).send(err);
    }
});

export {
    patientUpdatePassword,
    doctorUpdatePassword,
    managerUpdatePassword,
    patientfUpdatePassword,
    managerfUpdatePassword,
    doctorfUpdatePassword
}