import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BooksModule } from './books/books.module';



@Module({
  imports: [BooksModule, MongooseModule.forRoot(
    'mongodb+srv://emilieS:xyAFwSoSBfAkmGaF@bookmarknest.f2itmpo.mongodb.net/?retryWrites=true&w=majority'
    )]
})
export class AppModule {}
