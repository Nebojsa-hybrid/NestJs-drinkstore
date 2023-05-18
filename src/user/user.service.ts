import {
  CreateUserRequest,
  CreateUserResponse,
  UpdateUserRequest,
  User,
} from 'libs/dto/src';
import {
  BadRequestException,
  ForbiddenException,
  Inject,
  Injectable,
  Logger,
} from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { PrismaService } from 'src/prisma/prisma.service';
import { JwtPayload } from 'src/auth/jwt-payload.interface';
// import { AccountType } from '@prisma/client';

// import { hasRole } from '../auth/auth.utils';
// import { AuthService } from '../auth/auth.service';
// import { PrismaService } from '../prisma/prisma.service';

// import awsConfigProvider from '../config/aws.config';

// import type { JwtPayload } from '../auth/jwt.interface';

@Injectable()
export class UserService {
  private readonly logger = new Logger(UserService.name);

  constructor(
    private readonly prismaService: PrismaService, // private readonly authService: AuthService, // @Inject(awsConfigProvider.KEY) // private readonly awsConfig: ConfigType<typeof awsConfigProvider>,
  ) {}

  async createUser(body: CreateUserRequest): Promise<CreateUserResponse> {
    try {
      const { email, name, lastName, password } = body;

      const user = await this.prismaService.user.create({
        data: {
          name,
          lastName,
          email,
          password,
          createdBy: '',
        },
      });

      return user;
    } catch (e) {
      this.logger.error(e);

      throw e;
    }
  }

  async getUsers(): Promise<User[]> {
    try {
      const users = this.prismaService.user.findMany({});

      return users;
    } catch (e) {
      this.logger.error(e);

      throw e;
    }
  }

  async getUserById(id: string) {
    try {
      const user = this.prismaService.user.findFirstOrThrow({ where: { id } });

      return user;
    } catch (e) {
      this.logger.error(e);

      throw e;
    }
  }

  async updateUser(
    id: string,
    body: UpdateUserRequest,
    jwt: JwtPayload,
  ): Promise<User> {
    try {
      const { email, name, lastName } = body;
      const user = await this.prismaService.user.update({
        where: {
          id,
        },
        data: { ...body, updatedBy: jwt.userId },
      });

      return user;
    } catch (e) {
      this.logger.error(e);

      throw e;
    }
  }

  async deleteUser(id: string) {
    try {
      await this.prismaService.user.delete({
        where: {
          id,
        },
      });
      return;
    } catch (e) {
      this.logger.error(e);

      throw e;
    }
  }
}
