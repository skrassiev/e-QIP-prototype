import { validGenericTextfield, validGenericMonthYear, validNotApplicable, validBranch } from './helpers'
import CoOwnersValidator from './coowner'

export default class DirectInterestsValidator {
  constructor (state, props) {
    this.hasInterests = props.HasInterests || ''
    this.list = props.List || []
  }

  isValid () {
    if (!validBranch(this.hasInterests)) {
      return false
    }
    if (this.hasInterests === 'No') {
      return true
    }

    if (this.hasInterests === 'Yes' && !this.list.length) {
      return false
    }

    return this.list.every((item) => {
      return new DirectInterestValidator(null, item.DirectInterest).isValid()
    })
  }
}

export class DirectInterestValidator {
  constructor (state, props) {
    this.interestTypes = props.InterestTypes
    this.interestType = props.InterestType
    this.acquired = props.Acquired
    this.howAcquired = props.HowAcquired
    this.cost = props.Cost
    this.value = props.Value
    this.relinquished = props.Relinquished
    this.relinquishedNotApplicable = props.RelinquishedNotApplicable
    this.explanation = props.Explanation
    this.coOwners = props.CoOwners
  }

  validInterestTypes () {
    return !!(this.interestTypes && this.interestTypes.length)
  }

  isValid () {
    return this.validInterestTypes() &&
      validGenericTextfield(this.interestType) &&
      validGenericMonthYear(this.acquired) &&
      validGenericTextfield(this.howAcquired) &&
      validGenericTextfield(this.cost) &&
      validGenericTextfield(this.value) &&
      validNotApplicable(this.relinquishedNotApplicable, () => {
        return validGenericMonthYear(this.relinquished)
      }) &&
      validGenericTextfield(this.explanation) &&
      new CoOwnersValidator(null, this.coOwners).isValid()
  }
}
