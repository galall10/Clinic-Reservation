const express = require('express');
const router = express.Router();

const {
    createAppointment,
    deleteAppointment,
    updateAppointment,
    getAppointment,
    getAllPatientAppointments
} = require('../controllers/appointments');

router.route('/:id').post(createAppointment)
.delete(deleteAppointment)
.patch(updateAppointment)
.get(getAppointment);
router.route('/').get(getAllPatientAppointments);

module.exports = router;