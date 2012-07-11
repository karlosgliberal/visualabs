
/*
 * GET home page.
 */

exports.index = function(req, res){
  res.render('index', { title: 'Express' })
};

exports.eu = function(req, res){
  res.render('eu', { title: 'Express' })
};
