import { NestFactory } from '@nestjs/core';
import ExpressSession from 'express-session';
import Passport from 'passport';
import { AppModule } from './app.module';
import {
  APPLICATION_PORT,
  CONTAINER_HOSTNAME_IP,
  CORS_OPTION, SESSION_COOKIE_NAME, SESSION_COOKIE_SECRET_KEY, SESSION_MEMORY_STORE_EXPIRE,
} from './lib/constants';

const MemoryStore = require('memorystore')(ExpressSession);

class NestAppStarter {
  public static async main(): Promise<void> {
    const app = await NestFactory.create(AppModule);

    // CORS ENABLE
    app.enableCors(CORS_OPTION);

    app.use(
      ExpressSession({
        resave: false,
        name: SESSION_COOKIE_NAME,
        secret: SESSION_COOKIE_SECRET_KEY,
        saveUninitialized: false,
        store: new MemoryStore({
          checkPeriod: SESSION_MEMORY_STORE_EXPIRE,
        }),
      }),
    );
    app.use(Passport.initialize());
    app.use(Passport.session());

    await app.listen(APPLICATION_PORT, CONTAINER_HOSTNAME_IP);
  }
}

NestAppStarter.main();
