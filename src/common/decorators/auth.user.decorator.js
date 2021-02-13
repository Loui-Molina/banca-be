"use strict";
exports.__esModule = true;
exports.AuthUser = void 0;
var common_1 = require("@nestjs/common");
// eslint-disable-next-line @typescript-eslint/naming-convention
exports.AuthUser = common_1.createParamDecorator(function (data, ctx) {
    var request = ctx.switchToHttp().getRequest();
    return request.user;
});
