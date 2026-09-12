import test from "node:test";
import assert from "node:assert/strict";
import request from "supertest";

process.env.MONGODB_URI ||= "mongodb://127.0.0.1:27017";
process.env.JWT_SECRET ||= "test-secret";

const { default: app } = await import("../app.js");

test("GET /health returns ok", async () => {
  const response = await request(app).get("/health");
  assert.equal(response.statusCode, 200);
  assert.equal(response.body.status, "ok");
});
