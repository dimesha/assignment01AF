const request = require("supertest");
const app = require("../index");
const { ClassModel } = require("../model/timetable.model")

let user;

describe("Test timetable routes", () => {
  const server = request(app);
	
	beforeAll(async () => {
		user = await ClassModel.create({
            classSession:"mmmmmmmm",
            course:"609c74d5a6c08b0b57d42a22",
            day:"2024-04-21",
            startTime:"01:03",
            endTime:"3:03",
            faculty:"609c74d5a6c08b0b57d42a45",
            location:"METRO"});
    })

	afterAll(async () => {
		await ClassModel.deleteMany();
	})

  describe("Test /classroom", () => {
    it("should return list of save details", (done) => {
      server
        .get("/classroom")
        .set("Content-Type", "application/json")
        .set("Accept", "application/json")
        .end(async (err, result) => {
          if (err) {
            done(err);
          }
		      expect(result.body.length).toBe(1);
          expect(result.body[0].classSession).toBe(user.classSession);
          expect(result.body[0].startTime).toBe(user.startTime);
          expect(result.body[0].endTime).toBe(user.endTime);
        
          done();
        });
    });    
  });
});