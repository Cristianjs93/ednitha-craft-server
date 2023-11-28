import { config } from 'dotenv';
import { type User } from '../api/user/user.types';

config();

interface WelcomeEmailResponse {
  from: string
  to: string
  templateId: string
  dynamic_template_data: {
    name: string
    lastname: string
    url: string
  }
}

export const welcomeEmail = (user: User, resetToken: string): WelcomeEmailResponse => {
  const emailData = {
    from: 'AdminEdnithaCraft <ednithacraft@gmail.com>',
    to: user.email,
    templateId: process.env.SENGRID_TEMPLATE_VERIFICATION as string,
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
