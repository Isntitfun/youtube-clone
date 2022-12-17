import mongoose from "mongoose";

mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

const handleServerError = (error) => {
  console.log("⛔ DB Error", error);
};

const handleServerOpen = () => {
  console.log("✅ Connected to DB");
};

db.on("error", handleServerError);
db.once("open", handleServerOpen);

const a = "a";
