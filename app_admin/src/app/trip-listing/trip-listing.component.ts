import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

// Components
import { TripCardComponent } from '../trip-card/trip-card.component';

// Services
import { TripDataService } from '../services/trip-data.service';
import { AuthenticationService } from '../services/authentication.service';

// Models
import { Trip } from '../models/trip';
import { TravelPreferences } from '../models/travel-preferences';
import { TripRecommendation } from '../models/trip-recommendation';

@Component({
  selector: 'app-trip-listing',
  standalone: true,
  imports: [CommonModule, FormsModule, TripCardComponent],
  templateUrl: './trip-listing.component.html',
  styleUrl: './trip-listing.component.css',
  providers: [TripDataService]
})
export class TripListingComponent implements OnInit {
  trips: Trip[] = [];
  recommendedTrips: TripRecommendation[] = [];

  preferences: TravelPreferences = {
    resort: '',
    maxPrice: null,
    maxDays: null
  };

  message = '';
  recommendationMessage = '';
  hasSearched = false;

  constructor(
    private tripDataService: TripDataService,
    private router: Router,
    private authenticationService: AuthenticationService
  ) {
    console.log('trip-listing constructor');
  }

  ngOnInit(): void {
    console.log('ngOnInit');
    this.getTrips();
  }

  public addTrip(): void {
    this.router.navigate(['add-trip']);
  }

  /**
   * Scores and ranks available trips according to the user's selected
   * resort, maximum price, and maximum trip-length preferences.
   */
  public recommendTrips(): void {
    if (!this.hasAtLeastOnePreference()) {
      this.recommendedTrips = [];
      this.hasSearched = false;
      this.recommendationMessage =
        'Enter at least one preference before finding recommendations.';
      return;
    }

    this.recommendedTrips = this.trips
      .map((trip: Trip) => this.scoreTrip(trip))
      .filter((result: TripRecommendation) => result.score > 0)
      .sort((first: TripRecommendation, second: TripRecommendation) => {
        if (second.score !== first.score) {
          return second.score - first.score;
        }

        return this.parsePrice(first.trip.perPerson) -
          this.parsePrice(second.trip.perPerson);
      });

    this.hasSearched = true;

    if (this.recommendedTrips.length > 0) {
      this.recommendationMessage =
        `${this.recommendedTrips.length} recommended trip(s) found.`;
    } else {
      this.recommendationMessage =
        'No trips matched the selected preferences.';
    }
  }

  /**
   * Clears the user's travel preferences and any recommendation results.
   */
  public clearRecommendations(): void {
    this.preferences = {
      resort: '',
      maxPrice: null,
      maxDays: null
    };

    this.recommendedTrips = [];
    this.recommendationMessage = '';
    this.hasSearched = false;
  }

  public isLoggedIn(): boolean {
    return this.authenticationService.isLoggedIn();
  }

  private getTrips(): void {
    this.tripDataService.getTrips().subscribe({
      next: (value: Trip[]) => {
        this.trips = value;

        if (value.length > 0) {
          this.message = `There are ${value.length} trips available.`;
        } else {
          this.message = 'There were no trips retrieved from the database.';
        }

        console.log(this.message);
      },
      error: (error: unknown) => {
        this.message = 'An error occurred while retrieving trips.';
        console.error('Error retrieving trips:', error);
      }
    });
  }

  /**
   * Determines whether the user has entered at least one
   * travel preference before generating recommendations.
   */
  private hasAtLeastOnePreference(): boolean {
    return this.preferences.resort.trim().length > 0 ||
      (this.preferences.maxPrice !== null && this.preferences.maxPrice > 0) ||
      (this.preferences.maxDays !== null && this.preferences.maxDays > 0);
  }

  /**
   * Calculates a recommendation score for one trip and records each
   * preference that the trip satisfies.
   */
  private scoreTrip(trip: Trip): TripRecommendation {
    let score = 0;
    const matches: string[] = [];

    const preferredResort = this.preferences.resort.trim().toLowerCase();
    const tripResort = trip.resort.toLowerCase();

    if (preferredResort && tripResort.includes(preferredResort)) {
      score += 3;
      matches.push('Preferred resort or destination');
    }

    if (
      this.preferences.maxPrice !== null &&
      this.preferences.maxPrice > 0 &&
      this.parsePrice(trip.perPerson) <= this.preferences.maxPrice
    ) {
      score += 2;
      matches.push('Within budget');
    }

    if (
      this.preferences.maxDays !== null &&
      this.preferences.maxDays > 0 &&
      this.parseDays(trip.length) <= this.preferences.maxDays
    ) {
      score += 1;
      matches.push('Within maximum trip length');
    }

    return {
      trip,
      score,
      matches
    };
  }

  /**
   * Extracts the numeric value from a trip's per-person price.
   * Returns positive infinity if the price cannot be parsed.
   */
  private parsePrice(perPerson: string): number {
    const numericPrice = perPerson.replace(/[^0-9.]/g, '');
    const price = Number.parseFloat(numericPrice);
    return Number.isNaN(price) ? Number.POSITIVE_INFINITY : price;
  }

  /**
   * Extracts the number of days from a trip-length string.
   * Returns positive infinity if the trip length cannot be parsed.
   */
  private parseDays(length: string): number {
    const dayMatch = length.match(/(\d+)\s*days?/i);

    if (!dayMatch) {
      return Number.POSITIVE_INFINITY;
    }

    return Number.parseInt(dayMatch[1], 10);
  }
}