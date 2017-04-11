import React from 'react'
import { i18n } from '../../../../config'
import { Accordion, ValidationElement, Branch, Show, RadioGroup, Radio, Help, HelpIcon, Textarea } from '../../../Form'
import Diagnosis from '../Diagnoses/Diagnosis'
import { ExistingConditionsValidator } from '../../../../validators'
import { dateRangeFormat } from '../summaryHelper'

export default class ExistingConditions extends ValidationElement {
  constructor (props) {
    super(props)

    this.state = {
      HasCondition: props.HasCondition,
      ReceivedTreatment: props.ReceivedTreatment,
      Explanation: props.Explanation,
      TreatmentList: props.TreatmentList,
      DidNotFollow: props.DidNotFollow,
      DidNotFollowExplanation: props.DidNotFollowExplanation,
      errorCodes: []
    }

    this.update = this.update.bind(this)
    this.updateHasCondition = this.updateHasCondition.bind(this)
    this.updateReceivedTreatment = this.updateReceivedTreatment.bind(this)
    this.updateTreatmentList = this.updateTreatmentList.bind(this)
    this.updateDidNotFollow = this.updateDidNotFollow.bind(this)
    this.updateExplanation = this.updateExplanation.bind(this)
    this.updateDidNotFollowExplanation = this.updateDidNotFollowExplanation.bind(this)
    this.handleValidation = this.handleValidation.bind(this)
  }

  update (field, values) {
    this.setState({[field]: values}, () => {
      if (this.props.onUpdate) {
        this.props.onUpdate({
          HasCondition: this.state.HasCondition,
          ReceivedTreatment: this.state.ReceivedTreatment,
          Explanation: this.state.Explanation,
          TreatmentList: this.state.TreatmentList,
          DidNotFollow: this.state.DidNotFollow,
          didNotFollowExplanation: this.state.DidNotFollowExplanation
        })
      }
    })
  }

  updateHasCondition (values) {
    this.update('HasCondition', values)
  }

  updateReceivedTreatment (checkbox) {
    this.update('ReceivedTreatment', checkbox.value)
  }

  updateTreatmentList (values) {
    this.update('TreatmentList', values)
  }

  updateDidNotFollow (values) {
    this.update('DidNotFollow', values)
  }

  updateExplanation (values) {
    this.update('Explanation', values)
  }

  updateDidNotFollowExplanation (values) {
    this.update('didNotFollowExplanation', values)
  }

  handleValidation (event, status, error) {
    let codes = super.mergeError(this.state.errorCodes, super.flattenObject(error))
    let complexStatus = null
    if (codes.length > 0) {
      complexStatus = false
    } else if (this.isValid()) {
      complexStatus = true
    }

    this.setState({error: complexStatus === false, valid: complexStatus === true, errorCodes: codes}, () => {
      const errorObject = { [this.props.name]: codes }
      const statusObject = { [this.props.name]: { status: complexStatus } }
      super.handleValidation(event, statusObject, errorObject)
    })
  }

  summary (item, index) {
    const o = (item || {}).Diagnosis || {}
    const treatmentDate = (o.Diagnosed || {})
    const formattedTreatmentDate = dateRangeFormat(treatmentDate)
    const condition = (o.Condition || {}).value ? `${o.Condition.value} ${formattedTreatmentDate}` : i18n.t('psychological.existingConditions.treatment.collection.summary')
    const type = i18n.t('psychological.existingConditions.treatment.collection.itemType')
    return (

      <span>
        <span className="index">{type}</span>
        <span className="info"><strong>{condition}</strong></span>
      </span>
    )
  }
  isValid () {
    return new ExistingConditionsValidator(this.state).isValid()
  }

  render () {
    return (
      <div className="existingconditions">
        <h3>{i18n.t('psychological.existingConditions.heading.hasCondition')}</h3>
        {i18n.m('psychological.existingConditions.para.hasCondition')}
        <Branch name="hascondition"
          className="eapp-field-wrap no-label hascondition"
          value={this.state.HasCondition}
          help="psychological.existingConditions.help.hasCondition"
          onValidate={this.handleValidation}
          onUpdate={this.updateHasCondition}>
        </Branch>

        <h3>{i18n.t('psychological.existingConditions.heading.receivedTreatment')}</h3>
        {i18n.m('psychological.existingConditions.para.receivedTreatment')}

        <div className="eapp-field-wrap">
          <Help id={`psychological.existingConditions.help.receivedTreatment`}>
            <RadioGroup className="treatment-list option-list" selectedValue={this.state.ReceivedTreatment}>
              <Radio name="treatment"
                className="treatment"
                label={i18n.t('psychological.existingConditions.receivedTreatment.label.yes')}
                value="Yes"
                onUpdate={this.updateReceivedTreatment}
                onValidate={this.handleValidation}
              />
              <Radio name="treatment"
                className="treatment"
                label={i18n.t('psychological.existingConditions.receivedTreatment.label.no')}
                value="No"
                onUpdate={this.updateReceivedTreatment}
                onValidate={this.handleValidation}
              />
              <Radio name="treatment"
                className="treatment"
                label={i18n.t('psychological.existingConditions.receivedTreatment.label.decline')}
                value="Decline"
                onUpdate={this.updateReceivedTreatment}
                onValidate={this.handleValidation}
              />
            </RadioGroup>
            <HelpIcon className="text-help-icon" />
          </Help>
        </div>

        <Show when={this.state.ReceivedTreatment === 'No'}>
          <div>
            <h3>{i18n.t(`psychological.existingConditions.heading.explanation`)}</h3>
            <div className="eapp-field-wrap no-label">
              <Help id={`psychological.existingConditions.help.explanation`}>
                <Textarea name="Explanation"
                  className="explanation"
                  {...this.props.Explanation}
                  onUpdate={this.updateExplanation}
                  onValidate={this.handleValidation}
                />
                <HelpIcon className="text-help-icon" />
              </Help>
            </div>
          </div>
        </Show>

        <Show when={this.state.ReceivedTreatment === 'Yes'}>
          <Accordion minimum="1"
            items={this.state.TreatmentList}
            onUpdate={this.updateTreatmentList}
            summary={this.summary}
            onValidate={this.handleValidation}
            appendTitle={i18n.t('psychological.existingConditions.treatment.collection.appendTitle')}
            appendMessage={i18n.m('psychological.existingConditions.treatment.collection.appendMessage')}
            appendLabel={i18n.t('psychological.existingConditions.treatment.collection.appendLabel')}>
            <Diagnosis name="Diagnosis"
              prefix="existingConditions.diagnosis"
              bind={true} />
          </Accordion>
        </Show>

        <h3>{i18n.t('psychological.existingConditions.heading.didNotFollow')}</h3>
        <Branch name="didNotFollow"
          className="eapp-field-wrap no-label didnotfollow"
          value={this.state.DidNotFollow}
          help="psychological.existingConditions.help.didNotFollow"
          onValidate={this.handleValidation}
          onUpdate={this.updateDidNotFollow}>
        </Branch>

        <Show when={this.state.DidNotFollow === 'Yes'}>
          <div>
            <h3>{i18n.t(`psychological.existingConditions.heading.didNotFollowExplanation`)}</h3>
            <div className="eapp-field-wrap no-label">
              <Help id={`psychological.existingConditions.help.didNotFollowExplanation`}>
                <Textarea name="DidNotFollowExplanation"
                  className="explanation"
                  {...this.props.DidNotFollowExplanation}
                  onUpdate={this.updateDidNotFollowExplanation}
                  onValidate={this.handleValidation}
                />
                <HelpIcon className="text-help-icon" />
              </Help>
            </div>
          </div>
        </Show>
      </div>
    )
  }
}

ExistingConditions.defaultProps = {
  TreatmentList: []
}