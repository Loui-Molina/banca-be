import { createParamDecorator } from '@nestjs/common';

export const Ip = createParamDecorator((data, req) => {
    return req.headers['x-real-ip'] || req.connection.remoteAddress;
});
