import { Body, Controller, Get, Param, Post, Query, Req, Res } from '@nestjs/common';
import { Auth } from './auth.model';
import { AuthModule } from './auth.module';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) { }

    @Get()
    async listUsers(): Promise<Auth[] | null> {
        return await this.authService.listauths();
    }

    @Post()
    async createUser(@Body() cat: Auth): Promise<Auth> {
        return await this.authService.createCustomauth(cat);
    }
}