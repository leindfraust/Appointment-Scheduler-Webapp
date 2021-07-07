const express = require('express');
const router = express.Router();
const specializationList = require('../../model/specializationList');

router.get('/', async (req, res) => {
    try {
        const specialList = await specializationList.find()
        if(!specialList) throw new Error('no items')
        res.status(200).json(specialList)
    } catch (error) {
        res.status(500).json({message: error.message})
    }
});

router.post('/', async(req, res) => {
    try {
        const specialList = await new specializationList.save()
        if(!specialList) throw new Error('Cannot save')
        res.status(200).json(specialList)
    } catch (err) {
        res.status(500).json({message: err.message})
    }
});

router.put('/:id', async (req, res) => {
    const {id} = req.paramst
    try {
        const specialList = await specializationList.findByIdAndUpdate(id, req.body)
        if(!specialList) throw new Error('cannot update')
        const updated = {
            ...specialList._doc,
            ...req.body
        }
        res.status(200).json(updated)
    } catch (err) {
        res.status(500).json({message: err.message})
    }
});

router.delete('/:id', async (req, res) => {
    const {id} = req.params
    try {
        const specialistList = await specializationList.findByIdAndDelete(id) 
        if(!specialistList) throw new Error('something went wrong, try again later')
        res.status(200).json(specialistList)
    } catch(err) {
        res.status(500).json({message: err.message})
    }
});

module.exports = router;