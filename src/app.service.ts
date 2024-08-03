import { Injectable } from '@nestjs/common';
import * as admin from 'firebase-admin';
import {
  MultipleDeviceNotificationDto,
  NotificationDto,
  TopicNotificationDto,
} from './dto/notification.dto';

@Injectable()
export class AppService {
  async sendNotification({ token, title, body, icon }: NotificationDto) {
    try {
      const response = await admin.messaging().send({
        token,
        webpush: {
          notification: {
            title,
            body,
            icon,
          },
        },
      });
      return response;
    } catch (error) {
      throw error;
    }
  }

  async sendNotificationToMultipleTokens({
    tokens,
    title,
    body,
    icon,
  }: MultipleDeviceNotificationDto) {
    const message = {
      notification: {
        title,
        body,
        icon,
      },
      tokens,
    };

    try {
      const response = await admin.messaging().sendMulticast(message);
      console.log('Successfully sent messages:', response);
      return {
        success: true,
        message: `Successfully sent ${response.successCount} messages; ${response.failureCount} failed.`,
      };
    } catch (error) {
      console.log('Error sending messages:', error);
      return { success: false, message: 'Failed to send notifications' };
    }
  }

  async sendTopicNotification({
    topic,
    title,
    body,
    icon,
  }: TopicNotificationDto) {
    const message = {
      notification: {
        title,
        body,
        icon,
      },
      topic,
    };

    try {
      const response = await admin.messaging().send(message);
      console.log('Successfully sent message:', response);
      return { success: true, message: 'Topic notification sent successfully' };
    } catch (error) {
      console.log('Error sending message:', error);
      return { success: false, message: 'Failed to send topic notification' };
    }
  }
}
