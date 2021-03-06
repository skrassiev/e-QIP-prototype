Feature: Psychological

  Scenario: Complete the Psychological competence subsection
    Given I am a registered user
    And I log in
    And I fill in the psychological competence section
    And I click Next to go to psychological consultations
    Then I should be in the psychological consultations section
    Then I log out

  Scenario: Complete the Psychological consultations subsection
    Given I am a registered user
    And I log in
    And I fill in the psychological consultations section
    And I click Next to go to psychological hospitalizations
    Then I should be in the psychological hospitalizations section
    Then I log out

  Scenario: Complete the Psychological hospitalizations subsection
    Given I am a registered user
    And I log in
    And I fill in the psychological hospitalizations section
    And I click Next to go to psychological diagnoses
    Then I should be in the psychological diagnoses section
    Then I log out

  Scenario: Complete the Psychological diagnoses subsection
    Given I am a registered user
    And I log in
    And I fill in the psychological diagnoses section
    And I click Next to go to psychological review
    Then I should be in the psychological review section
    Then I log out
