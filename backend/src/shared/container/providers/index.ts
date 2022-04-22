import { container } from 'tsyringe';
import uploadConfig from '@config/upload';

import IStorageProvider from './StorageProvider/models/IStorageProvider';

import DiskStorageProvider from './StorageProvider/implementations/DiskStorageProvider';
import S3StorageProvider from './StorageProvider/implementations/S3StorageProvider';

import IMailProvider from './MailProvider/models/IMailProvider';
import AWSMailProvider from './MailProvider/implementations/AWSMailProvider';

const providers = {
  disk: DiskStorageProvider,
  s3: S3StorageProvider,
};

container.registerSingleton<IStorageProvider>(
  'StorageProvider',
  providers[uploadConfig.driver],
);

container.registerInstance<IMailProvider>(
  'MailProvider',
  new AWSMailProvider(),
);
