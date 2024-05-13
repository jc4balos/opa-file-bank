import { Service } from "node-windows";

const service = new Service({
  name: "opaFileBankFrontendService",
  description: "Website service of OPA File Bank",
  script: "",
});
