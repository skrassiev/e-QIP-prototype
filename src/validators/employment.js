import DateRangeValidator from './daterange'
import LocationValidator from './location'
import ReferenceValidator from './reference'
import { validNotApplicable, validGenericTextfield, validPhoneNumber, validGenericMonthYear,
         validDateField, withinSevenYears, BranchCollection } from './helpers'

export default class HistoryEmploymentValidator {
  constructor (data = {}) {
    this.list = ((data.List || { items: [] }).items || [])
  }

  isValid () {
    if (this.list.length === 0) {
      return false
    }

    return this.list.every(x => {
      return new EmploymentValidator(x.Item).isValid()
    })
  }
}

export class EmploymentValidator {
  constructor (state = {}, props = {}) {
    this.employmentActivity = state.EmploymentActivity || { value: null }
    this.dates = state.Dates
    this.employment = state.Employment
    this.status = state.Status
    this.title = state.Title
    this.dutyStation = state.DutyStation
    this.address = state.Address
    this.additional = state.Additional
    this.telephone = state.Telephone
    this.physicalAddress = state.PhysicalAddress
    this.reasonLeft = state.ReasonLeft
    this.reprimand = state.Reprimand || {}
    this.supervisor = state.Supervisor
    this.reference = state.Reference
  }

  validDates () {
    return new DateRangeValidator(this.dates, null).isValid()
  }

  validEmployment () {
    return validGenericTextfield(this.employment)
  }

  validStatus () {
    return validGenericTextfield(this.status)
  }

  validTitle () {
    return validGenericTextfield(this.title)
  }

  validAddress () {
    return new LocationValidator(this.address).isValid()
  }

  validAdditionalActivity () {
    if (!this.additional) {
      return false
    }

    const branchValidator = new BranchCollection(this.additional.List)
    if (!branchValidator.validKeyValues()) {
      return false
    }

    if (branchValidator.hasNo()) {
      return true
    }

    return branchValidator.each(item => {
      return validGenericTextfield(item.Position) &&
        validGenericTextfield(item.Supervisor) &&
        new DateRangeValidator(item.DatesEmployed).isValid()
    })
  }

  validTelephone () {
    return validPhoneNumber(this.telephone)
  }

  validPhysicalAddress () {
    const differentAddress = (this.physicalAddress.HasDifferentAddress || {}).value
    if (!this.physicalAddress || !(differentAddress === 'No' || differentAddress === 'Yes')) {
      return false
    }

    if (differentAddress === 'Yes') {
      return this.physicalAddress.Address &&
        new LocationValidator(this.physicalAddress.Address).isValid()
    }

    return true
  }

  validReasonLeft () {
    if (this.withinSevenYears()) {
      if (!this.reasonLeft) {
        return false
      }

      if (!this.reasonLeft.Reasons) {
        return false
      }

      const branchValidator = new BranchCollection(this.reasonLeft.Reasons)
      if (!branchValidator.validKeyValues()) {
        return false
      }

      if (branchValidator.hasNo()) {
        return true
      }

      return branchValidator.each(item => {
        return !!item.Item &&
          item.Item.Reason &&
          validDateField(item.Item.Date) &&
          validGenericTextfield(item.Item.Text)
      })
    }

    return true
  }

  validSupervisor () {
    return this.supervisor &&
      validGenericTextfield(this.supervisor.SupervisorName) &&
      validGenericTextfield(this.supervisor.Title) &&
      validNotApplicable(this.supervisor.EmailNotApplicable, () => { return validGenericTextfield(this.supervisor.Email) }) &&
      new LocationValidator(this.supervisor.Address).isValid() &&
      validPhoneNumber(this.supervisor.Telephone)
  }

  validReference () {
    return this.reference && new ReferenceValidator(this.reference, null).isValid()
  }

  validReprimand () {
    if (this.withinSevenYears()) {
      if (!this.reprimand.Reasons) {
        return false
      }

      for (let r of (this.reprimand.Reasons.items || [])) {
        const item = r.Item || {}
        const has = item.Has || {}
        if (has.value === 'No') {
          continue
        }
        if (!item) {
          return false
        }
        if (!validGenericTextfield(item.Text)) {
          return false
        }

        if (!validGenericMonthYear(item.Date)) {
          return false
        }
      }
    }

    return true
  }

  withinSevenYears () {
    return withinSevenYears(this.dates.from, this.dates.to)
  }

  validAssignedDuty () {
    return validGenericTextfield(this.dutyStation)
  }

  isValid () {
    switch (this.employmentActivity.value) {
      // Active Duty, National Guard/Reserve, or USPHS Commissioned Corps
      case 'ActiveMilitary':
      case 'NationalGuard':
      case 'USPHS':
        return this.validDates() &&
        this.validTitle() &&
        this.validAssignedDuty() &&
        this.validStatus() &&
        this.validAddress() &&
        this.validTelephone() &&
        this.validSupervisor() &&
        this.validReasonLeft() &&
        this.validReprimand()

      // Other Federal employment, State Government, Federal Contractor, Non-government employment, or Other
      case 'OtherFederal':
      case 'StateGovernment':
      case 'FederalContractor':
      case 'NonGovernment':
      case 'Other':
        return this.validDates() &&
        this.validTitle() &&
        this.validEmployment() &&
        this.validStatus() &&
        this.validAddress() &&
        this.validPhysicalAddress() &&
        this.validTelephone() &&
        this.validSupervisor() &&
        this.validAdditionalActivity() &&
        this.validReasonLeft() &&
        this.validReprimand()

      // Self employment
      case 'SelfEmployment':
        return this.validDates() &&
        this.validTitle() &&
        this.validEmployment() &&
        this.validStatus() &&
        this.validAddress() &&
        this.validPhysicalAddress() &&
        this.validTelephone() &&
        this.validReference() &&
        this.validReasonLeft() &&
        this.validReprimand()

      // Unemployment
      case 'Unemployment':
        return this.validDates() &&
        this.validReference() &&
        this.validReasonLeft()
      default:
        return false
    }
  }
}
