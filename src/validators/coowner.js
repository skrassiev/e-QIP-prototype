import AddressValidator from './address'
import NameValidator from './name'
import { validGenericTextfield, BranchCollection } from './helpers'

export default class CoOwnersValidator {
  constructor (state, props = {}) {
    this.list = props.List || []
  }

  isValid () {
    const validator = new BranchCollection(this.list)
    if (!validator.validKeyValues()) {
      return false
    }

    if (this.list.length === 1 && validator.hasNo()) {
      return true
    }
    return validator.each((item) => {
      return new CoOwnerValidator(null, item.CoOwner).isValid()
    })
  }
}

export class CoOwnerValidator {
  constructor (state, props = {}) {
    this.name = props.Name || {}
    this.address = props.Address || {}
    this.countries = props.Countries || {}
    this.relationshipNature = props.RelationshipNature || {}
  }

  validCountries () {
    return !!(this.countries && this.countries.value && this.countries.value.length)
  }

  isValid () {
    return new NameValidator(this.name).isValid() &&
      new AddressValidator(this.address).isValid() &&
      this.validCountries() &&
      validGenericTextfield(this.relationshipNature)
  }
}
