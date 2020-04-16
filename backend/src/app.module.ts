import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { APP_PIPE } from '@nestjs/core';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './components/user/user.module';
import { AuthModule } from './components/auth/auth.module';
import { EntityResolver } from './lib/pipes/resolver.pipe';
import { TruckModule } from './components/truck/truck.module';
import { ProductModule } from './components/product/product.module';
import { TruckModelModule } from './components/truck-model/truck-model.module';
import { DeliveryModule } from './components/delivery/delivery.module';
import { StockModule } from './components/stock/stock.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DMBS_HOST,
      username: process.env.DBMS_USER,
      password: process.env.DBMS_PASSWORD,
      database: process.env.DBMS_DATABASE,
      entities: [`${__dirname}/models/*.entity{.ts,.js}`],
      subscribers: [`${__dirname}/lib/subscribers/*{.ts,.js}`],
      synchronize: true,
      namingStrategy: new SnakeNamingStrategy(),
    }),
    UserModule,
    AuthModule,
    TruckModule,
    ProductModule,
    TruckModelModule,
    DeliveryModule,
    StockModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_PIPE,
      useClass: EntityResolver,
    },
  ],
})
export class AppModule {}
