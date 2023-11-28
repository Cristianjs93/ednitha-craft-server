import { config } from 'dotenv';
import sgMail, { type MailDataRequired } from '@sendgrid/mail';

config();

export const sendMailSenGrid = async (data: MailDataRequired): Promise<void> => {
  try {
    if (process.env.NODE_ENV === 'test') {
      return;
    }

    const SENDGRID_API_KEY = process.env.SENDGRID_API_KEY as string;
    sgMail.setApiKey(SENDGRID_API_KEY);
    await sgMail.send(data);
  } catch (error: any) {
    throw new Error(error.message);
  }
};
