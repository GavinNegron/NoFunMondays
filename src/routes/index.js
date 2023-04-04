module.exports = function(app){
    app.get('/', function(req, res){
       res.render('landing.ejs')
    });
    app.get('/404', function(req, res){
        res.render('404.ejs')
     });
    app.use((req, res, next) => {
        res.status(404).redirect('/404');
    });
}