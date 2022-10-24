exports.uploadPic = (req, res) => {
    req.console.log('req');
    try {
        if (!req.files) {
            res.send({
                status: 'No file uploaded',
                link: 'undefined'
            })
        }
    } catch (error) {
        console.error(error)
    }
}