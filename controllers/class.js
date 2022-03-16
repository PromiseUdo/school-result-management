ClassCat = require('../models/class')

module.exports.renderAddClass = async (req, res) => {
  const classCats = await ClassCat.find({})
  res.render('class/addNew', { classCats })
}

module.exports.createNewClass = async (req, res) => {
  try {
    const classCat = new ClassCat({ ...req.body })
    await classCat.save()
    res.redirect('/superadmin/add_class')
  } catch (e) {
    console.log(e)
  }
}

module.exports.updateClassCat = async (req, res) => {
  try {
    const { id } = req.params
    const classCat = await ClassCat.findByIdAndUpdate(id, { ...req.body })
    res.redirect('/superadmin/add_class')
  } catch (error) {
    console.log('Error:', e)
  }
}

module.exports.deleteClassCat = async (req, res) => {
  try {
    const { id } = req.params
    const classCat = await ClassCat.findByIdAndDelete(id)
    res.redirect('/superadmin/add_class')
  } catch (error) {
    console.log('Error', e)
  }
}
