import { Trip } from "./trip";

/**
 * Defines the data returned by the recommendation engine,
 * including the recommended trip, its score, and the matching
 * criteria.
 */

export interface TripRecommendation {
    trip: Trip;
    score: number;
    matches: string[];
}