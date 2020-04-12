var express = require('express');
var router = express.Router();
var Employee = require('../models/employee');

/* GET home page. */
router.get('/', function (req, res) {
  res.render('index', { title: 'Express' });
});

router
  .route('/employee')
  .get(function (req, res) {
    // console.log('employee', req.body);
    // console.log('Checking', res);
    Employee.find().exec(function (err, employees) {
      console.log('err', err);
      console.log('employees', employees);
      if (err) {
        console.error(err);
        res.status(300).json({ status: error, message: err });
      } else {
        res.json({
          status: 'Success',
          data: employees,
        });
      }
    });
  })
  .post(function (req, res) {
    console.log('employee', req.body);
    let employee = new Employee(req.body);
    employee.save((err, t) => {
      if (err) {
        console.error(err);
        res.json(err);
      } else {
        res.json({
          status: 'Success',
          data: employee,
        });
      }
    });
  })
  .put(function (req, res) {
    console.log('employee', req.body);
    let updateEmployee = req.body;
    let employee = Employee.findByIdAndUpdate(
      updateEmployee._id,
      { name: updateEmployee.name },
      (err, doc) => {
        if (err) {
          console.error(err);
          res.json(err);
        } else {
          res.json({
            status: 'Success',
            data: updateEmployee,
          });
        }
      }
    );
  })
  .delete(function (req, res) {
    let deleteEmployee = req.body;
    Employee.findByIdAndDelete(deleteEmployee._id, (err, doc) => {
      if (err) {
        console.error(err);
        res.json(err);
      } else {
        console.log(doc, doc);
        res.json({
          status: 'Success',
          data: deleteEmployee,
        });
      }
    });
  });

module.exports = router;
