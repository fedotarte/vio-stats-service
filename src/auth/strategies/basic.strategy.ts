import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { BasicStrategy as Strategy } from 'passport-http';

@Injectable()
export class BasicStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super();
  }
  // eslint-disable-next-line @typescript-eslint/require-await
  async validate(username: string, password: string): Promise<boolean> {
    const validUsername = process.env.BASIC_AUTH_USERNAME;
    const validPassword = process.env.BASIC_AUTH_PASSWORD;

    if (!validUsername || !validPassword) {
      throw new UnauthorizedException('Basic auth credentials not configured');
    }

    if (username === validUsername && password === validPassword) {
      return true;
    }

    throw new UnauthorizedException('Invalid credentials');
  }
}
