import express, {Request, Response} from "express";

const app = express();
const PORT = process.env.PORT || 3001;

app.get("/api", (req: Request, res: Response) => {
  res.json({message: "Hello from the Backend!"});
});

app.listen(PORT, () => {
  console.log(`Backend is running on http://localhost:${PORT}`);
});
