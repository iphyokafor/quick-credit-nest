import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { LoginDto } from '../users/dto/login.dto';
import { UserDto } from '../users/dto/user.dto';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(username: string, pass: string) {
    const user = await this.usersService.findOneByEmail(username);
    if (!user) {
      return null;
      // throw new BadRequestException('Unable to login!');
    }

    const match = await this.comparePassword(pass, user.password);
    if (!match) {
      return null;
      // throw new BadRequestException('Unable to login!');
    }

    const { password, ...result } = user['dataValues'];
    return result;
  }

  public async login(user: LoginDto) {
    const token = await this.generateToken(user);
    return { user, token };
  }

  public async create(user: UserDto) {
    const pass = await this.hashPassword(user.password);

    const newUser = await this.usersService.create({ ...user, password: pass });

    const { password, ...result } = newUser['dataValues'];

    const token = await this.generateToken(result);

    return { user: result, token };
  }

  private async generateToken(user) {
    const token = await this.jwtService.signAsync(user);
    return token;
  }

  private async hashPassword(password: string) {
    const hash = await bcrypt.hash(password, 10);
    return hash;
  }

  private async comparePassword(enteredPassword: string, dbPassword: string) {
    const match = await bcrypt.compare(enteredPassword, dbPassword);
    return match;
  }
}
