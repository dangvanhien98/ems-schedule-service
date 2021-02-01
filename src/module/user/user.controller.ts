import { Body, Controller, Get, HttpException, HttpStatus, Post } from '@nestjs/common';
import { Observable, throwError } from 'rxjs';
import { MessageErrorConstant } from '../../common/constants/messageErrorConstant';
import { UserGuard } from './user.controller.guard';
import { LoginRequest, User } from './user.model.i';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService,
    private userGuard: UserGuard) {}

  @Post('/login')
  getUserByUserNameAndPassword(@Body() login: LoginRequest): Observable<any> {
    if(!this.userGuard.isPostLogin(login)){
      return throwError(
        new HttpException(
          MessageErrorConstant.BAD_REQUEST,
          HttpStatus.BAD_REQUEST,
        ),
      );
    }
    return this.userService.getUserByUserNameAndPassword(login);
  }
  @Get()
  getAllUser():Observable<User[]>{
    return this.userService.getAllUser();
  }
}
