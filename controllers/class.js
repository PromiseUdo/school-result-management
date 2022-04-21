ClassCat = require('../models/class')
const JWT = require('jsonwebtoken')

module.exports.renderAddClass = async (req, res) => {
  const classCats = await ClassCat.find({})
  res.render('class/addNew', { classCats })
}

module.exports.createNewClass = async (req, res) => {
  const schoolToken = req.cookies.schoolToken
  const school = JWT.verify(schoolToken, `${process.env.JWT_SECRET_KEY}`)

  try {
    const classCat = new ClassCat({ ...req.body })
    //add the id of the school
    classCat.school = school.school.id
    await classCat.save()
    res.redirect('/superadmin/add_class')
  } catch (e) {
    console.log(e)
  }
}

module.exports.updateClassCat = async (req, res) => {
  const schoolToken = req.cookies.schoolToken
  const school = JWT.verify(schoolToken, `${process.env.JWT_SECRET_KEY}`)

  try {
    const { id } = req.params
    const classCat = await ClassCat.findOneAndUpdate(
      { id, school: school.school.id },
      { ...req.body }
    )
    res.redirect('/superadmin/add_class')
  } catch (error) {
    console.log('Error:', e)
  }
}

module.exports.deleteClassCat = async (req, res) => {
  try {
    const { id } = req.params
    const classCat = await ClassCat.findOneAndDelete({
      id,
      school: school.school.id,
    })
    res.redirect('/superadmin/add_class')
  } catch (error) {
    console.log('Error', e)
  }
}
