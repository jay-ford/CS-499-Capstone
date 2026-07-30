/**
 * Defines the user's travel preference criteria used to generate
 * personalized trip recommendations.
 */

export interface TravelPreferences {
    resort: string;
    maxPrice: number | null;
    maxDays: number | null;
}