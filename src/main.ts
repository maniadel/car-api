import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe, BadRequestException, Catch, ExceptionFilter, ArgumentsHost } from '@nestjs/common';

/*async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
}
bootstrap(); */

@Catch(BadRequestException)
export class ValidationExceptionFilter implements ExceptionFilter<BadRequestException> {
  public catch (exception, host: ArgumentsHost) {
    const ctx = host.switchToHttp()
    const response = ctx.getResponse() //as express.Response
    console.log('exception: ', exception.message.statusCode )
    response
      .status(exception.message.statusCode)
      .json({
        statusCode: exception.message.statusCode,
        error: `Unprocessable Entity`,
        message: exception.message.message,
      })
  }
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({ transform: true , disableErrorMessages: false }));
  app.useGlobalFilters(new ValidationExceptionFilter());
  await app.listen(3000);
}
bootstrap();