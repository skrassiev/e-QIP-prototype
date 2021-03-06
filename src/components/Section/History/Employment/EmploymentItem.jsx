import React from 'react'
import { i18n } from '../../../../config'
import { ValidationElement, DateRange, Location, Text, Field, Reference, Telephone, Show } from '../../../Form'
import EmploymentActivity from './EmploymentActivity'
import EmploymentStatus from './EmploymentStatus'
import PhysicalAddress from './PhysicalAddress'
import AdditionalActivity from './AdditionalActivity'
import Supervisor from './Supervisor'
import ReasonLeft from './ReasonLeft'
import Reprimand from './Reprimand'
import { today, daysAgo } from '../dateranges'

export default class EmploymentItem extends ValidationElement {
  constructor (props) {
    super(props)

    this.updateEmploymentActivity = this.updateEmploymentActivity.bind(this)
    this.updateEmployment = this.updateEmployment.bind(this)
    this.updateDates = this.updateDates.bind(this)
    this.updateTitle = this.updateTitle.bind(this)
    this.updateDutyStation = this.updateDutyStation.bind(this)
    this.updateStatus = this.updateStatus.bind(this)
    this.updateAddress = this.updateAddress.bind(this)
    this.updateTelephone = this.updateTelephone.bind(this)
    this.updateSupervisor = this.updateSupervisor.bind(this)
    this.updateReference = this.updateReference.bind(this)
    this.updatePhysicalAddress = this.updatePhysicalAddress.bind(this)
    this.updateAdditional = this.updateAdditional.bind(this)
    this.updateReasonLeft = this.updateReasonLeft.bind(this)
    this.updateReprimand = this.updateReprimand.bind(this)
  }

  update (queue) {
    this.props.onUpdate({
      EmploymentActivity: this.props.EmploymentActivity,
      Employment: this.props.Employment,
      Dates: this.props.Dates,
      Title: this.props.Title,
      DutyStation: this.props.DutyStation,
      Status: this.props.Status,
      Address: this.props.Address,
      Telephone: this.props.Telephone,
      Supervisor: this.props.Supervisor,
      Reference: this.props.Reference,
      PhysicalAddress: this.props.PhysicalAddress,
      Additional: this.props.Additional,
      ReasonLeft: this.props.ReasonLeft,
      Reprimand: this.props.Reprimand,
      ...queue
    })
  }

  updateEmploymentActivity (values) {
    this.update({
      EmploymentActivity: values
    })
  }

  updateEmployment (values) {
    this.update({
      Employment: values
    })
  }

  updateDates (values) {
    this.update({
      Dates: values
    })
  }

  updateTitle (values) {
    this.update({
      Title: values
    })
  }

  updateDutyStation (values) {
    this.update({
      DutyStation: values
    })
  }

  updateStatus (values) {
    this.update({
      Status: values
    })
  }

  updateAddress (values) {
    this.update({
      Address: values
    })
  }

  updateTelephone (values) {
    this.update({
      Telephone: values
    })
  }

  updateSupervisor (values) {
    this.update({
      Supervisor: values
    })
  }

  updateReference (values) {
    this.update({
      Reference: values
    })
  }

  updatePhysicalAddress (values) {
    this.update({
      PhysicalAddress: values
    })
  }

  updateAdditional (values) {
    this.update({
      Additional: values
    })
  }

  updateReasonLeft (values) {
    this.update({
      ReasonLeft: values
    })
  }

  updateReprimand (values) {
    this.update({
      Reprimand: values
    })
  }

  showStatus () {
    const activity = (this.props.EmploymentActivity || {}).value
    return activity && !['Unemployment'].includes(activity)
  }

  showAdditionalActivity () {
    const activity = (this.props.EmploymentActivity || {}).value
    return activity && ['OtherFederal', 'StateGovernment', 'FederalContractor', 'Other', 'NonGovernment'].includes(activity)
  }

  showReference () {
    const activity = (this.props.EmploymentActivity || {}).value
    return activity && ['SelfEmployment', 'Unemployment'].includes(activity)
  }

  showAssignedDuty () {
    const activity = (this.props.EmploymentActivity || {}).value
    return activity && ['ActiveMilitary', 'NationalGuard', 'USPHS'].includes(activity)
  }

  showEmployer () {
    const activity = (this.props.EmploymentActivity || {}).value
    return activity && !['Unemployment', 'ActiveMilitary', 'NationalGuard', 'USPHS'].includes(activity)
  }

  showPhysicalAddress () {
    const activity = (this.props.EmploymentActivity || {}).value
    return activity && ['SelfEmployment', 'OtherFederal', 'StateGovernment', 'FederalContractor', 'NonGovernment', 'Other'].includes(activity)
  }

  showSupervisor () {
    const activity = (this.props.EmploymentActivity || {}).value
    return activity && ['ActiveMilitary', 'NationalGuard', 'USPHS', 'OtherFederal', 'StateGovernment', 'FederalContractor', 'NonGovernment', 'Other'].includes(activity)
  }

  showEmployed () {
    const activity = (this.props.EmploymentActivity || {}).value
    return activity && !['Unemployment'].includes(activity)
  }

  showLeaving () {
    const activity = (this.props.EmploymentActivity || {}).value
    const sevenYearsAgo = daysAgo(today, 365 * 7)
    const from = (this.props.Dates || {}).from
    const to = (this.props.Dates || {}).to
    return (from && from.date >= sevenYearsAgo) || (to && to.date >= sevenYearsAgo) &&
      ['ActiveMilitary', 'NationalGuard', 'USPHS', 'OtherFederal', 'StateGovernment', 'FederalContractor', 'NonGovernment', 'SelfEmployment', 'Unemployment', 'Other'].includes(activity)
  }

  localizeByActivity () {
    const activity = (this.props.EmploymentActivity || {}).value || 'default'
    return activity.toLowerCase()
  }

  render () {
    const prefix = `history.employment.${this.localizeByActivity()}`.trim()
    return (
      <div>
        <EmploymentActivity name="EmploymentActivity"
                            {...this.props.EmploymentActivity}
                            onUpdate={this.updateEmploymentActivity}
                            onError={this.props.onError}
                            required={this.props.required}
                            scrollIntoView={this.props.scrollIntoView}
                            />

        <Show when={this.showEmployer()}>
          <Field title={i18n.t(`${prefix}.heading.employer`)}
                 help={`${prefix}.employer.help`}
                 adjustFor="labels"
                 scrollIntoView={this.props.scrollIntoView}>
            <Text name="Employment"
                  {...this.props.Employment}
                  onUpdate={this.updateEmployment}
                  onError={this.props.onError}
                  className="text full-width employment"
                  required={this.props.required}
                  />
          </Field>
        </Show>

        <Show when={this.showEmployed()}>
          <Field title={i18n.t(`${prefix}.heading.title`)}
                 adjustFor="labels"
                 scrollIntoView={this.props.scrollIntoView}>
            <Text name="Title"
                  {...this.props.Title}
                  onUpdate={this.updateTitle}
                  className="text employment-title"
                  onError={this.props.onError}
                  required={this.props.required}
                  />
          </Field>
        </Show>

        <Show when={this.showAssignedDuty()}>
          <Field title={i18n.t(`${prefix}.heading.dutyStation`)}
                 adjustFor="labels"
                 scrollIntoView={this.props.scrollIntoView}>
            <Text name="DutyStation"
                  {...this.props.DutyStation}
                  onUpdate={this.updateDutyStation}
                  className="text full-width employment-duty-station"
                  onError={this.props.onError}
                  required={this.props.required}
                  />
          </Field>
        </Show>

        <Show when={this.showStatus()}>
          <Field title={i18n.t(`${prefix}.heading.status`)}
                 shrink={true}
                 scrollIntoView={this.props.scrollIntoView}>
            <EmploymentStatus name="Status"
                              {...this.props.Status}
                              onUpdate={this.updateStatus}
                              onError={this.props.onError}
                              required={this.props.required}
                              scrollIntoView={this.props.scrollIntoView}
                              />
          </Field>
        </Show>

        <Field title={i18n.t(`history.employment.default.heading.datesEmployed`)}
               help={`history.employment.default.datesEmployed.help`}
               adjustFor="daterange"
               shrink={true}
               scrollIntoView={this.props.scrollIntoView}>
          <DateRange name="Dates"
                     {...this.props.Dates}
                     receiveProps={this.props.receiveProps}
                     onUpdate={this.updateDates}
                     onError={this.props.onError}
                     required={this.props.required}
                     />
        </Field>

        <Show when={this.showEmployed()}>
          <Field title={i18n.t(`${prefix}.heading.address`)}
                 optional={true}
                 help={`${prefix}.address.help`}
                 adjustFor="address"
                 shrink={true}
                 scrollIntoView={this.props.scrollIntoView}>
            <Location name="Address"
                      {...this.props.Address}
                      layout={Location.ADDRESS}
                      geocode={true}
                      addressBooks={this.props.addressBooks}
                      addressBook="Employment"
                      dispatch={this.props.dispatch}
                      onUpdate={this.updateAddress}
                      onError={this.props.onError}
                      label={i18n.t(`${prefix}.address.label`)}
                      required={this.props.required}
                      />
          </Field>
        </Show>

        <Show when={this.showEmployed()}>
          <Field title={i18n.t(`${prefix}.heading.telephone`)}
                 className="override-required"
                 adjustFor="telephone"
                 scrollIntoView={this.props.scrollIntoView}>
            <Telephone name="Telephone"
                       {...this.props.Telephone}
                       onUpdate={this.updateTelephone}
                       onError={this.props.onError}
                       required={this.props.required}
                       />
          </Field>
        </Show>

        <Show when={this.showPhysicalAddress()}>
          <PhysicalAddress name="PhysicalAddress"
                           {...this.props.PhysicalAddress}
                           title={i18n.t(`${prefix}.heading.physicalAddress`)}
                           addressBooks={this.props.addressBooks}
                           dispatch={this.props.dispatch}
                           onUpdate={this.updatePhysicalAddress}
                           onError={this.props.onError}
                           required={this.props.required}
                           scrollIntoView={this.props.scrollIntoView}
                           />
        </Show>

        <Show when={this.showSupervisor()}>
          <Supervisor name="Supervisor"
                      {...this.props.Supervisor}
                      addressBooks={this.props.addressBooks}
                      dispatch={this.props.dispatch}
                      onUpdate={this.updateSupervisor}
                      onError={this.props.onError}
                      required={this.props.required}
                      scrollIntoView={this.props.scrollIntoView}
                      />
        </Show>

        <Show when={this.showReference()}>
          <div>
            <Field title={i18n.t(`${prefix}.heading.reference`)}
                   titleSize="h2"
                   className="no-margin-bottom"
                   />

            <Reference name="Reference"
                       {...this.props.Reference}
                       addressBooks={this.props.addressBooks}
                       dispatch={this.props.dispatch}
                       onUpdate={this.updateReference}
                       onError={this.props.onError}
                       required={this.props.required}
                       scrollIntoView={this.props.scrollIntoView}
                       />
          </div>
        </Show>

        <Show when={this.showAdditionalActivity()}>
          <div>
            <Field title={i18n.t(`${prefix}.heading.additionalActivity`)}
                   titleSize="h2"
                   optional={true}
                   className="no-margin-bottom">
              {i18n.m(`${prefix}.para.additionalActivity`)}
            </Field>

            <AdditionalActivity name="Additional"
                                {...this.props.Additional}
                                onUpdate={this.updateAdditional}
                                onError={this.props.onError}
                                required={this.props.required}
                                scrollIntoView={this.props.scrollIntoView}
                                />
          </div>
        </Show>

        <Show when={this.showLeaving()}>
          <div>
            <ReasonLeft name="ReasonLeft"
                        {...this.props.ReasonLeft}
                        onUpdate={this.updateReasonLeft}
                        onError={this.props.onError}
                        required={this.props.required}
                        scrollIntoView={this.props.scrollIntoView}
                        />

            <Reprimand name="Reprimand"
                       {...this.props.Reprimand}
                       onUpdate={this.updateReprimand}
                       onError={this.props.onError}
                       required={this.props.required}
                       scrollIntoView={this.props.scrollIntoView}
                       />
          </div>
        </Show>
      </div>
    )
  }
}

EmploymentItem.defaultProps = {
  addressBooks: {},
  dispatch: (action) => {},
  onUpdate: (queue) => {},
  onError: (value, arr) => { return arr }
}
