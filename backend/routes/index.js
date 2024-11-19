module.exports = function(app){
app.use((req, res, next) => {
        res.status(404).redirect('/404');
    });
}