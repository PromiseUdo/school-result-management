const Student = require('../models/users')

module.exports.renderAddNewStudent = (req, res) => {
  res.render('student/new')
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

module.exports.renderViewStudents = (req, res) => {
  res.render('student/view')
}

module.exports.renderEditStudent = (req, res) => {
  res.render('student/editStudent')
}

module.exports.createNewStudent = async (req, res) => {
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
      photo.mv('./passportUploads/' + photo.name)
      passportUrl = `./passportUploads/${photo.name}`
      //send response
      res.send({
        status: true,
        message: 'Passport is uploaded',
        data: {
          name: photo.name,
          mimetype: photo.mimetype,
          size: photo.size,
        },
      })
    }

    const student = new Student({ passportUrl, ...req.body })
    await student.save()
  } catch (e) {
    res.send(e.message)
  }
}
