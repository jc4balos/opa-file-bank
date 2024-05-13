const express = require("express");
const path = require("path");

// Assuming your built React app is in the `build` directory
const buildPath = path.join(__dirname, "build");

const app = express();
app.use(express.static(buildPath));

app.get("*", (req, res) => {
  res.sendFile(path.join(buildPath, "index.html"));
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server listening on port ${port}`));
