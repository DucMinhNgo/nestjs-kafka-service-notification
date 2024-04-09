import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
// import { KafkaConsumerService } from './kafka/kafka-consumer.service';
import { DatabaseModule } from '../database/database.module';
import { SendNotification } from '../../app/use-cases/send-notification';
import { NotificationsController } from '../notifications/controllers/notifications.controller';
import { NotificationsKafkaController } from './kafka/controllers/notifications.controller';
import { ProducerService } from './kafka/sample/producer.service';
import { TestConsumer } from './kafka/sample/test.consumer';
import { ConsumerService } from './kafka/sample/consumer.service';

@Module({
  imports: [DatabaseModule, ConfigModule.forRoot()],
  controllers: [NotificationsController, NotificationsKafkaController],
  providers: [
    // KafkaConsumerService,
    SendNotification,
    ProducerService,
    TestConsumer,
    ConsumerService,
  ],
})
export class MessagingModule {}
