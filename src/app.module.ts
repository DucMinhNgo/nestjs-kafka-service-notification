import { Module } from '@nestjs/common';
import { DatabaseModule } from './infra/database/database.module';
import { MessagingModule } from './infra/messaging/messaging.module';

@Module({
  imports: [DatabaseModule, MessagingModule],
})
export class AppModule {}
