import { Body, Controller, HttpCode, HttpStatus, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dto/auth.dto';
import { Tokens } from './types/tokens.type';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  signup(@Body() authDto: AuthDto): Promise<Tokens> {
    return this.authService.signup(authDto);
  }

  @Post('signin')
  @HttpCode(HttpStatus.OK)
  signin(@Body() authDto: AuthDto): Promise<Tokens> {
    return this.authService.signin(authDto);
  }

  @UseGuards(AuthGuard('jwt'))
  @HttpCode(HttpStatus.OK)
  @Post('logout')
  logout(@Req() req: Request) {
    // console.log(req.user)
    return this.authService.logout(req.user['userId']);
  }

  @UseGuards(AuthGuard('jwt-refresh'))
  @HttpCode(HttpStatus.OK)
  @Post('refresh')
  refresh(@Req() req: Request): Promise<Tokens> {
    return this.authService.refresh(req.user['userId'], req.user['refreshToken']);
  }
}
