/* eslint-disable prettier/prettier */
import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger'

async function bootstrap() {
  const app = await NestFactory.create( AppModule )

  const options = new DocumentBuilder()
    .setTitle( 'realbank api' )
    .setDescription( 'realbank db api server' )
    .setVersion( '1.0' )
    .build()

  const document = SwaggerModule.createDocument( app, options )
  SwaggerModule.setup( 'api', app, document )

  await app.listen( 3000 )
}
bootstrap()
