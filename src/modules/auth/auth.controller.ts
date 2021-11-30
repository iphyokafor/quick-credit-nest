import { Controller, Body, UseGuards, Post, Request } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import {
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { DoesUserExist } from 'src/core/guards/doesUserExist.guard';
import { LoginDto } from '../users/dto/login.dto';
import { UserDto } from '../users/dto/user.dto';
import { AuthService } from './auth.service';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @ApiCreatedResponse({ type: UserDto })
  @ApiForbiddenResponse({ description: 'This email already exist' })
  @UseGuards(DoesUserExist)
  @Post('signup')
  async signUp(@Body() user: UserDto) {
    return await this.authService.create(user);
  }

  @ApiCreatedResponse({ type: LoginDto })
  @ApiUnauthorizedResponse({ description: 'Bad credentials' })
  @UseGuards(AuthGuard('local'))
  @Post('login')
  async login(@Body() user: LoginDto, @Request() req) {
    return await this.authService.login(req.user);
  }
}
