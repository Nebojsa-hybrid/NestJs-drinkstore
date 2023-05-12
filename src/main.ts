import { Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const logger = new Logger('Bootstrap');
  const app = await NestFactory.create(AppModule);

  const configService = app.get<ConfigService>(ConfigService);

  const globalPrefix = 'api';

  const applicationHost = configService.get('application.host');
  const applicationProtocol = 'http';
  const applicationPort = configService.get('application.port');
  const parsedApplicationPort = `:${configService.get('application.port')}`;
  const applicationUrl = `${applicationProtocol}://${applicationHost}${parsedApplicationPort}/${globalPrefix}`;

  console.log(
    'console.log: ',
    applicationPort,
    applicationProtocol,
    applicationPort,
  );

  const config = new DocumentBuilder()
    .setTitle('Drinkstore API')
    .setDescription('Complete collection of Drinkstore API endpoints')
    .setVersion('1.0.0')
    // .addOAuth2({
    //   type: 'oauth2', // TODO :: this should be changed
    //   flows: {
    //     implicit: {
    //       authorizationUrl: ``, // TODO :: add url
    //       scopes: {
    //         openid: 'openid',
    //         profile: 'profile',
    //         email: 'email',
    //       },
    //     },
    //   },
    // })
    .addTag('users')
    // .addTag('')
    .build();

  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('docs', app, document, {
    useGlobalPrefix: true,
    swaggerOptions: {},
  });

  await app.listen(applicationPort, () => {
    logger.log(`Drinkstore API running at ${applicationUrl}`);
    logger.log(`Dreinkstore API Swagger running at ${applicationUrl}/docs/`);
  });
}
bootstrap();
