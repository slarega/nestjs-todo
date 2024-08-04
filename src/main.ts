import {NestFactory} from "@nestjs/core";
import {AppModule} from "./app.module";
import {DocumentBuilder, SwaggerModule} from "@nestjs/swagger";
import * as process from "process";
import { Logger, LoggerErrorInterceptor } from 'nestjs-pino';
import { ValidationPipe } from "@nestjs/common";

async function start() {
    const PORT = process.env.PORT || 5000;

    const app = await NestFactory.create(AppModule, { bufferLogs: true })
    app.useLogger(app.get(Logger))
    app.useGlobalInterceptors(new LoggerErrorInterceptor())

    const config = new DocumentBuilder()
        .setTitle('ToDO List App')
        .setDescription('API документация')
        .setVersion('1.0.0')
        .addApiKey({
              type: "apiKey",
              name: "x-bearer-token",
              in: "header",
              description: "Введите x-bearer-token"
                },
            "x-bearer-token")
        .build()

    const document = SwaggerModule.createDocument(app, config)

    SwaggerModule.setup(
        '/api/docs',
        app,
        document,
        // https://swagger.io/docs/open-source-tools/swagger-ui/usage/configuration/
        {swaggerOptions: {tagsSorter: 'alpha'}}
    )

    app.useGlobalPipes(new ValidationPipe())

    await app.listen(PORT, () =>
        console.log(`Server running on http://localhost:${PORT}/`))
}

start()