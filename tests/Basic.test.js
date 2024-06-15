const request = require("supertest");
const app = require("../app"); // Path to your Express application

describe("GET Extension Tools", done => {
  it("should return 200 OK", done => {
    request(app)
      .get("/")
      .end((err, response) => {
        if (err) return done(err);
        expect(response.statusCode).toBe(200);
        done();
      });
  });

  it("should return 200 OK", done => {
    request(app)
      .get("/orm-builder/")
      .end((err, response) => {
        if (err) return done(err);
        expect(response.statusCode).toBe(200);
        done();
      });
  });
});
