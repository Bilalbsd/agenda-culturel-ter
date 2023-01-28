const mongoose = require('mongoose');
require('dotenv').config({ path: '.env' })

main().then(() => console.log('Connected to MongoDB'))
main().catch(err => console.log(err));

async function main() {
    mongoose.set('strictQuery', true)
    await mongoose.connect('mongodb+srv://' + process.env.DB_USER_PASS + '@cluster0.msot2us.mongodb.net/agenda-culturel');
}