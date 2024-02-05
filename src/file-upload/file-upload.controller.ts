import { Controller, Delete, FileTypeValidator, Get, MaxFileSizeValidator, Param, ParseFilePipe, Post, Req, Res, UploadedFile, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { checkFile, saveAs } from './filecode';
import * as fs from 'fs';

@Controller('file-upload')
export class FileUploadController {
  // @Post('upload')
  // @UseInterceptors(FileInterceptor('file'))
  // uploadFile(
  //   @UploadedFile(
  //     new ParseFilePipe({
  //       validators: [
  //         new MaxFileSizeValidator({ maxSize: 1000 }),
  //         new FileTypeValidator({ fileType: 'image/jpeg' }),
  //       ],
  //     }),
  //   )
  //   file: Express.Multer.File,
  // ) {
  //     console.log(file.originalname);
  //     return {
  //         statusCode: 201,
  //         message: 'File succesfully uploaded',
  //         fileName: file.originalname
  //     }
  // }

  @Post('multiple')
  @UseInterceptors(
    FilesInterceptor('image',3, {
    storage: diskStorage({
      destination: './src/files',
      filename: saveAs,
    }),
      fileFilter: checkFile,
    
  })
  )
  async multipleUploads(@UploadedFiles() files) {
    const res = [];
    files.forEach(item => {
      const fileRes = {
        originalName:item.originalname,
        fileName: item.filename,
        message: 'File uploaded successfully'
      };

      res.push(fileRes)
    });
   
    return res;
  }
  
  @Get(':imgpath')
  getImage(@Param('imgpath') image, @Res() res) {
    return res.sendFile(image, {root: './src/files'})
  }

  @Delete(':imgpath')
  removeImage(@Param('imgpath') image, @Req() req, @Res() res):Promise<string> {
    fs.rm('./src/files/' + image, (err) => {
      if (err) { throw err }
    })

    return res.end(`${image} succesfully deleted`)
  }
  
}

