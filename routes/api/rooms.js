const express = require('express');
const router = express.Router();
const Rooms = require('../../model/rooms');

router.get('/', async (req, res) => {
    try {
        const RoomsList = await Rooms.find()
        if (!RoomsList) throw new Error('no items')
        res.status(200).json(RoomsList)
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
});

router.post('/', async (req, res) => {
    const newRoom = new Rooms(req.body)
    try {
        const RoomsList = await newRoom.save()
        if (!RoomsList) throw new Error('Cannot save')
        res.status(200).json(RoomsList)
    } catch (err) {
        res.status(500).json({
            message: err.message
        })
    }
});

router.put('/:id', async (req, res) => {
    const {
        id
    } = req.params
    try {
        const response = await Rooms.findByIdAndUpdate(id, req.body)
        if (!response) throw new Error('cannot update')
        const updated = {
            ...response._doc,
            ...req.body
        }
        res.status(200).json(updated)
    } catch (err) {
        res.status(500).json({
            message: err.message
        })
    }
});

router.delete('/:id', async (req, res) => {
    const {
        id
    } = req.params
    try {
        const removed = await Rooms.findByIdAndDelete(id)
        if (!removed) throw new Error('something went wrong, try again later')
        res.status(200).json(removed)
    } catch (err) {
        res.status(500).json({
            message: err.message
        })
    }
});

module.exports = router;