import { describe, it, expect } from "vitest";
import { calculatePodiumPoints } from "./scoring.js";

describe("calculatePodiumPoints", () => {

	it("Returns 25 points, when only the winner is predicted correctly", () => {
		expect(calculatePodiumPoints(["A", "X", "Y"], ["A", "B", "C"])).toBe(25)
	});

	it("Returns 18 points, when only the second place is predicted correctly", () => {
		expect(calculatePodiumPoints(["X", "B", "Y"], ["A", "B", "C"])).toBe(18)
	});
	
	it("Returns 15 points, when only the third place is predicted correctly", () => {
		expect(calculatePodiumPoints(["X", "Y", "C"], ["A", "B", "C"])).toBe(15)
	});
	
	it("Returns 13 points, when driver predicted second actually won the race", () => {
		expect(calculatePodiumPoints(["X", "A", "Z"], ["A", "B", "C"])).toBe(13)
	});
	
	it("Returns 8 points, when driver predicted as a winner actually was third the race", () => {
		expect(calculatePodiumPoints(["C", "X", "Y"], ["A", "B", "C"])).toBe(8)
	});
	
	it("Returns 9 points, when driver predicted as a winner actually was second the race", () => {
		expect(calculatePodiumPoints(["B", "X", "Y"], ["A", "B", "C"])).toBe(9)
	});
	
	it("Returns 78 points, when whole podium is predicted correcty", () => {
		expect(calculatePodiumPoints(["A", "B", "C"], ["A", "B", "C"])).toBe(78)
	});
	
	it("Returns 30 points, when the whole podium is predicted but the drivers are in the wrong positions", () => {
		expect(calculatePodiumPoints(["B", "C", "A"], ["A", "B", "C"])).toBe(30);
	});
	
});









