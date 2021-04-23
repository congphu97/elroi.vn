import { Get, Injectable } from '@nestjs/common';
import { ReturnModelType } from '@typegoose/typegoose';
import { InjectModel } from 'nestjs-typegoose';
import { UserService } from 'src/user/user.service';
import { Auth } from './auth.model';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/user/user.model';
@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService
  ) {}
  async validateUser(username: {}): Promise<any> {
    const itemUser = await this.userService.getUser(username);
    return itemUser ? itemUser : null;
  }

  async login(user: User) {
    return this.validateUser({ username: user.username }).then((userData) => {
      if (!userData) {
        return null;
      }
      const payload = { username: userData.username, role: userData.role };
      console.log({ payload });
      return this.jwtService.sign(payload, { expiresIn: '6h' });
    });
  }

  public async register(user: User): Promise<any> {
    return this.userService.createUser(user);
  }

}
