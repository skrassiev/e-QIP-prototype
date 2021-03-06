import CompetenceValidator from './competence'
import Location from '../components/Form/Location'

describe('Competence validation', function () {
  it('validates competence', () => {
    const tests = [
      {
        state: {
          IsIncompetent: { value: 'Yes' },
          List: {
            branch: { value: 'No' },
            items: [
              {
                Item: {
                  CourtName: {
                    value: 'Circuit Court'
                  },
                  CourtAddress: {
                    country: { value: 'United States' },
                    street: '1234 Some Rd',
                    city: 'Arlington',
                    state: 'Virginia',
                    zipcode: '22202',
                    layout: Location.ADDRESS
                  },
                  Disposition: {
                    value: 'Stuff'
                  },
                  Occurred: {
                    day: '1',
                    month: '1',
                    year: '2016',
                    date: new Date('1/1/2016')
                  },
                  Appeals: {
                    items: [{ Item: { Has: { value: 'No' } } }]
                  }
                }
              }
            ]
          }
        },
        expected: true
      },
      {
        state: {
          List: {
            branch: { value: 'No' },
            items: []
          },
          IsIncompetent: { value: 'Yes' }
        },
        expected: false
      },
      {
        state: {
          List: {
            branch: { value: 'No' },
            items: []
          },
          IsIncompetent: { value: 'No' }
        },
        expected: true
      },
      {
        state: {
          List: {
            branch: { value: 'No' },
            items: []
          },
          IsIncompetent: { value: 'Nope' }
        },
        expected: false
      },
      {
        state: {
          IsIncompetent: { value: 'Yes' },
          List: {
            branch: { value: 'No' },
            items: [
              {
                Item: {
                  CourtName: null,
                  CourtAddress: {
                    country: { value: 'United States' },
                    street: '1234 Some Rd',
                    city: 'Arlington',
                    state: 'Virginia',
                    zipcode: '22202',
                    layout: Location.ADDRESS
                  },
                  Disposition: {
                    value: 'Stuff'
                  },
                  Occurred: {
                    day: '1',
                    month: '1',
                    year: '2016',
                    date: new Date('1/1/2016')
                  },
                  Appeals: {
                    items: [{ Item: { Has: { value: 'No' } } }]
                  }
                }
              }
            ]
          }
        },
        expected: false
      }
    ]
    tests.forEach(test => {
      expect(new CompetenceValidator(test.state, null).isValid()).toBe(test.expected)
    })
  })
})
