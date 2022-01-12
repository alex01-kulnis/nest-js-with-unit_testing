import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { MoviesService } from './movies.service';

describe('MoviesService', () => {
  let service: MoviesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MoviesService],
    }).compile();

    service = module.get<MoviesService>(MoviesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('Function testing getAll', () => {
    it('An array should be returned', () => {
      const result = service.getAll();
      expect(result).toBeInstanceOf(Array);
    });
  });

  describe('Function testing getOne', () => {
    it('should be return film', () => {
      service.create({
        title: 'Test film',
        genres: ['Test genre'],
        year: 2000,
      });
      const movie = service.getOne(1);
      expect(movie).toBeDefined();
    });

    it('Should be return NotFoundException', () => {
      try {
        service.getOne(1111);
      } catch (e) {
        expect(e).toBeInstanceOf(NotFoundException);
      }
    });
  });

  describe('Function testing remove', () => {
    it('Film should be removed ', () => {
      service.create({
        title: 'Test film',
        genres: ['Test genre'],
        year: 2000,
      });
      const allMovies = service.getAll().length;
      service.remove(1);
      const afterRemove = service.getAll().length;
      expect(afterRemove).toBeLessThan(allMovies);
    });

    it('Should be return NotFoundException', () => {
      try {
        service.remove(1111);
      } catch (e) {
        expect(e).toBeInstanceOf(NotFoundException);
      }
    });
  });

  describe('Function testing create', () => {
    it('Film should be created', () => {
      const beforeCreate = service.getAll().length;
      service.create({
        title: 'Test film',
        genres: ['Test genre'],
        year: 2000,
      });
      const afterCreate = service.getAll().length;
      expect(afterCreate).toBeGreaterThan(beforeCreate);
    });
  });

  describe('Function testing patch', () => {
    it('Film should be changed', () => {
      service.create({
        title: 'Test film',
        genres: ['Test genre'],
        year: 2000,
      });
      service.patch(1, { title: 'updated test' });
      const movie = service.getOne(1);
      expect(movie.title).toEqual('updated test');
    });

    it('Should be return NotFoundException', () => {
      try {
        service.patch(1111, { title: '' });
      } catch (e) {
        expect(e).toBeInstanceOf(NotFoundException);
      }
    });
  });
});
