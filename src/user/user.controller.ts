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
} from '@nestjs/common';
import {
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiOAuth2,
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

// import {
//   CheckMailRequest,
//   CheckMailResponse,
//   CreateUserRequest,
//   CreateUserResponse,
//   UpdateUserRequest,
//   User,
// } from '@eventmender/dto';

// import { UserService } from './user.service';
// import { Jwt } from '../auth/decorators/jwt.decorator';
// import { JwtPayload } from '../auth/jwt.interface';
// import { AuthGuard } from '@nestjs/passport';
// import { ApiFile } from '../upload-media/api-file.decorator';
// import { fileMimetypeFilter } from '../upload-media/file-type.decorator';
// import { ParseFile } from '../upload-media/parse-file.pipe';

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
  // @ApiOAuth2([])
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
  getUserById(@Param() id: string) {
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
