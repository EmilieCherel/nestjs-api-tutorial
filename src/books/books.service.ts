import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import {Book} from './books.model'
import { Model } from "mongoose";

@Injectable({})
export class BooksService{
    private books: Book[] = []

    constructor(@InjectModel('Book') private readonly bookModel : Model<Book>) {}

    async insertBook(title: string, author: string, description: string, ownedVolumes: number, releasedVolumes: number) {
        const newBook = new this.bookModel({title, author, description, ownedVolumes, releasedVolumes})
        const result = await newBook.save()
        return result.id as string
    }

    async getBooks(){
        const books = await this.bookModel.find().exec();
        return books.map((book) => ({id: book.id, title: book.title, author: book.author, description: book.description, ownedVolumes: book.ownedVolumes, releasedVolumes: book.releasedVolumes }));
    }

    async getSingleBook(bookId: string){
        const book = await this.findBook(bookId);
        return {id: book.id, title: book.title, author: book.author, description: book.description, ownedVolumes: book.ownedVolumes, releasedVolumes: book.releasedVolumes }
    }

    async updateBook(bookId: string, title: string, author: string, description: string, ownedVolumes: number, releasedVolumes: number){
        const updatedBook = await this.findBook(bookId);
        if(title){
            updatedBook.title = title;
        }
        if(author){
            updatedBook.author = author;
        }
        if(description){
            updatedBook.description = description;
        }
        if(ownedVolumes){
            updatedBook.ownedVolumes = ownedVolumes;
        }
        if(releasedVolumes){
            updatedBook.releasedVolumes = releasedVolumes;
        }
        updatedBook.save();
    }

    async deleteBook(bookId: string){
       const result = await this.bookModel.deleteOne({id: bookId}).exec()
       console.log(result)
       if (result.deletedCount === 0){
        throw new NotFoundException('Could not find book.');
       }
    }

    private async findBook(id:string): Promise<Book>{
        let book;
        try {
            book = await this.bookModel.findById(id)
        } catch (error) {
            throw new NotFoundException('Could not find book.');
        }
        if (!book){
            throw new NotFoundException('Could not find book.');
        }
        return book;
    }

   
}