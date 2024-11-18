const Slot = require('../models/Slot');
const {BadRequestError, UnauthenticatedError, NotFoundError} = require('../errors');
const {StatusCodes} = require('http-status-codes');

const getAllDoctorSlots = async (req,res) => {
        const slots = await Slot.find({ doctor: req.params.id }).sort('createdAt')
        res.status(StatusCodes.OK).json({ slots, count: slots.length })
}

const getSlot = async (req,res) => {
      const slot = await Slot.findOne({
        _id: req.params.id
      })
      if (!slot) {
        throw new NotFoundError(`No job with id ${req.params.id}`)
      }
      res.status(StatusCodes.OK).json({ slot })
}

const createSlot = async (req,res) => {
    if(!(req.user.userType === 'Doctor')){
        throw new UnauthenticatedError(`You dont't have persmissions`)
    }
    req.body.doctor = req.user.userId;
    try {
        const slot = await Slot.create(req.body);
        res.status(StatusCodes.CREATED).json({ slot });
    } catch (error) {
        console.error(error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: 'Internal server error' });
    }
}

const updateSlot = async (req,res) => {
    const {
        body: { date, hour },
        user: { userId, userType },
        params: { id: slotId },
    } = req
      if(!(userType === 'Doctor')){
        throw new UnauthenticatedError(`You dont't have persmissions`)
    }
    if(!date || !hour){
        throw new BadRequestError(`Please provide date and hour`);
    }
    if (date === '' || hour === '') {
        throw new BadRequestError('date or hour fields cannot be empty')
    }
    const slot = await Slot.findByIdAndUpdate(
        { _id: slotId, doctor: userId },
        req.body,
        { new: true, runValidators: true }
    )
    if (!slot) {
        throw new NotFoundError(`No slot with id ${slotId}`)
    }
    res.status(StatusCodes.OK).json({ slot })
}

const deleteSlot = async (req,res) => {
    if(!(req.user.userType === 'Doctor')){
        throw new UnauthenticatedError(`You dont't have persmissions`)
    }
    const {
        user: { userId },
        params: { id: slotId },
      } = req
    const slot = await Slot.findByIdAndRemove({
        _id: slotId,
        doctor: userId,
    })
    if (!slot) {
        throw new NotFoundError(`No slot with id ${slotId}`)
        }
    res.status(StatusCodes.OK).send(`Slot removed successfully`)
}

module.exports = {
    getAllDoctorSlots,
    getSlot,
    createSlot,
    updateSlot,
    deleteSlot
}