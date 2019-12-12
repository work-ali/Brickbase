"use strict";

var chai = require("chai");
var spies = require("chai-spies");
var EventController = require("../controllers/EventController");
var Event = require("../models/Events");
var mocks = { ...require("./mocks") };
var sinon = require("sinon");
var expect = chai.expect;
chai.use(require("sinon-chai"));

describe("EventController", function() {
  it("should not create an event if already exists", async function() {
    let req = mocks.req;
    req.body = {
      start: new Date().getTime(),
      end: new Date().getTime(),
      location: {
        latLng: {
          lng: 0.123,
          lat: 0.132
        },
        address: "123"
      },
      title: "test",
      details: "test@test.com",
      user_id: "542c2b97bac0595474108b48"
    };
    mocks.res.status = sinon.spy(mocks.res, "status");
    Event.findOne = sinon.spy(function(a) {
      return new Promise(function(resolve, reject) {
        resolve("test");
      });
    });
    await EventController.addEvent(req, mocks.res);
    expect(mocks.res.status).to.have.been.calledWith(500);
  });

  it("should not create an event", async function() {
    let req = mocks.req;
    req.body = {
      start: new Date().getTime(),
      end: new Date().getTime(),
      location: {
        latLng: {
          lng: 0.123,
          lat: 0.132
        },
        address: "123"
      },
      title: "test",
      details: "test@test.com",
      user_id: "542c2b97bac0595474108b48"
    };
    mocks.res.status = sinon.spy(mocks.res.status);
    Event.findOne = sinon.spy(function(a) {
      return new Promise(function(resolve, reject) {
        reject("test");
      });
    });
    await EventController.addEvent(req, mocks.res);
    expect(mocks.res.status).to.have.been.calledWith(500);
  });

  it("addEvent should create an event", async function() {
    let req = mocks.req;
    req.body = {
      start: new Date().getTime(),
      end: new Date().getTime(),
      location: {
        latLng: {
          lng: 0.123,
          lat: 0.132
        }
      },
      title: "test",
      details: "test@test.com",
      user_id: "542c2b97bac0595474108b48"
    };
    mocks.res.status = sinon.spy(function(a) {
      return { json: a => {} };
    });
    Event.findOne = sinon.spy(function(a) {
      return new Promise(function(resolve, reject) {
        resolve(null);
      });
    });
    Event.create = sinon.spy(function(a) {
      return new Promise(function(resolve, reject) {
        resolve(null);
      });
    });
    await EventController.addEvent(req, mocks.res);
    expect(mocks.res.status).to.have.been.calledWith(200);
  });

  it("addEvent should throw an error", async function() {
    let req = mocks.req;
    req.body = {
      start: new Date().getTime(),
      end: new Date().getTime(),
      location: {
        latLng: {
          lng: 0.123,
          lat: 0.132
        }
      },
      title: "test",
      details: "test@test.com",
      user_id: "542c2b97bac0595474108b48"
    };
    mocks.res.status = sinon.spy(function(a) {
      return { json: a => {} };
    });
    Event.findOne = sinon.spy(function(a) {
      return new Promise(function(resolve, reject) {
        resolve(null);
      });
    });
    Event.create = sinon.spy(function(a) {
      return new Promise(function(resolve, reject) {
        reject(null);
      });
    });
    await EventController.addEvent(req, mocks.res);
    expect(mocks.res.status).to.have.been.calledWith(500);
  });

  it("getAllEvents should return all events", async function() {
    var mocks = { ...require("./mocks") };
    let req = mocks.req;
    delete req.params.id;
    Event.find = sinon.spy(function(a) {
      return new Promise(function(resolve, reject) {
        resolve("test");
      });
    });
    mocks.res.json = sinon.spy(mocks.res.json);
    await EventController.getAllEvents(req, mocks.res);
    expect(mocks.res.json).to.have.been.calledWith({
      events: "test",
      success: true
    });
  });

  it("getAllEvents should not return all events", async function() {
    var mocks = { ...require("./mocks") };
    let req = mocks.req;
    delete req.params.id;
    Event.find = sinon.spy(function(a) {
      return new Promise(function(resolve, reject) {
        reject("test");
      });
    });
    mocks.res.status = sinon.spy(mocks.res.status);
    await EventController.getAllEvents(req, mocks.res);
    expect(mocks.res.status).to.have.been.calledWith(500);
  });

  it("should return user events", function() {
    var mocks = { ...require("./mocks") };
    let req = mocks.req;
    var res = {
      json: () => {},
      status: () => {}
    };
    Event.find = sinon.spy(function(a) {
      return new Promise(function(resolve, reject) {
        resolve("test");
      });
    });
    req.params.user_id = "542c2b97bac0595474108b48";
    mocks.res.status = sinon.spy(mocks.res.status);
    EventController.getAllEventsByUserId(req, mocks.res);
  });

  it("should not return user events", async function() {
    var mocks = { ...require("./mocks") };
    let req = mocks.req;
    var res = {
      json: () => {},
      status: () => {}
    };
    res.status = sinon.spy(res.status);
    delete req.params.user_id;
    EventController.getAllEventsByUserId(req, mocks.res);
  });

  it("should not return user events and throw error", async function() {
    var mocks = { ...require("./mocks") };
    let req = mocks.req;
    var res = {
      json: () => {},
      status: () => {}
    };
    res.status = sinon.spy(res.status);
    delete req.params.user_id;
    EventController.getAllEventsByUserId(req, mocks.res);
  });

  it("should throw errors", async function() {
    var mocks = { ...require("./mocks") };
    let req = mocks.req;
    Event.find = sinon.spy(function(a) {
      return new Promise(function(resolve, reject) {
        reject("test");
      });
    });
    mocks.res.status = sinon.spy(mocks.res.status);
    mocks.res.json = sinon.spy(mocks.res.json);
    req.params.user_id = "542c2b97bac0595474108b48";
    EventController.getAllEventsByUserId(req, mocks.res);
  });
});
