import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AuthGuard } from './guards/auth.guard';
import { GlobalInterceptor } from './interceptor/global.interceptor';
import * as cookieParser from 'cookie-parser';
import * as session from 'express-session';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalGuards(new AuthGuard());
  app.useGlobalInterceptors(new GlobalInterceptor());
  app.enableCors();
  app.use(cookieParser());
  app.use(
    session({
      secret: '111',
      resave: false,
      saveUninitialized: false,
      cookie: {
        maxAge: 60000,
        httpOnly: true,
      },
    }),
  );

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
