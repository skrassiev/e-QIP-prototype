import OrderValidator from './order'
import Location from '../components/Form/Location'

describe('Order validation', function () {
  it('validates court', () => {
    const tests = [
      {
        state: {
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
          }
        },
        expected: true
      },
      {
        state: {
          CourtName: null,
          CourtAddress: null
        },
        expected: false
      }
    ]
    tests.forEach(test => {
      expect(new OrderValidator(test.state, null).validCourt()).toBe(test.expected)
    })
  })

  it('validates disposition (conditional)', () => {
    const tests = [
      {
        state: {
          Disposition: {
            value: 'Stuff'
          }
        },
        props: null,
        expected: true
      },
      {
        state: {
          Disposition: {}
        },
        props: null,
        expected: false
      },
      {
        state: {
          Disposition: {}
        },
        props: {
          prefix: 'competence'
        },
        expected: true
      }
    ]
    tests.forEach(test => {
      expect(new OrderValidator(test.state, test.props).validDisposition()).toBe(test.expected)
    })
  })

  it('validates appeals', () => {
    const tests = [
      {
        state: {
          Appeals: {
            items: [
              {
                Item: {
                  Has: { value: 'Yes' },
                  CourtName: {
                    value: 'Appeals Court'
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
          Appeals: {
            items: []
          }
        },
        expected: false
      },
      {
        state: {
          Appeals: {
            items: [{ Item: { Has: { value: 'No' } } }]
          }
        },
        expected: true
      }
    ]
    tests.forEach(test => {
      expect(new OrderValidator(test.state, null).validAppeals()).toBe(test.expected)
    })
  })

  it('validates competence item', () => {
    const tests = [
      {
        state: {
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
        },
        expected: true
      },
      {
        state: {
          CourtName: null,
          CourtAddress: null
        },
        expected: false
      }
    ]
    tests.forEach(test => {
      expect(new OrderValidator(test.state, null).isValid()).toBe(test.expected)
    })
  })
})
