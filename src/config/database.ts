import { config } from 'dotenv';
import mongoose, { type Connection } from 'mongoose';
config();

let connection: Connection | null = null;

const connect = async (): Promise<void> => {
  if (connection != null) return

  const MONGO_URI = process.env.DB_CONNECTION_STRING as string;

  connection = mongoose.connection

  connection.once('open', () => {
    console.log('Connected to MongoDB')
  })

  connection.on('error', (error: unknown) => {
    console.log('Error connecting to MongoDB', error)
  })

  await mongoose.connect(MONGO_URI)
}

export default connect
