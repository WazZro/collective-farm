import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {
  APPLICATION_PORT,
  CONTAINER_HOSTNAME_IP,
  CORS_OPTION,
} from './lib/constants';

class NestAppStarter {
  public static async main(): Promise<void> {
    const app = await NestFactory.create(AppModule);

    // CORS ENABLE
    const corsOptions = CORS_OPTION;
    app.enableCors(corsOptions);

    await app.listen(APPLICATION_PORT, CONTAINER_HOSTNAME_IP);
  }
}

NestAppStarter.main();
