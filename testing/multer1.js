const express = require("express");
const util    = require( 'util' );
const multer  = require( 'multer' );

const router = express.Router();



var storage = multer.diskStorage(
    {
        destination: '/Users/mannir/GitHub/egatepass/uploads/',
        filename: function ( req, file, cb ) {
            //req.body is empty...
            //How could I get the new_file_name property sent from client here?
            cb( null, file.originalname+ '-' + Date.now()+".pdf");
        }
    }
);
var upload = multer( { storage: storage } );


router.get("/", (req, res) => {
  res.json({ message: "Received!" });
});

router.post("/", (req, res) => {
    upload.single( 'file' )
  res.json({ message: "Received!" });
});


// router.post('/')( upload.single( 'file' ), post )


// function post( request, response ) {
//     console.log(+ new Date())
//     response.json( { message: 'Files Uploaded!' } );
// }
module.exports = router;







