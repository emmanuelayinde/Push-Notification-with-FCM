import { Injectable } from '@nestjs/common';
import * as admin from 'firebase-admin';
import { NotificationDto } from './dto/notification.dto';

@Injectable()
export class AppService {
  async sendNotification(data: NotificationDto) {
    try {
      const response = await admin.messaging().send({
        token: data.token,
        webpush: {
          notification: {
            requireInteraction: true,
            renotify: true,
            tag: 'test-tag',
            title: data.title,
            body: data.body,
            icon:
              data.icon ||
              'https://res.cloudinary.com/dsgye77pa/image/upload/v1719759345/pao/studywithpao.png',
          },
        },
      });
      return response;
    } catch (error) {
      throw error;
    }
  }
  async sendMobileNotification(data: NotificationDto) {
    const message = {
      data: {
        score: '850',
        time: '2:45',
      },
      notification: {
        title: data.title,
        body: data.body,
        imageUrl:
          data.icon ||
          'https://res.cloudinary.com/dsgye77pa/image/upload/v1719759345/pao/studywithpao.png',
      },
      token: data.token,
    };

    admin
      .messaging()
      .send(message)
      .then((response) => {
        console.log('Successfully sent message:', { response });
      })
      .catch((error) => {
        console.log('Error sending message:', { error });
      });
  }
}
