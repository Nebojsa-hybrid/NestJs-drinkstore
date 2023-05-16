import { Injectable, Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
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
    const user = await this.prismaService.user.findFirstOrThrow({
      where: { id: userId },
    });
    return user;
  }

  async login(user: any) {
    try {
      const payload = { username: user.name, password: user.password };
      return {
        access_token: this.jwtService.sign(payload),
      };
    } catch (e) {
      this.logger.error(e);

      throw e;
    }
  }

  async register(body: any) {
    try {
      return body;
    } catch (e) {
      this.logger.error(e);

      throw e;
    }
  }
}
