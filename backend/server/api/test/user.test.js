
const request = require("supertest");
const app = require("../index");
const { UsersModel } = require("../model/user.model")

let user;

describe("Test users routes", () => {
  const server = request(app);
	
	beforeAll(async () => {
		user = await UsersModel.create({username:"Jame", email: "james@gmail.com", name: "Jame", });
    })

	afterAll(async () => {
		await UsersModel.deleteMany();
	})

  describe("Test /users", () => {
    it("should return list of users", (done) => {
      server
        .get("/users")
        .set("Content-Type", "application/json")
        .set("Accept", "application/json")
        .end(async (err, result) => {
          if (err) {
            done(err);
          }
		      expect(result.body.length).toBe(1);
          expect(result.body[0].username).toBe(user.username);
          expect(result.body[0].email).toBe(user.email);
          expect(result.body[0].name).toBe(user.name);

          done();
        });
    });    


// ...
it("should create new user", (done) => {
    const newUser = {
        username: "Joe12",
        email: "joe@gmail.com",
        name: "Joe"
    };
  server
  .post("/user")
  .set("Content-Type", "application/json")
  .set("Accept", "application/json")
    .send(newUser)
  .end(async (err, result) => {
     if (err) {
       done(err);
     }
    expect(result.body.username).toBe(newUser.username);
    expect(result.body.email).toBe(newUser.email);
    expect(result.body.name).toBe(newUser.name);

    done();
    });
});


//...
it("should return list of users", (done) => {
    server
      .get("/users")
      .query({"createdAt": new Date()})
      .set("Content-Type", "application/json")
      .set("Accept", "application/json")
      .end(async (err, result) => {
        if (err) {
          done(err);
        }
        expect(result.body.length).toBe(2);
        expect(result.body[0].username).toBe(user.username);
        expect(result.body[0].email).toBe(user.email);
        expect(result.body[0].name).toBe(user.name);

        done();
      });
});



  });
});