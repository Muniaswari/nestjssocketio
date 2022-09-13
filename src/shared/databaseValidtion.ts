import { HttpStatus, HttpException } from '@nestjs/common';

export async function checkExistanceOfTitle(data, field) {
    if (data) {
        throw new HttpException(`${field} already exists`, HttpStatus.BAD_REQUEST);
    }
}

export async function DeleteReference(message) {
    throw new HttpException(message, HttpStatus.BAD_REQUEST);
}