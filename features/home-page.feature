Feature: User can access home page

  Background:
    Given Go to home page

  Scenario: User can access home page without problem
    When Click on menu Pricing
    Then Everything is fine

  Scenario: User can see a price $69
    When Click on menu Pricing
    Then Everything is fine
    Then There is 69 dollar price
