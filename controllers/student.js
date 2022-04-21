const Student = require('../models/student')
const checkerPin = require('../models/checkerPin')
ClassCat = require('../models/class')
const genders = ['Male', 'Female']
const paymentStatuses = ['No Payment', 'Partial Payment', 'Full Payment']
const bcrypt = require('bcrypt')
const JWT = require('jsonwebtoken')

module.exports.renderAddNewStudent = async (req, res) => {
  const schoolToken = req.cookies.schoolToken
  const school = JWT.verify(schoolToken, `${process.env.JWT_SECRET_KEY}`)

  const classCats = await ClassCat.find({school: school.school.id})
  res.render('student/new', { classCats })
}

module.exports.renderPromoteAllStudent = (req, res) => {
  res.render('student/promoteall')
}

module.exports.renderSomeStudents = (req, res) => {
  res.render('student/promotesome')
}

module.exports.renderDemoteStudent = (req, res) => {
  res.render('student/demote')
}

module.exports.updateStudent = async (req, res) => {
  try {
    const { id } = req.params
    const student = await Student.findByIdAndUpdate(id, { ...req.body })
    res.redirect('/superadmin/view_students')
  } catch (e) {
    console.log(e)
  }
}

module.exports.deleteStudent = async (req, res) => {
  try {
    const { id } = req.params
    await Student.findByIdAndDelete(id)
    res.redirect('/superadmin/view_students')
  } catch (e) {
    console.log(e)
  }
}

module.exports.renderSelectClass = async (req, res) => {
  const classCats = await ClassCat.find({})
  res.render('student/viewSelect', { classCats })
}

module.exports.fetchSelectedClass = async (req, res) => {
  const schoolToken = req.cookies.schoolToken
  const school = JWT.verify(schoolToken, `${process.env.JWT_SECRET_KEY}`)
  
  const students = await Student.find({ currClass: req.body.selectClass, school: school.school.id })
  const classCats = await ClassCat.find({})

  res.render('student/view', { students, classCats })
}

module.exports.renderEditStudent = async (req, res) => {
  try {
    const { id } = req.params
    const student = await Student.findById(id)
    const classCats = await ClassCat.find({})
    res.render('student/editStudent', {
      genders,
      paymentStatuses,
      student,
      classCats,
    })
  } catch (e) {
    console.log(e)
  }
}

module.exports.createNewStudent = async (req, res) => {
  const schoolToken = req.cookies.schoolToken
  const school = JWT.verify(schoolToken, `${process.env.JWT_SECRET_KEY}`)
  console.log(school.school.id, 'school currently logged in')

  let passportUrl = ''
  try {
    let {
      surname,
      firstname,
      middlename,
      gender,
      dob,
      weight,
      height,
      country,
      state,
      lga,
      address,
      parentName,
      relationship,
      phone,
      email,
      feeStatus,
      formerSchool,
      startYear,
      endYear,
      sportHouse,
      hobbies,
      disabilities,
    } = req.body



    if (!req.files) {
      res.send({
        status: false,
        message: 'No passport uploaded',
      })
    } else {
      let photo = req.files.passport
      photo.mv('./public/passportUploads/' + photo.name)
      passportUrl = `/passportUploads/${photo.name}`
      //send response
      // res.send({
      //   status: true,
      //   message: 'Passport is uploaded',
      //   data: {
      //     name: photo.name,
      //     mimetype: photo.mimetype,
      //     size: photo.size,
      //   },
      // })
    }
    //generate a random password
    const password = Math.random().toString(36).slice(-8)

    //save the password to checkerPin collection
    const checkerPinData = {
      pin: password,
      pinSession: '2021/2022',
      pinStatus: 'unused',
      useCount: 0,
    }
    const checkerPinInstance = new checkerPin(checkerPinData)
    checkerPinInstance.school = school.school.id

    const student = new Student({ passportUrl, ...req.body })
    student.school = school.school.id
    await student.save()
    await checkerPinInstance.save()
    res.redirect('/superadmin/add_new_student')
  } catch (e) {
    res.send(e.message)
  }
}
