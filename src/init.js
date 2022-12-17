import "dotenv/config";
import "./db.js";
import Video from "./models/videos";
import User from "./models/users";
import Comment from "./models/comments.js";
import app from "./server.js";

const PORT = 4000;
const handleAppListen = () => {
  console.log(`✅ Listening on localhost:${PORT} :: No Error`);
};

app.listen(PORT, handleAppListen);
