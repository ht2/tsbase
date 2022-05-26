import { DeleteObjectsCommand, ListObjectsCommand, ObjectIdentifier } from '@aws-sdk/client-s3';
import Config from './Config';

export default (config: Config) => {
  return async (): Promise<void> => {
    // Gets all of the objects to be deleted.
    const listObjectsCommand = new ListObjectsCommand({
      Bucket: config.bucketName,
      Prefix: config.subFolder,
    });
    const listObjectsOutput = await config.client.send(listObjectsCommand);
    const objects = listObjectsOutput.Contents !== undefined ? listObjectsOutput.Contents : [];
    const identifierList: ObjectIdentifier[] = objects.reduce(
      (identifiers, { Key }) => {
        if (Key !== undefined) {
          return [...identifiers, { Key }];
        }
        return identifiers;
      },
      [] as ObjectIdentifier[],
    );

    // Deletes the objects.
    if (identifierList.length === 0) {
      return;
    }

    const deletionCommand = new DeleteObjectsCommand({
      Bucket: config.bucketName,
      Delete: { Objects: identifierList },
    });
    await config.client.send(deletionCommand);

    return;
  };
};
