Feature: Foreign

  Scenario: Complete the U.S. Passport subsection
    Given I am a registered user
    And I log in
    And I fill in the foreign passport section
    And I click Next to go to foreign contacts
    Then I should be in the foreign contacts section
    Then I log out

  Scenario: Complete the foreign business contact section
    Given I am a registered user
    And I log in
    And I fill in the foreign contacts section
    And I click Next to go to foreign activities
    Then I should be in the foreign activities section
    Then I log out

  Scenario: Complete the foreign activities direct control section
    Given I am a registered user
    And I log in
    And I fill in the foreign activities section direct subsection
    And I click Next to go to foreign activities/indirect
    Then I should be in the foreign activities/indirect section
    Then I log out

  Scenario: Complete the foreign activities indirect control section
    Given I am a registered user
    And I log in
    And I fill in the foreign activities section indirect subsection
    And I click Next to go to foreign activities/realestate
    Then I should be in the foreign activities/realestate section
    Then I log out

  Scenario: Complete the foreign activities real estate purchase section
    Given I am a registered user
    And I log in
    And I fill in the foreign activities section realestate subsection
    And I click Next to go to foreign activities/benefits
    Then I should be in the foreign activities/benefits section
    Then I log out

  Scenario: Complete the foreign activities benefits section
    Given I am a registered user
    And I log in
    And I fill in the foreign activities section benefits subsection
    And I click Next to go to foreign activities/support
    Then I should be in the foreign activities/support section
    Then I log out

  Scenario: Complete the foreign activities support section
    Given I am a registered user
    And I log in
    And I fill in the foreign activities section support subsection
    And I click Next to go to foreign business/advice
    Then I should be in the foreign business/advice section
    Then I log out

  Scenario: Complete the foreign business advice section
    Given I am a registered user
    And I log in
    And I fill in the foreign business section advice subsection
    And I click Next to go to foreign business/family
    Then I should be in the foreign business/family section
    Then I log out

  Scenario: Complete the foreign business family advice section
    Given I am a registered user
    And I log in
    And I fill in the foreign business section family subsection
    And I click Next to go to foreign business/employment
    Then I should be in the foreign business/employment section
    Then I log out

  Scenario: Complete the foreign business employment offers section
    Given I am a registered user
    And I log in
    And I fill in the foreign business section employment subsection
    And I click Next to go to foreign business/ventures
    Then I should be in the foreign business/ventures section
    Then I log out

  Scenario: Complete the foreign business other ventures section
    Given I am a registered user
    And I log in
    And I fill in the foreign business section ventures subsection
    And I click Next to go to foreign business/conferences
    Then I should be in the foreign business/conferences section
    Then I log out

  Scenario: Complete the foreign business conferences section
    Given I am a registered user
    And I log in
    And I fill in the foreign business section conferences subsection
    And I click Next to go to foreign business/contact
    Then I should be in the foreign business/contact section
    Then I log out

  Scenario: Complete the foreign business family contact section
    Given I am a registered user
    And I log in
    And I fill in the foreign business section contact subsection
    And I click Next to go to foreign business/sponsorship
    Then I should be in the foreign business/sponsorship section
    Then I log out

  Scenario: Complete the foreign business sponsorship section
    Given I am a registered user
    And I log in
    And I fill in the foreign business section sponsorship subsection
    And I click Next to go to foreign business/political
    Then I should be in the foreign business/political section
    Then I log out

  Scenario: Complete the foreign business political section
    Given I am a registered user
    And I log in
    And I fill in the foreign business section political subsection
    And I click Next to go to foreign business/voting
    Then I should be in the foreign business/voting section
    Then I log out

  Scenario: Complete the foreign business voting section
    Given I am a registered user
    And I log in
    And I fill in the foreign business section voting subsection
    And I click Next to go to foreign travel
    Then I should be in the foreign travel section
    Then I log out

  Scenario: Complete the foreign travel section
    Given I am a registered user
    And I log in
    And I fill in the foreign travel section
    And I click Next to go to foreign review
    Then I should be in the foreign review section
    Then I log out
