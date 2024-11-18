const mongoose = require('mongoose');

const SlotSchema = new mongoose.Schema({
    date: {
        type: Date,
        required: [true, 'Please provide date in MM/DD/YYYY format ']
    },
    hour: {
        type: String,
        required: true,
        validate: {
            validator: function(v) {
                // Custom validator to check for "HH:mm" format
                return /^([01]\d|2[0-3]):([0-5]\d)$/.test(v); // Regular expression for "HH:mm" format
            },
            message: props => `${props.value} is not in the HH:mm format!`
        }
    },
    doctor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'Please provide doctor']
    },
},{ timestamps: true }
)

SlotSchema.pre('save', function(next) {
    const date = this.date;

    if (typeof date === 'string') {
        const dateComponents = date.split('/');

        if (dateComponents.length === 3) {
            const dateObject = new Date(`${dateComponents[2]}-${dateComponents[0]}-${dateComponents[1]}`);

            if (!isNaN(dateObject)) {
                this.date = dateObject.toISOString();
            } else {
                console.error('Invalid date format');
            }
        } else {
            console.error('Date components are not valid');
        }
    } else if (date instanceof Date) { // Check if it's already a Date object
        if (!isNaN(date)) {
            this.date = date.toISOString();
        } else {
            console.error('Invalid date format');
        }
    } else {
        console.error('Date is neither a string nor a Date object');
    }

    next();
});


module.exports = mongoose.model('Slot', SlotSchema)