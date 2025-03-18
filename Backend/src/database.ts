import { connect } from 'mongoose';

(async () => {
  if (!process.env.MONGO_URI) {
    throw new Error('Set MONGO_URI in .env file');
  }

  try {
    await connect(process.env.MONGO_URI, {
      connectTimeoutMS: 5000
    });

    console.log(`Database: Connected`);
  } catch (err: Error | unknown) {
    console.log(`Database: Error: ${err}`);
  }
})();
