var express = require('express');
var router = express.Router();
const fs = require('fs');
const bodyParser = require('body-parser');
//const fileUpload = require('express-fileupload');

const uploadFile = require("../middleware/upload");

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Edge config server' });
});

/* GET config */
router.get('/config', async(req, res) => {
  const configPath =  __basedir + "/configs/configs.json";
  res.download(configPath, "configs.json", (err) => {
    if (err) {
      res.status(500).send({
        message: "Could not download the config file. " + err,
      });
    }
  });
});

router.get('/config/ocr', async(req, res) => {
  const configPath =  __basedir + "/configs/ocr.yaml";
  res.download(configPath, "ocr.yaml", (err) => {
    if (err) {
      res.status(500).send({
        message: "Could not download the config file. " + err,
      });
    }
  });
});

router.get('/config/pc', async(req, res) => {
  const configPath =  __basedir + "/configs/pc.yaml";
  res.download(configPath, "pc.yaml", (err) => {
    if (err) {
      res.status(500).send({
        message: "Could not download the config file. " + err,
      });
    }
  });
});

router.post('/config/pc',  async (req, res) => {
  try {
    await uploadFile(req, res);

    if (req.file == undefined) {
      return res.status(400).send({ message: "Upload a file please!" });
    }

    const confFileName = "pc.yaml"
    const configPath =  __basedir + "/configs/";
    const configFilePath = configPath + confFileName;
    const copyFileName = confFileName.split('.').join('-' + Date.now() + '.')
    const copyFilePath = configPath + 'prev/' + copyFileName;
    // Copying sample_file.txt to a different name
    fs.copyFile(configFilePath, copyFilePath, (err) => {
      if (err) {
        console.log("Copy file failed: An Error Occured:", err);
      }
      else {
        // Printing the current file name after executing the function
        console.log("File Contents of async_copied_file:",
        fs.readFileSync(copyFilePath, "utf8"));
      }
    })
    res.status(200).send({
      message: "The following file was uploaded successfully: " + req.file.originalname,
    });
  } 
catch (err) {
    if (err.code == "LIMIT_FILE_SIZE") {
        return res.status(500).send({
          message: "File larger than 2MB cannot be uploaded!",
        });
      }
    res.status(500).send({
      //${req.file.originalname}.
      message: `Unable to upload the file:  ${err}`,
    });
  }
});


module.exports = router;
