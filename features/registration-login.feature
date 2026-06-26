@smoke @regression
Feature: ParaBank User Registration and Login

  Background:
    Given user is on the ParaBank homepage

  @register @P1
  Scenario: Register a new user and verify account balance
    When user navigates to the registration page
    And user fills in the registration form
    And user submits the registration form
    Then user should be registered and logged in successfully
    When user opens a new bank account
    And user clicks on the new account link
    Then the account balance should be displayed

  @login @P1
  Scenario: Registered user can logout and log back in
    When user navigates to the registration page
    And user fills in the registration form
    And user submits the registration form
    Then user should be registered and logged in successfully
    When user logs out of the application
    Then the login page should be displayed
    When user logs in with valid credentials
    Then user should be logged in successfully
