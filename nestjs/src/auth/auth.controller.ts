import { Body, Controller, Get, Param, Post, Query, Req, Request, Res } from '@nestjs/common';
import { User } from 'src/user/user.model';
import { Auth } from './auth.model';
import { AuthModule } from './auth.module';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) { }
    @Post('/login')
    async login(@Body() user:User, @Res() res) {
        const token = await this.authService.login(user);
        return res.json(token)
      }

      
    @Post('/register')
    async register(@Body() user: User): Promise<any> {
      return  this.authService.register(user);
    }  
}