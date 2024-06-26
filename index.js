import cors from "cors";
import express from "express";
const app = express();

const port = 3000;
app.use(
  cors({
    origin: "*",
  })
);
app.use(express.json());
// Middleware for Basic Auth validation
const basicAuth = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  console.log("🚀 ~ basicAuth ~ authHeader:", authHeader);

  if (!authHeader || !authHeader.startsWith("Basic ")) {
    return res.status(401).send("Missing or invalid authorization header");
  }

  // Decode base64
  const base64Credentials = authHeader.split(" ")[1];
  const credentials = Buffer.from(base64Credentials, "base64").toString(
    "ascii"
  );
  const [username, password] = credentials.split(":");

  // Validate the username and password (this should be replaced with your actual validation logic)
  if (username === "moga" && password === "samsu") {
    next();
  } else {
    return res.status(401).send("Invalid username or password");
  }
};

// Endpoint to test the authentication
app.get("/validate", basicAuth, (req, res) => {
  res.status(200).send("Authenticated");
});

// Your other routes
app.get("/some-endpoint", basicAuth, (req, res) => {
  res.status(200).send("You are authenticated");
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
