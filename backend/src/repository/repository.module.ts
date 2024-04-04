import { Module } from '@nestjs/common';
import { MockRepository } from './json/implementacoes/mock.repository';

@Module({
  controllers: [],
  providers: [MockRepository],
   exports: [MockRepository],
})
export class RepositoryModule {}