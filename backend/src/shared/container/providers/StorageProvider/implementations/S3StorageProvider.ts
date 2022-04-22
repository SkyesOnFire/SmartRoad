import fs from 'fs';
import path from 'path';
import mime, { contentType } from 'mime-types';
import aws, { S3 } from 'aws-sdk';
import uploadConfig from '@config/upload';
import AppError from '@shared/errors/AppError';
import IStorageProvider from '../models/IStorageProvider';

class S3StorageProvider implements IStorageProvider {
  private client: S3;

  constructor() {
    this.client = new aws.S3({
      region: process.env.AWS_S3_REGION,
    });
  }

  public async saveFile(file: string): Promise<string> {
    const originalPath = path.resolve(uploadConfig.tmpFolder, file);

    const ContentTypeStr = mime.contentType(originalPath);

    if (!ContentTypeStr) {
      throw new AppError('No content type', 500);
    }

    const fileContent = await fs.promises.readFile(originalPath);

    await this.client
      .putObject({
        Bucket: process.env.BUCKET || 'sysin-uploads',
        Key: file,
        ACL: 'public-read',
        Body: fileContent,
        ContentType: ContentTypeStr,
      })
      .promise();

    return file;
  }

  public async deleteFile(file: string): Promise<void> {
    await this.client
      .deleteObject({
        Bucket: process.env.BUCKET || 'sysin-uploads',
        Key: file,
      })
      .promise();
  }
}

export default S3StorageProvider;
