Subject = require('../models/subject')
ClassCat = require('../models/class')
const User = require('../models/users')
const genders = ['Male', 'Female']
const JWT = require('jsonwebtoken')

module.exports.renderAddTeacher = async (req, res) => {
  const schoolToken = req.cookies.schoolToken
  const school = JWT.verify(schoolToken, `${process.env.JWT_SECRET_KEY}`)

  const subjects = await Subject.find({ school: school.school.id })
  const classes = await ClassCat.find({ school: school.school.id })
  res.render('teacher/addTeacher', { subjects, classes })
}

module.exports.renderViewTeachers = async (req, res) => {
  const schoolToken = req.cookies.schoolToken
  const school = JWT.verify(schoolToken, `${process.env.JWT_SECRET_KEY}`)

  const teachers = await User.find({
    role: 'teacher',
    school: school.school.id,
  })
  res.render('teacher/view', { teachers })
}

module.exports.editTeacher = async (req, res) => {
  try {
    const { id } = req.params
    const teacher = await User.findByIdAndUpdate(id, { ...req.body })
    res.redirect('/superadmin/view_teachers')
  } catch (e) {
    console.log(e)
  }
}

module.exports.createNewTeacher = async (req, res) => {
  const schoolToken = req.cookies.schoolToken
  const school = JWT.verify(schoolToken, `${process.env.JWT_SECRET_KEY}`)

  const randomPassword = Math.random().toString(36).slice(-8)
  console.log(randomPassword, 'random Password')

  const {
    username,
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
    subjectname,
    classname,
    phone,
    email,
    password,
  } = req.body
  const teacher = new Teacher({ name, email, password, class_id, subject_id })
  teacher.school = school.school.id
  await teacher.save()
  res.redirect('/teacher/view_teachers')
}

module.exports.deleteTeacher = async (req, res) => {
  try {
    const { id } = req.params
    const teacher = await User.findByIdAndDelete(id)
    res.redirect('/superadmin/view_teachers')
  } catch (e) {
    console.log(e)
  }
}

module.exports.renderEditTeacher = async (req, res) => {
  const schoolToken = req.cookies.schoolToken
  const school = JWT.verify(schoolToken, `${process.env.JWT_SECRET_KEY}`)

  try {
    const { id } = req.params
    const subjects = await Subject.find({ school: school.school.id })
    const classes = await ClassCat.find({ school: school.school.id })
    const teacher = await User.findByIdAndUpdate(id, { ...req.body })
    res.render('teacher/editTeacher', { teacher, genders, subjects, classes })
  } catch (e) {
    console.log(e)
  }
}
