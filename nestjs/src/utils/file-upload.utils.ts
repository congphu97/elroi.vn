import { extname } from 'path';
import { HttpException, HttpStatus } from '@nestjs/common';
import * as path from 'path';
// Allow only images
export const imageFileFilter = (req, file, callback) => {
  // if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
  //   return callback(
  //     new HttpException(
  //       'Only image files are allowed!',
  //       HttpStatus.BAD_REQUEST,
  //     ),
  //     false,
  //   );
  // }
  // callback(null, true);

  let ext = path.extname(file.originalname);

  if (!ext.match(/\.(jpg|jpeg|png|gif)$/)) {
    req.fileValidationError = 'Invalid file type';
    return callback(new Error('Invalid file type'), false);
  }

  return callback(null, true);

};


export const editFileName = (req, file, callback) => {
  const name = file.originalname.split('.')[0];
  const fileExtName = extname(file.originalname);

  callback(null, `${name}${fileExtName}`);
};