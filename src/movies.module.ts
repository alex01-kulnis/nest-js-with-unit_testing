import { MoviesService } from './movies/movies.service';
import { MoviesController } from './movies/movies.controller';
import { Module } from '@nestjs/common';

@Module({
  controllers: [MoviesController],
  providers: [MoviesService],
})
export class MoviesModule {}
