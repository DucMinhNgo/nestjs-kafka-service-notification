import { Logger } from '@nestjs/common';
import { Kafka, Message, Producer } from 'kafkajs';
import { IProducer } from './producer.interface';

export const sleep = (timeout: number) => {
  return new Promise<void>((resolve) => setTimeout(resolve, timeout));
};

export class KafkajsProducer implements IProducer {
  private readonly kafka: Kafka;
  private readonly producer: Producer;
  private readonly logger: Logger;

  constructor(private readonly topic: string, brokers: string[]) {
    for (let i = 0; i < brokers.length; i++) {
      const tempt = new Kafka({ brokers: [brokers[i]] });
      if (tempt) {
        this.kafka = tempt;
        break;
      }
    }
    this.producer = this.kafka.producer();
    this.logger = new Logger(topic);
  }

  async produce(message: Message) {
    // await this.producer.send({ topic: this.topic, messages: [message] });
    await this.producer.send({
      topic: this.topic,
      messages: [
        message,
        // { key: 'key1', value: 'hello world', partition: 0 },
        // { key: 'key2', value: 'hey hey!', partition: 1 },
      ],
    });
  }

  async connect() {
    try {
      await this.producer.connect();
    } catch (err) {
      this.logger.error('Failed to connect to Kafka.', err);
      await sleep(5000);
      await this.connect();
    }
  }

  async disconnect() {
    await this.producer.disconnect();
  }
}
