import busboy from 'busboy';
import cloudinary from '../config/cloudinary';
import { config } from 'dotenv';
import { type Request, type Response, type NextFunction } from 'express';
import {
  type UploadApiResponse,
  type UploadApiErrorResponse
} from 'cloudinary';

config();

export const formDataProccesor = (req: Request, res: Response, next: NextFunction): void => {
  try {
    let uploadingFile = false;
    let countFiles = 0;

    const bb = busboy({ headers: req.headers });
    req.body = {};

    const done = (): void => {
      if (uploadingFile) return;
      if (countFiles > 0) return;
      next();
    };

    bb.on('field', (key: string, val: string) => {
      req.body[key] = val;
    });
    ;
    bb.on('file', (key: string, stream: NodeJS.ReadableStream) => {
      uploadingFile = true;
      countFiles++;

      const cloud = cloudinary.uploader.upload_stream(
        {
          upload_preset: process.env.NODE_ENV === 'test'
            ? process.env.CLOUDINARY_PRESET_TEST
            : process.env.CLOUDINARY_PRESET
        },
        (error: UploadApiErrorResponse | undefined, res: UploadApiResponse | undefined): void => {
          if (error !== undefined) {
            throw new Error(error.message);
          }

          if (res !== undefined) {
            req.body[key] = res.secure_url;
          }

          uploadingFile = false;
          countFiles--;

          done();
        }
      );

      stream.on('data', (data) => {
        cloud.write(data);
      });

      stream.on('end', () => {
        cloud.end();
      });
    });

    bb.on('finish', () => {
      done();
    });

    req.pipe(bb);
  } catch (error: any) {
    throw new Error(error.message);
  }
};
