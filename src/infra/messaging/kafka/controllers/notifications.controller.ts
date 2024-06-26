import { Controller } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';
import { SendNotification } from '../../../../app/use-cases/send-notification';

interface SendNotificationPayload {
  content: string;
  category: string;
  recipientId: string;
}

@Controller()
export class NotificationsKafkaController {
  constructor(private sendNotification: SendNotification) {}

  @EventPattern('notifications.send-notification')
  async handleSendNotification(
    @Payload() { content, category, recipientId }: SendNotificationPayload,
  ) {
    await this.sendNotification.execute({
      category,
      content,
      recipientId,
    });
  }
}
