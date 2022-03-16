module.exports.renderAddTeacher = (req, res) => {
  res.render('teacher/addTeacher')
}

module.exports.renderViewTeachers = (req, res) => {
  res.render('teacher/view')
}

module.exports.renderEditTeacher = (req, res)=>{
  res.render('teacher/editTeacher')
}
