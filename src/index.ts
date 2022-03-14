import app from "./app";

const PORT = 4005;

try {
  app.listen(PORT, () => console.log(`Server Started on port ${PORT}`));
} catch (error) {
  console.error(error.message);
}
