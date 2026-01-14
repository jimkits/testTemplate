export class Helpers{
    
    public getRandomUsername(){
        const crypto = require('node:crypto');

        return `user${crypto.randomUUID()}@fake.net`;
    }
}