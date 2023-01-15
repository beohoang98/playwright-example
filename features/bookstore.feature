Feature: Bookstore

  Scenario Template: Bookstore <Device> - Verify Bookstore
    Given Go to homepage on <Device> screen
    Then Verify Required Elements on Bookstore
      | Title                     | Search Input                                  |
      | #page-title[role=heading] | input#searchBar[placeholder="Filter books.."] |

    Then Verify book list:
      | title                             | author                                        | price  |
      | Test Automation in the Real World | Greg Paskal                                   | $9.99  |
      | Experiences of Test Automation    | Dorothy Graham and Mark Fewster               | $44.09 |
      | Agile Testing                     | Lisa Crispin and Janet Gregory                | $49.07 |
      | How Google Tests Software         | James A. Whittaker, Jason Arbon, Jeff Carollo | $31.67 |
      | Java For Testers                  | Alan Richardson                               | $29.99 |
      | Advanced Selenium in Java         | Paul Watson                                   | $29.99 |
      | The Cucumber for Java Book        | Seb Rose                                      | $34.99 |
      | BDD in Action                     | John Ferguson Smart                           | $40.31 |

    When User search for "Java"
    Then Verify book list:
      | title                      | author          | price  |
      | Java For Testers           | Alan Richardson | $29.99 |
      | Advanced Selenium in Java  | Paul Watson     | $29.99 |
      | The Cucumber for Java Book | Seb Rose        | $34.99 |

    When User search for "Selenium"
    Then Verify book list:
      | title                     | author      | price  |
      | Advanced Selenium in Java | Paul Watson | $29.99 |

    Examples:
      | Device  |
      | desktop |
      | mobile  |

