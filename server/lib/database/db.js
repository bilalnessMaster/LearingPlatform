import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
dotenv.config()

export const db = async ()=>{
    try {
        const url = process.env.MONGODB_URL
        const hosClient = await mongoose.connect(url)
        console.log('successfully connected to mongodb : '+hosClient.connection.host );
        
    } catch (error) {
        console.log('error occured while trying to  connect to database');
        
    }
}