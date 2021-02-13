"use strict";
exports.__esModule = true;
exports.Ip = void 0;
var common_1 = require("@nestjs/common");
exports.Ip = common_1.createParamDecorator(function (data, req) {
    return req.headers['x-forwarded-for'] || req.connection.remoteAddress;
});
