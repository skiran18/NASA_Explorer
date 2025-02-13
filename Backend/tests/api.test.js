const request = require("supertest");
const app = require("../app");

describe("🌍 Integration Tests for NASA API Endpoints", () => {
  
  test("GET /api/apod should return APOD data", async () => {
    const response = await request(app).get("/api/apod");
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("title");
    expect(response.body).toHaveProperty("url");
  });

  test("GET /api/mars should return Mars Rover photos", async () => {
    const response = await request(app).get("/api/mars");
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("photos");
    expect(Array.isArray(response.body.photos)).toBe(true);
  });

  test("GET /api/mars/:camType should return filtered Mars Rover photos", async () => {
    const response = await request(app).get("/api/mars/FHAZ");
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("photos");
  });

  test("GET /api/neo should return Near-Earth Objects data", async () => {
    const response = await request(app).get("/api/neo");
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("near_earth_objects");
    expect(typeof response.body.near_earth_objects).toBe("object");
  });


  test("GET /invalid-route should return 404", async () => {
    const response = await request(app).get("/invalid-route");
    expect(response.status).toBe(404);
  });

});
