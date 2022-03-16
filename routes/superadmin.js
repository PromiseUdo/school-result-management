const express = require('express')
const router = express.Router({ mergeParams: true })
const superadmin = require('../controllers/superadmin')
const student = require('../controllers/student')
const result = require('../controllers/result')
const teacher = require('../controllers/teacher')
const classCat = require('../controllers/class')
const subject = require('../controllers/subject')

router.route('/index').get(superadmin.renderDashboard)

router
  .route('/add_new_student')
  .get(student.renderAddNewStudent)
  .post(student.createNewStudent)

router.route('/promote_all_students').get(student.renderPromoteAllStudent)

router.route('/promote_some_students').get(student.renderSomeStudents)

router.route('/demote_student').get(student.renderDemoteStudent)

router.route('/view_students').get(student.renderViewStudents)

router.route('/upload_results').get(result.renderUploadResults)

router.route('/result_by_subject').get(result.renderResultBySubject)

router.route('/result_by_class').get(result.renderResultsByClass)

router.route('/publish_result').get(result.renderPublishResults)

router.route('/add_teacher').get(teacher.renderAddTeacher)

router.route('/view_teachers').get(teacher.renderViewTeachers)

router.route('/edit_teacher').get(teacher.renderEditTeacher)

router.route('/edit_student').get(student.renderEditStudent)

router
  .route('/add_class')
  .get(classCat.renderAddClass)
  .post(classCat.createNewClass)

router
  .route('/edit_class/:id')
  .put(classCat.updateClassCat)
  .delete(classCat.deleteClassCat)

router.route('/add_subject')
  .get(subject.renderAddSubject)
  .post(subject.createNewSubject)

router.route('/edit_subject/:id')
  .put(subject.updateSubject)
  .delete(subject.deleteSubject)

module.exports = router

