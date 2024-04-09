import { Body, Controller, Post } from '@nestjs/common';
import { SendNotification } from '../../../app/use-cases/send-notification';
import { CreateNotificationBody } from '../../../app/dtos/create-notification.dto';
import { ProducerService } from '../../messaging/kafka/sample/producer.service';

@Controller('notifications')
export class NotificationsController {
  constructor(
    private sendNotification: SendNotification,
    private readonly producerService: ProducerService,
  ) {}

  @Post()
  async create(@Body() body: CreateNotificationBody) {
    const { recipientId, content, category, partition } = body;

    const { notification } = await this.sendNotification.execute({
      recipientId,
      category,
      content,
    });

    await this.producerService.produce('notifications', {
      value: JSON.stringify({
        recipientId,
        category,
        content,
      }),
      partition,
    });

    return {
      // notification: NotificationViewModel.toHttp(notification),
    };
  }
}
