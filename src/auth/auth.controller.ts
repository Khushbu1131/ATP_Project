import { Body, Controller, Post, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Response } from 'express';
import { LoginDto } from 'src/admin/DTO/login.dto';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}


    /*@Post('login')
    async login(@Body() body: { email: string; password: string }, 
    @Res({ passthrough: true }) res: Response) {
      return this.authService.login(body.email, body.password,res);
    }*/
      @Post('login')
      async login(@Body() body: LoginDto, @Res({ passthrough: true }) res: Response) {
        return this.authService.login(body.email, body.password, res);
      }
  
    @Post('logout')
    logout(@Res({ passthrough: true }) res: Response) {
      res.clearCookie('access_token');
      return { message: 'Logged out successfully' };
    }
}
