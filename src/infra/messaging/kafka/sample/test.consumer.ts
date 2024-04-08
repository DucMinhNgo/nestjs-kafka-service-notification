import { Injectable, OnModuleInit } from '@nestjs/common';
import { ConsumerService } from './consumer.service';

@Injectable()
export class TestConsumer implements OnModuleInit {
    constructor(private readonly consumerService: ConsumerService) { }

    async onModuleInit() {
        await this.consumerService.consume({
            topic: { topic: 'notification' },
            config: { groupId: 'test-consumer' },
            onMessage: async (message: any) => {
                try {
                    console.log("Consumer get message: ");

                    console.log({
                        dustin: JSON.parse(message.value),
                    });
                } catch (err) {
                    throw new Error('Test error!');
                }
            },
        });
    }
}
