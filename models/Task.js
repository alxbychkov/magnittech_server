import mongoose from 'mongoose';

const schema = new mongoose.Schema({
    name: {type: String, required: true},
    description: {type: String, default: ''},
    status: {type: String, default: 'Не активный'},
    ends: {type: Date, default: Date.now()},
    files: {type: [String], default: []},
    comments: {type: [String], default: []}
});

export default mongoose.model('Task', schema);