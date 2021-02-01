import { Body, Controller, Get, Post } from '@nestjs/common';
import { LoginRequest } from '../user/user.model.i';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private _authService: AuthService) {}
  @Post()
  login(@Body() loginRequest: LoginRequest) {
    return this._authService.login(loginRequest);
  }
}
