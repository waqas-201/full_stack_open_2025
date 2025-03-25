const { test, after, beforeEach, describe } = require("node:test");
const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../index");
const assert = require("assert");
const User = require("../models/user");
const users = [
  { name: "irfan", username: "mr irfan", password: "123" },
  { name: "waqas", username: "mr waqas", password: "123" },
];
const invalidData = { name: "irfan", username: "mr ", password: "123" };
const api = supertest(app);

describe("testig user validation and errors", () => {
  beforeEach(async () => {
    await User.deleteMany(); // clear db

    const usersObject = users.map((user) => new User(user)); // seed new data in db
    await Promise.all(usersObject.map((user) => user.save()));
  });

  // Add a test case
  test("that ensure if data is not provided user must not be created", async () => {
    const responce = await api
      .post("/api/users")
      .expect(400)
      .expect("content-type", /application\/json/);
    assert("error" in responce.body);
  });

  test("that ensure if usename or password length is less then 3 characters ", async () => {
    const responce = await api
      .post("/api/users")
      .send(invalidData)
      .expect(400)
      .expect("content-type", /application\/json/);
    assert("error" in responce.body);
  });
});
after(async () => {
  await mongoose.connection.close();
});
