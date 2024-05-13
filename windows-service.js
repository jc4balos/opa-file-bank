const Service = require("node-windows").Service;

// Customize these details as needed
const svc = new Service({
  name: "OPA File Bank",
  description: "File Bank of Office of Provincial Agrigulturist",
  script: "./service.js", // Replace with the actual path to your service.js
});

svc.on("install", function () {
  svc.start();
  console.log("Service installed and started!");
});

svc.install();
