// import app from "../src/app";
// import request from "supertest";

// import { PORT } from "../src/config/secrets";

// describe("Test Application", () => {
//   let server;
//   beforeAll(() => {
//     server = app.listen(PORT, () => console.log(`App started on port ${PORT}`));
//   });

//   it("GET /", () => {
//     request(server).get("/").expect(200);
//   });

//   afterAll(() => {
//     server.close(() => console.log("Server closed"));
//   });
// });

describe("Simple Test", () => {
  it("Should add 2 and 2", () => {
    expect(2 + 2).toBe(4);
  });
});
