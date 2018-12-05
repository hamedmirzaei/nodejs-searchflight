
const express = require('express')
const router = express.Router()
const { check, validationResult } = require('express-validator/check')
const { matchedData } = require('express-validator/filter')
const multer = require('multer')
const upload = multer({ storage: multer.memoryStorage() })
const dateFormat = require('dateformat');
const mongoose = require('mongoose');
const FlightSearch = require('./models/flightsearch');
const City = require('./models/city');

router.get('/', (req, res) => {
  res.render('index')
})

router.get('/searchflight', (req, res) => {
  var now = dateFormat(new Date(), "mm/dd/yyyy");
  res.render('searchflight', {
    data: {returndate: now, departdate: now},
    errors: {},
    csrfToken: req.csrfToken()
  })
})

router.post('/searchflight', [
	check('fromcity')
		.isLength({ min: 1 })
		.withMessage('From city is required')
		.trim(),
	check('tocity')
		.isLength({ min: 1 })
		.withMessage('To city is required')
		.trim(),
	check('departdate')
		.isAfter(dateFormat(new Date(), "mm/dd/yyyy"))
		.withMessage('Departure date should be greater than current date'),
	check('returndate')
		.isAfter(dateFormat(new Date(), "mm/dd/yyyy"))
		.withMessage('Return date should be greater than current date')
	], (req, res) => {
		const errors = validationResult(req)
		if (!errors.isEmpty()) {
			return res.render('searchflight', {
				data: req.body,
				errors: errors.mapped(),
				csrfToken: req.csrfToken()
			})
		}

		const data = matchedData(req)
		console.log('Sanitized:', data)
		
		var fromcityinst = new City({ _id: new mongoose.Types.ObjectId(), name: req.body.fromcity });
		var tocityinst = new City({ _id: new mongoose.Types.ObjectId(), name: req.body.tocity });
		var flightsearchinst = new FlightSearch({_id: new mongoose.Types.ObjectId(), fromcity: fromcityinst, 
												tocity: tocityinst, depart_date: req.body.departdate, 
												return_date: req.body.returndate});
												
		fromcityinst.save(function (err) {
			if (err) console.log('From city failed!' + err);
			else console.log('From city saved successfully: ' + fromcityinst);
		})
		tocityinst.save(function (err) {
			if (err) console.log('To city failed!' + err)
			else console.log('To city saved successfully: ' + tocityinst)
		})
		flightsearchinst.save(function (err) {
			if (err) console.log('FlightSearch failed!' + err)
			else console.log('FlightSearch saved successfully: ' + flightsearchinst)
		})
		
		req.flash('success', 'Data has been saved to two simple schemas in MonogoDB')
		req.flash('detail', 'Thanks for testing my code. I will implement it all if you give me a chance :)')
		res.redirect('/')
	}
)

module.exports = router
