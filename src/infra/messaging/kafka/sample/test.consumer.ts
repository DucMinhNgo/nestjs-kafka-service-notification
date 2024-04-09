import { Injectable, OnModuleInit } from '@nestjs/common';
import { ConsumerService } from './consumer.service';

@Injectable()
export class TestConsumer implements OnModuleInit {
    constructor(private readonly consumerService: ConsumerService) { }

    async onModuleInit() {
        await this.consumerService.consume({
            topic: { topic: 'notifications' },
            config: {
                groupId: 'test'
            },
            onMessage: async (message: any) => {
                try {
                    console.log('Consumer get message: ');
                    console.log({ message });

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
