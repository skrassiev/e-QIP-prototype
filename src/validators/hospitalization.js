import DateRangeValidator from './daterange'
import AddressValidator from './address'
import { validGenericTextfield } from './helpers'

export default class HospitalizationsValidator {
  constructor (state = {}, props) {
    this.list = state.List || []
    this.hospitalized = state.Hospitalized
  }

  validList () {
    if (this.hospitalized === 'Yes' && this.list.length === 0) {
      return false
    }

    for (let item of this.list) {
      if (!new HospitalizationValidator(item.Hospitalization).isValid()) {
        return false
      }
    }
    return true
  }

  validHospitalization () {
    return this.hospitalized === 'Yes' || this.hospitalized === 'No'
  }

  isValid () {
    return this.validHospitalization() &&
      this.validList()
  }
}

export class HospitalizationValidator {
  constructor (state = {}, props) {
    this.treatmentDate = state.TreatmentDate
    this.admission = state.Admission || { value: null }
    this.facility = state.Facility
    this.facilityAddress = state.FacilityAddress
    this.explanation = state.Explanation
  }

  validTreatmentDate () {
    return new DateRangeValidator(this.treatmentDate).isValid()
  }

  validAdmission () {
    if (this.admission !== 'Voluntary' && this.admission !== 'Involuntary') {
      return false
    }
    return validGenericTextfield(this.explanation)
  }

  validFacilityAddress () {
    return new AddressValidator(this.facilityAddress).isValid()
  }

  validFacility () {
    return validGenericTextfield(this.facility)
  }

  isValid () {
    return this.validTreatmentDate() &&
      this.validAdmission() &&
      this.validFacilityAddress() &&
      this.validFacility()
  }
}