import { Injectable, Inject } from '@nestjs/common';
import { Collection, Db } from 'mongodb';
import { Credential } from './types/Credential';
import ApplicationConstants from './constants/ApplicationConstants';

@Injectable()
export class AppService {
  constructor(@Inject('DATABASE_CONNECTION') private readonly db: Db) {}

  private getCredentialsCollection(): Collection<Credential> {
    return this.db.collection<Credential>(
      process.env.CREDENTIALS_COLLECTION,
    );
  }

  /**
   * This method can be used to fetch credentials of a particular application.
   * @param applicationId Id of application, of which credentials needs to be fetched.
   * @returns
   */
  public async getCredentials(
    applicationId: string,
  ): Promise<Record<string, string>> {
    const credentialsDocument = await this.getCredentialsCollection().findOne({
      applicationId,
    });

    if (credentialsDocument) {
      return credentialsDocument.credentials;
    } else {
      return {};
    }
  }
}
