module.exports.renderUploadResults = (req, res) => {
  res.render('results/upload')
}


module.exports.renderResultBySubject = (req, res) => {
    res.render('results/resultsBySubject')
}

module.exports.renderResultsByClass = (req, res) => {
    res.render('results/resultsByClass')
}

module.exports.renderPublishResults = (req, res) => {
  res.render('results/publishResult')
}