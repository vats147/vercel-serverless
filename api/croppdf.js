// Import necessary libraries
const { PDFDocument } = require('pdf-lib');
const multer = require('multer');
const fs = require('fs');

// Set up multer to handle file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './');
  },
  filename: (req, file, cb) => {
    check++;
    fname = `${file.fieldname} ${check}-${Date.now()}.pdf`;
    console.log("Filename : " + fname);
    cb(null, fname);
  },
});

const upload = multer({ storage });

// Define the serverless function
module.exports = async (req, res) => {
  var check = 0;
  var fname;

  // Read the input PDF file
  const file = req.file;
  if (!file) {
    const error = new Error("Please upload a file");
    error.httpStatusCode = 400;
    res.status(400).json({data:"NO File  "})
  }

  // Your existing cropPDF function
  async function cropPDF(inputPath, outputPath, x, y, width, height) {
    // Read the input PDF file
    let pdfDoc = await PDFDocument.load(fs.readFileSync(inputPath));

    // Loop through all pages in the PDF
    for (let i = 0; i < pdfDoc.getPages().length; i++) {
      let page = pdfDoc.getPage(i);
      page.setCropBox(x, y, width, height);
    }

    // Save the output PDF file
    fs.writeFileSync(outputPath, await pdfDoc.save());
    fs.unlink(fname, (err) => {
      if (err) {
        console.error(err);
      } else {
        console.log('File deleted successfully');
      }
    });

    res.download(outputPath);
  }

  // Your existing code for handling different Ecommerce cases
  if (req.body.Ecommerce == 1) {

    // Amazon Crop
    // ...
  } else if (req.body.Ecommerce == 2) {
       res.status(200).json({data:"Flipkart Called"})
    // Flipkart Crop
    // ...
  } else if (req.body.Ecommerce == 3) {
    // Meesho Crop
    // ...
  } else if (req.body.Ecommerce == 4) {
    // GlowRoad Crop
    // ...
  }

  // Send response
//   res.send("File downloaded");
};
