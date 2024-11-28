import express, {Request, Response} from "express";
import path from "path";

const app = express();
const PORT = process.env.PORT || 3000;

// Serve static files from the "out" directory
app.use(express.static(path.join(__dirname, "../../frontend/out")));

// API route
app.get("/api", (req: Request, res: Response) => {
  res.json({message: "Hello from the Backend!"});
});

// Handle SPA routing and serve index.html for all valid frontend routes
app.get("*", (req: Request, res: Response) => {
  const staticPath = path.join(__dirname, "../../frontend/out", req.path);

  // If the requested file exists, serve it
  if (
    req.path !== "/" &&
    req.path.includes(".") &&
    staticPath.startsWith(path.join(__dirname, "../../frontend/out"))
  ) {
    return res.sendFile(staticPath, (err) => {
      if (err) {
        // If the file isn't found, serve the 404.html page
        return res
          .status(404)
          .sendFile(path.join(__dirname, "../../frontend/out/404.html"));
      }
    });
  }

  // Otherwise, serve index.html for SPA routing
  res.sendFile(path.join(__dirname, "../../frontend/out/index.html"), (err) => {
    if (err) {
      res
        .status(404)
        .sendFile(path.join(__dirname, "../../frontend/out/404.html"));
    }
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Backend is running on http://localhost:${PORT}`);
});
