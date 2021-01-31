import { HttpException, HttpStatus } from '@nestjs/common';
import { ConstApp } from '@src/modules/utils/const.app';

export class SomethingWentWrongException extends HttpException {
    constructor() {
        super(ConstApp.SOMETHING_WRONG_EXCEPTION, HttpStatus.INTERNAL_SERVER_ERROR);
    }
}
