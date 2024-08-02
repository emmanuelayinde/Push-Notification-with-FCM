import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class NotificationDto {
  @ApiProperty({
    type: String,
    description: 'Client device token',
  })
  token: string;

  @ApiProperty({
    type: String,
    description: 'Notification Title',
  })
  title: string;

  @ApiProperty({
    type: String,
    description: 'Notification Body',
  })
  body: string;

  @ApiPropertyOptional({
    type: String,
    description: 'Notification Icon / Logo',
  })
  icon: string;
}
