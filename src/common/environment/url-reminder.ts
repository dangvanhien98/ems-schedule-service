// from process env : all value is string
export interface IEnv {
  /** set default config path. If don't set, use default file on asset folder */
  REMINDER_URL?: string;
}

// from config file
export interface IConf {
  urlReminder?: string;
}

export class ReminderConfig implements IConf {
  /** DEFAULT VALUE on Code */
  public urlReminder: string = 'http://192.168.4.224:3002/reminder';

  /** First get environment from process.env */
  constructor(env: IEnv = process.env) {
    this.urlReminder = env.REMINDER_URL || this.urlReminder;
    //console.log(process.env);
  }
}
