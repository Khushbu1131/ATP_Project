import { Controller, Get, UseGuards, Req } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from './roles.guard';
import { Roles } from './roles.decorator';
import { AdminService } from './admin.service';

@Controller('admin')
export class AdminController {
 

  constructor(private readonly adminService: AdminService) {}

 @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @Get('dashboard')
  getDashboard(@Req() req: any) {
    const {password,role,...withoutPassword}=req.user


    return {
      message: 'Welcome to the Admin Dashboard',
      user: withoutPassword,
    };
  }
  @Roles('user')
@Get('user-dashboard')
getUserDashboard(@Req() req: any) {
  return {
    message: 'Welcome to the User Dashboard',
  };
}

  

}
