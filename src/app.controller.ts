import { Body, Controller, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiTags } from '@nestjs/swagger';
import { NotificationDto } from './dto/notification.dto';

@ApiTags('Notification')
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post()
  async SendPushNotification(@Body() body: NotificationDto): Promise<string> {
    return await this.appService.sendNotification(body);
  }

  @Post('mobile')
  async SendMobilePushNotification(
    @Body() body: NotificationDto,
  ): Promise<void> {
    return await this.appService.sendMobileNotification(body);
  }
}
