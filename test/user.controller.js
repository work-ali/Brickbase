var chai = require("chai");
var sinon = require("sinon");
var UserController = require("../controllers/UserController");
var User = require("../models/User");

var expect = chai.expect;
chai.use(require("sinon-chai"));

describe("UserController", function() {
  it("should create a user", function() {
    var mocks = { ...require("./mocks") };
    let req = mocks.req;
    req.body = {
      first_name: "test",
      last_name: "test",
      email: "test@test.com",
      password: "test",
      date_created: new Date(),
      date_modified: new Date()
    };
    User.create = sinon.spy(function(a) {
      return new Promise(function(resolve, reject) {
        resolve("test");
      });
    });
    mocks.res.status = sinon.spy(mocks.res.status);
    mocks.res.json = sinon.spy(mocks.res.json);
    UserController.create(req, mocks.res);
  });

  it("should not create a user", function() {
    var mocks = { ...require("./mocks") };
    let req = mocks.req;
    req.body = {
      first_name: "test",
      last_name: "test",
      email: "test@test.com",
      password: "test",
      date_created: new Date(),
      date_modified: new Date()
    };
    User.create = sinon.spy(function(a) {
      return new Promise(function(resolve, reject) {
        reject("test");
      });
    });
    mocks.res.status = sinon.spy(mocks.res.status);
    mocks.res.json = sinon.spy(mocks.res.json);
    UserController.create(req, mocks.res);
  });

  it("should not return user object", function() {
    var mocks = { ...require("./mocks") };
    let req = mocks.req;
    delete req.params.id;
    mocks.res.status = sinon.spy(mocks.res.status);
    mocks.res.json = sinon.spy(mocks.res.json);
    UserController.get(req, mocks.res);
  });

  it("should return user object", function() {
    var mocks = { ...require("./mocks") };
    let req = mocks.req;
    req.params.id = "542c2b97bac0595474108b48";
    User.findById = sinon.spy(function(a) {
      return new Promise(function(resolve, reject) {
        resolve("test");
      });
    });
    mocks.res.status = sinon.spy(mocks.res.status);
    mocks.res.json = sinon.spy(mocks.res.json);
    UserController.get(req, mocks.res);
  });

  it("should throw an error", function() {
    var mocks = { ...require("./mocks") };
    let req = mocks.req;
    req.params.id = "542c2b97bac0595474108b48";
    User.findById = sinon.spy(function(a) {
      return new Promise(function(resolve, reject) {
        reject("test");
      });
    });
    mocks.res.status = sinon.spy(mocks.res.status);
    mocks.res.json = sinon.spy(mocks.res.json);
    UserController.get(req, mocks.res);
  });

  it("should update user object", function() {
    var mocks = { ...require("./mocks") };
    UserController.update(mocks.req, mocks.res);
  });

  it("should delete user object", function() {
    var mocks = { ...require("./mocks") };
    UserController.remove(mocks.req, mocks.res);
  });
});
