const mongoose = require('mongoose')

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI, {})
        console.log('MongoDB connected')
    } catch (error) {
        console.log('error connecting ot MongoDB', error)
        process.exit(1)
    }
}

module.exports = connectDB