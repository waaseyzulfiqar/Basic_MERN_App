const mongoose = require('mongoose')
const { Schema } = mongoose;

mongoose.connect('mongodb+srv://Waasey_Zulfiqar:987654321@cluster0.46ynt.mongodb.net/basicBackendProject')

const crudSchema = new Schema({
  name: String,
  age: Number
});

module.exports = mongoose.model('Data', crudSchema)