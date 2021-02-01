import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';
import { Observable } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { MessageErrorConstant } from '../../common/constants/MessageErrorConstant';
import { UserService } from '../user/user.service';
import { env } from './../../common/constants/api.constant';
import { JwtResponse, LoginRequest, User } from './../user/user.model.i';
@Injectable()
export class AuthService {
  constructor(private userService: UserService) {}
  login(loginRequest: LoginRequest): Observable<any> {
    let user: User;
    return this.userService.getUserByUserNameAndPassword(loginRequest).pipe(
      map(value => {
        user = value;
        if (user.id !== undefined) {
          let token = this.getToken(user);
          user = this.omit(user, ['password']);
          let jwtData: JwtResponse = {
            accessToken: token,
            user: user,
            typeToken: 'Bearer',
          };
          return jwtData;
        }
        throw new HttpException(
          MessageErrorConstant.ERROR_LOGIN,
          HttpStatus.BAD_GATEWAY,
        );
      }),
      catchError(err => {
        throw new HttpException(
          MessageErrorConstant.ERROR_LOGIN,
          HttpStatus.BAD_GATEWAY,
        );
      }),
    );
  }
  getToken(user: User) {
    const { id, userName, fullName } = user;
    return jwt.sign(
      {
        id,
        userName,
        fullName,
      },
      env.JWT_SECRET,
      { expiresIn: env.JWT_EXPIRES_IN },
    );
  }
  comparePassword(attempt: string, password: string) {
    return bcrypt.compare(attempt, password);
  }
  // TODO : remove field password
  omit(_obj, props) {
    props = props instanceof Array ? props : [props];
    return eval(`(({${props.join(',')}, ...o}) => o)(_obj)`);
  }
}
