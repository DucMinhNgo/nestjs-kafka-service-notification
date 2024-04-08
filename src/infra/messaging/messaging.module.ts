import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { NotificationsController } from './kafka/controllers/notifications.controller';
import { KafkaConsumerService } from './kafka/kafka-consumer.service';
import { DatabaseModule } from '../database/database.module';
import { SendNotification } from '../../app/use-cases/send-notification';

@Module({
  imports: [DatabaseModule, ConfigModule.forRoot()],
  controllers: [NotificationsController],
  providers: [KafkaConsumerService, SendNotification],
})
export class MessagingModule {}
