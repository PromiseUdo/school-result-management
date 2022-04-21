const express = require('express')
const router = express.Router({ mergeParams: true })
const superadmin = require('../controllers/superadmin')
const student = require('../controllers/student')
const result = require('../controllers/result')
const teacher = require('../controllers/teacher')
const classCat = require('../controllers/class')
const subject = require('../controllers/subject')
const { cookieJwtAuth } = require('../middleware/cookieJwtAuth')

router.route('/dashboard').get(cookieJwtAuth, superadmin.renderDashboard)

router
  .route('/add_new_student')
  .get(cookieJwtAuth, student.renderAddNewStudent)
  .post(cookieJwtAuth, student.createNewStudent)

router
  .route('/promote_all_students')
  .get(cookieJwtAuth, student.renderPromoteAllStudent)

router
  .route('/promote_some_students')
  .get(cookieJwtAuth, student.renderSomeStudents)

router.route('/demote_student').get(cookieJwtAuth, student.renderDemoteStudent)


router.route('/upload_results').get(cookieJwtAuth, result.renderUploadResults)

router.route('/view_students')
  .get(cookieJwtAuth, student.renderSelectClass)
  .post(cookieJwtAuth, student.fetchSelectedClass)

router
  .route('/result_by_subject')
  .get(cookieJwtAuth, result.renderResultBySubject)

router.route('/result_by_class').get(cookieJwtAuth, result.renderResultsByClass)

router.route('/publish_result').get(cookieJwtAuth, result.renderPublishResults)

router.route('/settings').get(cookieJwtAuth, superadmin.renderSettings)

router
  .route('/add_teacher')
  .get(cookieJwtAuth, teacher.renderAddTeacher)
  .post(cookieJwtAuth, teacher.createNewTeacher)

router.route('/view_teachers').get(cookieJwtAuth, teacher.renderViewTeachers)

router
  .route('/edit_student/:id')
  .get(cookieJwtAuth, student.renderEditStudent)
  .put(cookieJwtAuth, student.updateStudent)

router
  .route('/add_class')
  .get(cookieJwtAuth, classCat.renderAddClass)
  .post(cookieJwtAuth, classCat.createNewClass)

router
  .route('/edit_class/:id')
  .put(cookieJwtAuth, classCat.updateClassCat)
  .delete(cookieJwtAuth, classCat.deleteClassCat)

router
  .route('/add_subject')
  .get(cookieJwtAuth, subject.renderAddSubject)
  .post(cookieJwtAuth, subject.createNewSubject)

router
  .route('/edit_subject/:id')
  .put(cookieJwtAuth, subject.updateSubject)
  .delete(cookieJwtAuth, subject.deleteSubject)

router.route('/delete_teacher/:id').delete(cookieJwtAuth, teacher.deleteTeacher)

router.route('/delete_student/:id').delete(cookieJwtAuth, student.deleteStudent)

router
  .route('/edit_teacher/:id')
  .get(cookieJwtAuth, teacher.renderEditTeacher)
  .put(cookieJwtAuth, teacher.editTeacher)

module.exports = router
