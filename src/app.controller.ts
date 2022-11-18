import { Controller, Get, Logger, Query } from '@nestjs/common';
import { AppService } from './app.service';

@Controller('configuration')
export class AppController {
  constructor(private readonly appService: AppService) {}
  private readonly logger = new Logger(AppController.name);

  /**
   * This method can be used to fetch credentials of a particular application.
   * @param applicationId Id of application, of which credentials needs to be fetched.
   * @returns credentials/env variables of application.
   */
  @Get()
  public getApplicationCredentials(
    @Query('applicationId') applicationId: string,
  ): Promise<Record<string, string>> | Record<string, string> {
    this.logger.log(
      `Request Received For Fetching Credentials of Application: ${applicationId}`,
    );

    // If No Query Param is received, then return empty object.
    if (!applicationId) {
      return {};
    } else {
      return this.appService.getCredentials(applicationId);
    }
  }
}
