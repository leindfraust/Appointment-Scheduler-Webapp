const express = require('express');
const router = express.Router();
const manager = require('../../models/manager')

router.get('/', async (req, res) => {
    try {
        const managerList = await manager.find()
        if(!managerList) throw new Error('no items')
        res.status(200).json(managerList)
    } catch (error) {
        res.status(500).json({message: error.message})
    }
});

router.post('/', async(req, res) => {
    const newManagerList = new manager(req.body)
    try {
        const managerList = await newManagerList.save()
        if(!managerList) throw new Error('Cannot save')
        res.status(200).json(managerList)
    } catch (err) {
        res.status(500).json({message: err.message})
    }
});

router.put('/:id', async (req, res) => {
    const {id} = req.params
    try {
        const managerList = await manager.findByIdAndUpdate(id, req.body)
        if(!managerList) throw new Error('cannot update')
        const updated = {
            ...managerList._doc,
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
        const managerList = await manager.findByIdAndDelete(id) 
        if(!managerList) throw new Error('something went wrong, try again later')
        res.status(200).json(managerList)
    } catch(err) {
        res.status(500).json({message: err.message})
    }
});

module.exports = router;