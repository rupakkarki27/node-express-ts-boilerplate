import app from "./app";

import { PORT } from "./config/secrets";
// this is where the app runs
try {
  app.listen(PORT, () => console.log(`Server Started on port ${PORT}`));
} catch (error) {
  console.error(error.message);
}
