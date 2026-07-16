exports.getfiledownload = (req,res) =>{

    if(!req.query.file){
        res.status(401).render('errors/401');
    }
    else{
        const filePath = process.env.basedir + req.query.file;

        res.download(
            filePath,
            (err) => {
                if (err) {
                    res.status(404).render('errors/404');
                }
        });
    }
};