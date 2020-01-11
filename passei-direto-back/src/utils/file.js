import fs from 'fs';
import path from 'path';

export const readFile = filePath => {
  return fs.readFileSync(filePath);
};

export const deleteFile = filePath => {
  return fs.unlinkSync(filePath);
};

export const fileNameGenerator = length => {
  var result = '';
  var characters =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
};

export const createFile = file => {
  const fileName = fileNameGenerator(15);
  const fileType = file.mimetype.split('/')[1];
  const relativePath = `/upload/${fileName}.${fileType}`;
  const filePath = `${path.dirname(require.main.filename)}${relativePath}`;

  return new Promise(function(resolve, reject) {
    file.mv(filePath, function(err) {
      if (err) reject('Error while saving temporary file');

      resolve(relativePath);
    });
  });
};
