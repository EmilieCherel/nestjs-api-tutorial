import mongoose, * as monngoose from 'mongoose'

export const BookSchema = new monngoose.Schema({
    title: {type: String, required: true},
    author: {type: String, required: true},
    description: {type: String, required: true},
    ownedVolumes:{type: Number, required: true},
    releasedVolumes: {type: Number, required: true},

})


export interface Book extends mongoose.Document {
    id: string; 
    title: string;
    author: string; 
    description: string; 
    ownedVolumes: number; 
    releasedVolumes: number; 
}