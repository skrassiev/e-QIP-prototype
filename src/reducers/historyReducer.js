// Default state for history state
const defaultHistoryState = {
  Employment: {},
  Residence: {}
}

/**
 * History reducer that has some additional actions specific to this section only. It extracts all
 * dates for both Employment and Residence and adds them to a `Dates` key so that the
 * application can easily use them without having to extract again
 */
const historyReducer = function (state = defaultHistoryState, action) {
  if (action.section !== 'History') {
    return state
  }

  switch (action.property) {
    case 'Residence':
    case 'Employment': {
      let values = {...action.values}
      let dates = extractDates(values.List)
      values['Dates'] = dates
      return {
        ...state,
        [action.property]: values
      }
    }
    default:
      return state
  }
}

/**
 * Helper function to pull Dates information from Residence and Employment entries
 */
function extractDates (list) {
  let dates = []
  for (let row of list) {
    if (!row.Item) {
      continue
    }
    if (row.Item.Dates) {
      dates.push(row.Item.Dates)
    }
  }
  return dates
}

export default historyReducer
