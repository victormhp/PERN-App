import dotenv from 'dotenv';

export abstract class Config {
  constructor() {
    const nodeNameEnv = this.createPathEnv(this.nodeEnv);
    dotenv.config({
      path: nodeNameEnv,
    });
  }

  public getEnv(k: string): string {
    return process.env[k] ?? '';
  }

  public getNumberEnv(k: string): number {
    return Number(this.getEnv(k));
  }

  public get nodeEnv(): string {
    return this.getEnv('NODE_ENV')?.trim() ?? '';
  }

  public createPathEnv(path: string): string {
    const arrEnv: string[] = ['env'];

    if (path.length > 0) {
      const stringToArray = path.split('.');
      arrEnv.unshift(...stringToArray);
    }
    return '.' + arrEnv.join('.');
  }
}
