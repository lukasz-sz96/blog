import { connectToDatabase } from "../../middleware/database";
import Cors from "cors";

const cors = Cors({
  methods: ["GET", "HEAD"],
});

function runMiddleware(req, res, fn) {
  return new Promise((resolve, reject) => {
    fn(req, res, (result) => {
      if (result instanceof Error) {
        return reject(result);
      }

      return resolve(result);
    });
  });
}

export default async function handler(req, res) {
  await runMiddleware(req, res, cors);
  const { db } = await connectToDatabase();
  if (req.method === "POST") {
    const { title, content, imageUrl } = JSON.parse(JSON.stringify(req.body));
    
    await db.collection("articles").insertOne({
      title: title,
      content: content,
      imageUrl: imageUrl,
    });
    res.status(200).json({ status: "ok" });
  } else {
    const isDuplicated = await db.collection("articles").findOne({
      title: req.query.title
    })
    if (isDuplicated) {
    res.status(200).json({ isDuplicated: true });
    } else {
    res.status(200).json({ isDuplicated: false });

    }

  }
}
