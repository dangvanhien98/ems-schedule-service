import { Injectable } from '@nestjs/common/decorators';
import { AppConfig } from 'src/common/environment/app';
import { MySqlConfig } from 'src/common/environment/mysql';
import { ReminderConfig } from 'src/common/environment/url-reminder';

@Injectable()
export class ConfigService {
  private readonly app: AppConfig;
  private readonly mySql: MySqlConfig;
  private readonly reminder: ReminderConfig;
  public constructor() {
    this.app = new AppConfig();
    this.mySql = new MySqlConfig();
    this.reminder = new ReminderConfig();
  }

  public appConfig(): AppConfig {
    return this.app;
  }
  public mySqlConfig(): MySqlConfig {
    return this.mySql;
  }
  public reminderConfig() : ReminderConfig {
    return this.reminder;
  }
}
