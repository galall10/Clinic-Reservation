const express = require('express');
const router = express.Router();

const {
    getAllDoctorSlots,
    getSlot,
    createSlot,
    updateSlot, 
    deleteSlot
} = require('../controllers/slots');

router.route('/').post(createSlot);
router.route('/:id').get(getSlot).patch(updateSlot).delete(deleteSlot);
router.route('/doctor/:id').get(getAllDoctorSlots);
module.exports = router;