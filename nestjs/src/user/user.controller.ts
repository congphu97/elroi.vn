import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  NotFoundException,
  Param,
  Post,
  Put,
  Query,
  Req,
  Res,
} from '@nestjs/common';
import { User } from './user.model';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  async listUsers(@Query() query): Promise<User[] | null> {
    return await this.userService.getUsers(query);
  }

  @Post()
  async createUser(@Body() user: User): Promise<User> {
    console.log({user})
    return await this.userService.createUser(user);
  }

  @Put('/:id')
  async updateUser(
    @Res() res,
    @Body() product: User,
    @Param('id') id
  ): Promise<User> {
    const newUser = await this.userService.updateUser(id, product);
    if (!newUser) throw new NotFoundException('Update fail');
    return res.status(HttpStatus.OK).json(newUser);
  }

  @Delete('/:id')
  async deleteUser(@Res() res, @Param('id') id): Promise<User> {
    const newUser = await this.userService.deleteUser(id);
    if (!newUser) throw new NotFoundException('Update fail');
    return res.status(HttpStatus.OK).json(newUser);
  }

  @Post('/getUser')
  async getUser(@Body() username: {}): Promise<User | null> {
    return await this.userService.getUser(username);
  }

}
