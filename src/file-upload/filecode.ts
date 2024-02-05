 
import { HttpException } from "@nestjs/common";
import { extname } from "path";

export const checkFile = (req, file, callback) => {
    if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
        return callback(new HttpException('File type can not be uploaded', 400), false)
    }
    return callback(null, true)
};

function RandomString(length) {
    const alphaNum = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'
    let randomString = '';
    for (let i = 0; i < length; i++){
        randomString += alphaNum[Math.round(Math.random() * alphaNum.length)]
        
    }
    return randomString
}

export const saveAs = (req, file, callback) => {
    const fileName = file.originalname.split('.')[0]
    const fileExt = extname(file.originalname);
    const uniqId = RandomString(6);
   callback(null, `${fileName}-${uniqId}${fileExt}`)
}