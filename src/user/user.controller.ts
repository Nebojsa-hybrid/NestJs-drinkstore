import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import {
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import {
  CreateUserRequest,
  CreateUserResponse,
  UpdateUserRequest,
  User,
} from 'libs/dto/src';
import { UserService } from './user.service';

@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiCreatedResponse({
    description: 'The record has been successfully created.',
    type: CreateUserResponse,
  })
  @Post()
  createUser(@Body() body: CreateUserRequest) {
    return this.userService.createUser(body);
  }

  @ApiOkResponse({
    description: 'Returns the rall users',
    type: User,
  })
  @Get()
  // @UseGuards(AuthGuard('jwt'))
  getCurrentUser() {
    return this.userService.getUsers();
  }

  @ApiOkResponse({
    description: 'Returns single user',
    type: User,
  })
  @Get(':id')
  @UseGuards(AuthGuard('jwt'))
  getUserById(@Param('id') id: string) {
    return this.userService.getUserById(id);
  }

  @ApiNoContentResponse({
    description: 'Updates the record.',
  })
  // @ApiOAuth2([])
  @Patch(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  // @UseGuards(AuthGuard('jwt'))
  updateUser(
    @Param('id') id: string,
    @Body() body: UpdateUserRequest,
    // @Jwt() jwt: JwtPayload,
  ) {
    return this.userService.updateUser(id, body);
  }

  @ApiNoContentResponse({
    description: 'The record has been successfully deleted.',
  })
  // @ApiOAuth2([])
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  // @UseGuards(AuthGuard('jwt'))
  @Delete()
  deleteUser(@Param('id') id: string) {
    return this.userService.deleteUser(id);
  }
}
