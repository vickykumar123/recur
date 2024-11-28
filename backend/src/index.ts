import express, {Request, Response} from "express";
import path from "path";

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.static(path.join(__dirname, "../../frontend/out")));

app.get("/api", (req: Request, res: Response) => {
  res.json({message: "Hello from the Backend!"});
});

//This should be after all api routes
//This will solve manual refresh issue
app.get("*", (req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, "../../frontend/out", "index.html"));
});

app.listen(PORT, () => {
  console.log(`Backend is running on http://localhost:${PORT}`);
});
