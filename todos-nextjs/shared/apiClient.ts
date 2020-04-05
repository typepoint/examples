import { TypePointClient } from "@typepoint/client";

const client = new TypePointClient({
  server: "http://localhost:3000"
});

export default client;
