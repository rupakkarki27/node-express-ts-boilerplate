import app from "./app";

import { PORT } from "./config/secrets";

try {
  app.listen(PORT, () => console.log(`Server Started on port ${PORT}`));
} catch (error) {
  console.error(error.message);
}
