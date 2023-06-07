import { Controller, Post, Body, Get, Param, Patch, Delete} from "@nestjs/common";
import { BooksService } from "./books.service";

@Controller('books')
export class BooksController{
    constructor(private readonly booksService: BooksService){}

    @Post()
    async addBook(
        @Body('title') bookTitle: string,
        @Body('author') bookAuthor: string,
        @Body('description') bookDesc: string,
        @Body('ownedVolumes') bookOwnedVolumes: number,
        @Body('releasedVolumes') bookReleasedVolumes: number
        ) {
        const generatedId = await this.booksService.insertBook(
            bookTitle, 
            bookAuthor, 
            bookDesc, 
            bookOwnedVolumes, 
            bookReleasedVolumes);
        return {id : generatedId};
    }

    @Get()
    async getAllBooks(){
        const books = await this.booksService.getBooks()
        return books
    }

    @Get(':id')
    getBook(@Param('id') bookId: string){
        return this.booksService.getSingleBook(bookId);
    }

    @Patch(':id')
    async updateBook(
        @Param('id') bookId: string,
        @Body('title') bookTitle: string,
        @Body('author') bookAuthor: string,
        @Body('description') bookDesc: string,
        @Body('ownedVolumes') bookOwnedVolumes: number,
        @Body('releasedVolumes') bookReleasedVolumes: number
        ){
            await this.booksService.updateBook(bookId,bookTitle,bookAuthor,bookDesc,bookOwnedVolumes,bookReleasedVolumes)
            return null;
        }

        @Delete(':id')
        async removeBook(@Param('id') bookId: string){
            await this.booksService.deleteBook(bookId)
            return null;
        }
}