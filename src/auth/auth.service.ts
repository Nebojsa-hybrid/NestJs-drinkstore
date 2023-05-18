import { Injectable, Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CreateUserRequest, LoginRequest } from 'libs/dto/src';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);
  constructor(
    private readonly jwtService: JwtService,
    private readonly prismaService: PrismaService,
  ) {}

  async validateUserById(userId: string) {
    // Implement your logic to validate the user by ID
    // For example, you can query the database to find the user by ID
    // and return the user object if found, or null if not found
    // Replace this with your actual implementation
    try {
      const user = await this.prismaService.user.findFirstOrThrow({
        where: { id: userId },
      });
      return user;
    } catch (e) {
      this.logger.error(e);

      throw e;
    }
  }

  async userExist(email: string, password: string) {
    try {
      const existingUser = await this.prismaService.user.findFirst({
        where: { email: email },
      });

      if (!existingUser) {
        throw new Error('No user');
      }

      if (existingUser.password !== password) {
        throw new Error('Invalid password');
      }
      return;
    } catch (e) {
      this.logger.error(e);

      throw e;
    }
  }

  async login(user: LoginRequest) {
    try {
      const { email, password } = user;

      await this.userExist(email, password);

      const payload = { username: email, password: password };

      return {
        access_token: this.jwtService.sign(payload),
      };
    } catch (e) {
      this.logger.error(e);

      throw e;
    }
  }

  async register(body: CreateUserRequest) {
    try {
      const newUser = await this.prismaService.user.create({
        data: { ...body },
      });

      return newUser;
    } catch (e) {
      this.logger.error(e);

      throw e;
    }
  }
}
