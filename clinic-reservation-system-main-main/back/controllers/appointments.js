const Appointment = require('../models/Appointment');
const Slot = require('../models/Slot');
const {BadRequestError, UnauthenticatedError, NotFoundError} = require('../errors');
const {StatusCodes} = require('http-status-codes');

const createAppointment = async (req, res) => {
    if(!(req.user.userType === 'Patient')){
        throw new UnauthenticatedError(`You dont't have persmissions`)
    }
    const slot = await Slot.findOne({_id: req.params.id});
    if(!slot){
        throw new NotFoundError(`No slot with id ${req.params.id}`)
    }
    const appointment = await Appointment.create({Patient: req.user.userId, Slot: req.params.id})
    res.status(StatusCodes.CREATED).json({ appointment })
}

const updateAppointment = async (req, res) => {
    const {
        body: { slot },
        user: { userId, userType },
        params: { id: appointmentId },
    } = req
      if(!(userType === 'Patient')){
        throw new UnauthenticatedError(`You dont't have persmissions`)
    }
    if(!slot){
        throw new BadRequestError(`Please provide a slot`);
    }
    if (slot === '') {
        throw new BadRequestError('slot field cannot be empty')
    }
    const appointment = await Appointment.findOneAndUpdate(
        { _id: appointmentId, Patient: userId },
        {Slot: slot},
        { new: true, runValidators: true }
    )
    if (!appointment) {
        throw new NotFoundError(`No appointment with id ${appointmentId}`)
    }
    res.status(StatusCodes.OK).json({ appointment })
}

const deleteAppointment = async (req, res) => {
    if(!(req.user.userType === 'Patient')){
        throw new UnauthenticatedError(`You dont't have persmissions`)
    }
    const {
        user: { userId },
        params: { id: appointmentId },
      } = req
    const appointment = await Appointment.findOneAndRemove({
        _id: appointmentId,
        Patient: userId,
    })
    if (!appointment) {
        throw new NotFoundError(`No appointment with id ${appointmentId}`)
        }
    res.status(StatusCodes.OK).send(`Appointment removed successfully`)
}

const getAppointment = async (req, res) => {
    if(!(req.user.userType === 'Patient')){
        throw new UnauthenticatedError(`You dont't have persmissions`)
    }
    const appointment = await Appointment.findOne({
        _id: req.params.id
    })
    if (!appointment) {
        throw new NotFoundError(`No appointment with id ${req.params.id}`)
    }
    res.status(StatusCodes.OK).json({ appointment })
}

const getAllPatientAppointments = async (req, res) => {
    if(!(req.user.userType === 'Patient')){
        throw new UnauthenticatedError(`You dont't have persmissions`)
    }
    const appointments = await Appointment.find({ Patient: req.user.userId }).sort('createdAt')
    res.status(StatusCodes.OK).json({ appointments, count: appointments.length })

}

module.exports = {
    createAppointment,
    deleteAppointment,
    updateAppointment,
    getAppointment,
    getAllPatientAppointments
}