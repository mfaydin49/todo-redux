const { default: mongoose } = require("mongoose");
require("dotenv").config();

const connectDB = async () => {
  try {
    const db = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@atlascluster.mgqga.mongodb.net/?retryWrites=true&w=majority`;
    await mongoose.connect(db, { useNewUrlParser: true });
    console.log("MongoDB connected");
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

module.exports = connectDB;
