"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.welcomeEmail = void 0;
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
const welcomeEmail = (user, resetToken) => {
    const emailData = {
        from: 'AdminEdnithaCraft <ednithacraft@gmail.com>',
        to: user.email,
        templateId: process.env.SENGRID_TEMPLATE_VERIFICATION,
        dynamic_template_data: {
            name: user.name,
            lastname: user.lastname,
            url: process.env.NODE_ENV === 'develop'
                ? `${process.env.EDNITHA_CRAFT_URL_DEV}/verified/${resetToken}`
                : process.env.NODE_ENV === 'production'
                    ? `${process.env.EDNITHA_CRAFT_URL_PROD}/verified/${resetToken}`
                    : ''
        }
    };
    return emailData;
};
exports.welcomeEmail = welcomeEmail;
