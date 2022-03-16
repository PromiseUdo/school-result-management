Subject = require('../models/subject')

module.exports.renderAddSubject = async (req, res) => {
  const subjects = await Subject.find({})
  res.render('subject/addNew', { subjects })
}

module.exports.createNewSubject = async (req, res) => {
  try {
    const subject = new Subject({ ...req.body })
    await subject.save()
    res.redirect('/superadmin/add_subject')
  } catch (e) {
    console.log(e)
  }
}

module.exports.updateSubject = async (req, res) => {
  try {
    const { id } = req.params
    const subject = await Subject.findByIdAndUpdate(id, { ...req.body })
    res.redirect('/superadmin/add_subject')
  } catch (e) {
    console.log(e)
  }
}

module.exports.deleteSubject = async (req, res) => {
  try {
    const { id } = req.params
    const subject = await Subject.findByIdAndDelete(id)
    res.redirect('/superadmin/add_subject');
  } catch (e) {
    console.log(e)
  }
}
