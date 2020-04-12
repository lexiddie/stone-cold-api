var debug = require('debug')('http');
var mongoose = require('mongoose');
const Schema = mongoose.Schema;

var Employee = new mongoose.Schema({
  name: {
    type: String,
    unique: true,
    required: true,
    trim: true,
  },
});

module.exports = mongoose.model('employees', Employee);
