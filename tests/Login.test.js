const request = require("supertest");
const app = require("../app"); // Path to your Express application

describe("Test Case: User Functions", () => {

    it("should return error for invalid email or password", (done) => {
        request(app)
            .post("/api/v1/auth/login")
            .send({
                email: "wrongemail@gmail.com",
                password: "wrongpassword",
            })
            .end((err, response) => {
                if (err) return done(err);
                expect(response.statusCode).toBe(401); 
                expect(response.body.status).toEqual("error");
                expect(response.body.message).toEqual("Invalid Email or Password");

                done();
            });
    });

    it("should authenticate user with correct credentials and validate specific response elements", (done) => {
        request(app)
            .post("/api/v1/auth/login")
            .send({
                email: "0110harold@gmail.com",
                password: "Izukishun@30",
            })
            .end((err, response) => {
                if (err) return done(err);
                expect(response.statusCode).toBe(200);
                expect(response.body.userData.user.status).toEqual("Active");
                expect(response.body.userData.token).toEqual(expect.any(String));

                done();
            });
    });


});
