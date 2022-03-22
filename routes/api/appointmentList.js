const express = require('express');
const router = express.Router();
const AppointmentList = require('../../models/appointmentList');

router.get('/', async (req, res) => {
    try {
        const appointmentList = await AppointmentList.find()
        if (!appointmentList) throw new Error('no items') 
        res.status(200).json(appointmentList)
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
});

router.post('/', async (req, res) => {
    const newAppointment = new AppointmentList(req.body)
    try {
        const appointmentList = await newAppointment.save()
        if (!appointmentList) throw new Error('Cannot save')
        res.status(200).json(appointmentList)
    } catch(err){
         res.status(500).json({ message: err.message})
    }
});

router.put('/:id', async (req,res) => {
    const {
        id
    } = req.params
    try {
        const response = await AppointmentList.findByIdAndUpdate(id, req.body)
        if(!response) throw new Error('cannot update')
        const updated = {...response._doc, ...req.body}
        res.status(200).json(updated)
    } catch(err) {
        res.status(500).json({message: err.message})
    }
});

router.delete('/:id', async(req, res) => {
    const { id } = req.params
    try {
        const removed = await AppointmentList.findByIdAndDelete(id)
        if(!removed) throw new Error('something went wrong, try again later')
        res.status(200).json(removed)
    } catch(err) {
        res.status(500).json({message: err.message})
    }
});

module.exports = router;