import bcrypt from 'bcrypt'

//patient login
const patientAuth = (async (req, res) => {
    const { User } = await import('../models/user.js')
    let username = req.body.username
    let password = req.body.password

    try {
        const result = await User.findOne({ username: username }).exec();

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

    const { Doctor } = await import('../models/doctor.js')

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

    const { Manager } = await import('../models/manager.js')

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

export {
    patientAuth,
    doctorAuth,
    managerAuth
}