import { Injectable, OnModuleInit } from '@nestjs/common';
import { IProducer } from './producer.interface';
import { Kafka, Message, Producer, ProducerRecord } from 'kafkajs';
import { ConfigService } from '@nestjs/config';
import { KafkajsProducer } from './kafkajs.producer';

@Injectable()
export class ProducerService implements OnModuleInit {
  private readonly producers = new Map<string, IProducer>();
  private readonly kafka = new Kafka({
    brokers: [process.env.KAFKA_BROKER],
  });
  private readonly producer: Producer = this.kafka.producer();
  constructor(private readonly configService: ConfigService) {}

  async onModuleInit() {
    await this.producer.connect();
  }

  private async getProducer(topic: string) {
    let producer = this.producers.get(topic);
    if (!producer) {
      producer = new KafkajsProducer(
        topic,
        this.configService.get('KAFKA_BROKER'),
      );
      await producer.connect();
      this.producers.set(topic, producer);
    }
    return producer;
  }

  async produce(topic: string, message: Message) {
    const producer = await this.getProducer(topic);
    await producer.produce(message);
  }

  // async produce(record: ProducerRecord) {
  //     await this.producer.send(record);
  // }

  async onApplicationShutdown() {
    await this.producer.disconnect();
  }
}
