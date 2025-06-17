import { Controller, Get  } from '@nestjs/common';
import { CronService } from './cron.service';

@Controller('cron')
export class CronController { constructor(private readonly cronService: CronService) {}



  @Get('run')
  async runManually() {
    await this.cronService['handleDailyTaskCheck'](); // Directly call the method
    return { message: 'Manual email check executed!' };
  }
}
