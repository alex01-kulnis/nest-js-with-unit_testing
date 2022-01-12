import { Module } from '@nestjs/common';
import { MoviesModule } from './movies.module';
import { AppController } from './movies/app.controller';

@Module({
  imports: [MoviesModule],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
