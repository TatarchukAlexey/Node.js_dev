const multer  = require('multer');
//Multer - это промежуточное программное обеспечение node.js для обработки ..
//...multipart / form-data, которое в основном используется для загрузки файлов.
const fs = require('fs');
const path = require('path');
const util = require('util');

const renameFile = util.promisify(fs.rename);

const TEMP_IMAGE_FOLDER = path.join(__dirname, 'assets');
const USER_IMAGE_FOLDER = path.join(__dirname, 'assets', 'images');

const storage = multer.diskStorage({
  // определяем папку куда сохранять временное изображение
  destination: (req, file, next) => {
    next(null, TEMP_IMAGE_FOLDER)
  },
  // определяем имя файла
  filename: (req, file, next) => {
    next(null, file.originalname)
  }
});

// Применяем настройки
const upload = multer({ storage });

const moveImage = (fileObject) => {
  //  cоздаем папку для файлов пользователя
  if (!fs.existsSync(USER_IMAGE_FOLDER)){
    fs.mkdirSync(USER_IMAGE_FOLDER);
  }

  const userImageFolderName = '/assets/images/' + fileObject.originalname;

  const tempFilePath = path.join(TEMP_IMAGE_FOLDER, fileObject.originalname);
  const newFilePath = path.join(USER_IMAGE_FOLDER, fileObject.originalname);

  return renameFile(tempFilePath, newFilePath)
    .then(() => userImageFolderName)
    .catch((error) => console.log(error))
};

const saveImageMultipart = (req, res) => {
  // Берем файл
  const fileObject = req.file;
  // Берем другие данные что пришли
  console.log('body', req.body);
  const userData = { ...req.body };
  moveImage(fileObject)
    .then(userImageFolderName => {
      userData.avatar = userImageFolderName;
      res.json({ status: 'was saved in folder: ' +  userImageFolderName });
    })
};
// добавляем промежуточный обработчик для post-multipart запросов
module.exports = () => [upload.single('file'), saveImageMultipart];