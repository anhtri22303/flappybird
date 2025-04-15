const express = require("express");
const path = require("path");
const app = express();

// Xác định port: sử dụng port do Vercel cung cấp hoặc 1234 để phát triển cục bộ
const PORT = process.env.PORT || 1234;

// Serve static files from the current directory
app.use(express.static(__dirname));

// Serve Phaser from node_modules
app.use(
  "/phaser",
  express.static(path.join(__dirname, "node_modules/phaser/dist"))
);

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

// Đối với Vercel, cần export app thay vì listen
if (process.env.VERCEL) {
  module.exports = app;
} else {
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
}
