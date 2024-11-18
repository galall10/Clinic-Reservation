const mongoose = require('mongoose');

const AppointmentSchema = new mongoose.Schema({
    Slot: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Slot',
        required: [true, 'Please provide slot']
    },
    Patient: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'Please provide patient']
    }
},{ timestamps: true }
)

module.exports = mongoose.model('Appointment', AppointmentSchema)