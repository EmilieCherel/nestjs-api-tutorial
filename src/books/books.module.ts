import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BooksController } from './books.controller';
import { BooksService } from './books.service';
import { BookSchema } from './books.model';


@Module({
    imports: [MongooseModule.forFeature([{name:'Book', schema: BookSchema}])],
    controllers: [BooksController],
    providers: [BooksService]
})
export class BooksModule {}
