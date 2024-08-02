import { Module } from '@nestjs/common';
import { firebaseConfig } from 'config/firebase';
import * as admin from 'firebase-admin';
import { initializeApp } from 'firebase-admin/app';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  constructor() {
    // const serviceAccount = require('path/to/serviceAccountKey.json');
    // admin.initializeApp({
    //   credential: admin.credential.cert(serviceAccount),
    // });
    initializeApp({
      credential: admin.credential.cert({
        clientEmail: firebaseConfig.client_email,
        privateKey: firebaseConfig.private_key,
        projectId: firebaseConfig.project_id,
      }),
    });
  }
}
