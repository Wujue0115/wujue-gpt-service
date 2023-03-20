import express from "express";
import cors from "cors";
import fetch from "node-fetch";
import * as dotenv from "dotenv";

dotenv.config()

const CHAT_API_URL = "https://api.openai.com/v1/chat/completions";
const app = express();

app.use(cors())
app.use(express.json());


app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.post("/openai/chat", async (req, res) => {
  console.log("fetch chat api...");

  const response = await fetch(CHAT_API_URL, {
    method: "POST",
      headers: {
        "Authorization": "Bearer " + process.env.OPENAI_API_KEY,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(req.body)
  });

  if (response.ok) {
    // 回傳 Readablestream
    response.body.pipe(res);
  } else {
    res.send("response is not ok!");
  }
})

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`)
});