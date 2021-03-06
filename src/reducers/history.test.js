import historyReducer from './history'

describe('History Reducer', function () {
  it('should handle default history update', function () {
    const tests = [
      {
        state: {},
        action: {
          section: 'Foo',
          property: 'Bar',
          values: 'Test'
        },
        expected: {}
      },
      {
        state: {},
        action: {
          section: 'History',
          property: 'Diploma',
          values: 'Test'
        },
        expected: {
          Diploma: 'Test'
        }
      }
    ]
    tests.forEach(test => {
      expect(historyReducer(test.state, test.action)).toEqual(test.expected)
    })
  })

  it('should handle HistoryResidence updates', function () {
    const tests = [
      {
        state: {
          Residence: null
        },
        action: {
          section: 'History',
          property: 'Residence',
          type: 'History.Residence',
          values: null
        },
        expected: {
          Residence: null
        }
      },
      {
        state: {
          Residence: null
        },
        action: {
          section: 'History',
          property: 'Residence',
          type: 'History.Residence',
          values: []
        },
        expected: {
          Residence: []
        }
      },
      {
        state: {
          Residence: null
        },
        action: {
          section: 'History',
          property: 'Residence',
          type: 'History.Residence',
          values: [
            {
              Item: null
            }
          ]
        },
        expected: {
          CurrentAddress: null,
          Residence: [
            {
              Item: null
            }
          ]
        }
      },
      {
        state: {
          Residence: null
        },
        action: {
          section: 'History',
          property: 'Residence',
          type: 'History.Residence',
          values: [
            {
              Item: {
                Address: null
              }
            }
          ]
        },
        expected: {
          CurrentAddress: null,
          Residence: [
            {
              Item: {
                Address: null
              }
            }
          ]
        }
      },
      {
        state: {
          Residence: null
        },
        action: {
          section: 'History',
          property: 'Residence',
          type: 'History.Residence',
          values: [
            {
              Item: {
                Dates: null
              }
            }
          ]
        },
        expected: {
          CurrentAddress: null,
          Residence: [
            {
              Item: {
                Dates: null
              }
            }
          ]
        }
      },
      {
        state: {
          Residence: null
        },
        action: {
          section: 'History',
          property: 'Residence',
          type: 'History.Residence',
          values: [
            {
              Item: {
                Address: {},
                Dates: {
                  present: true
                }
              }
            }
          ]
        },
        expected: {
          CurrentAddress: {},
          Residence: [
            {
              Item: {
                Address: {},
                Dates: {
                  present: true
                }
              }
            }
          ]
        }
      }
    ]
    tests.forEach(test => {
      expect(historyReducer(test.state, test.action)).toEqual(test.expected)
    })
  })
})
