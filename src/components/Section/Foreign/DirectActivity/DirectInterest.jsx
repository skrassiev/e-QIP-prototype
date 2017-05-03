import React from 'react'
import { i18n } from '../../../../config'
import { ValidationElement, Currency, Field, Text, DateControl, Textarea, NotApplicable, Checkbox, CheckboxGroup } from '../../../Form'
import CoOwners from '../CoOwners'

export default class DirectInterest extends ValidationElement {
  constructor (props) {
    super(props)

    this.update = this.update.bind(this)
    this.updateInterestTypes = this.updateInterestTypes.bind(this)
    this.updateInterestType = this.updateInterestType.bind(this)
    this.updateAcquired = this.updateAcquired.bind(this)
    this.updateHowAcquired = this.updateHowAcquired.bind(this)
    this.updateCost = this.updateCost.bind(this)
    this.updateValue = this.updateValue.bind(this)
    this.updateRelinquished = this.updateRelinquished.bind(this)
    this.updateRelinquishedNotApplicable = this.updateRelinquishedNotApplicable.bind(this)
    this.updateExplanation = this.updateExplanation.bind(this)
    this.updateCoOwners = this.updateCoOwners.bind(this)
  }

  update (field, values) {
    if (this.props.onUpdate) {
      this.props.onUpdate({
        InterestTypes: this.props.InterestTypes,
        InterestType: this.props.InterestType,
        Acquired: this.props.Acquired,
        HowAcquired: this.props.HowAcquired,
        Cost: this.props.Cost,
        Value: this.props.Value,
        Relinquished: this.props.Relinquished,
        RelinquishedNotApplicable: this.props.RelinquishedNotApplicable,
        Explanation: this.props.Explanation,
        CoOwners: this.props.CoOwners,
        [field]: values
      })
    }
  }

  updateInterestTypes (event) {
    let interestType = event.target.value
    let selected = [...(this.props.InterestTypes || [])]
    if (selected.includes(interestType)) {
      selected.splice(selected.indexOf(interestType), 1)
    } else {
      selected.push(interestType)
    }

    this.update('InterestTypes', selected)
  }

  updateInterestType (values) {
    this.update('InterestType', values)
  }

  updateAcquired (values) {
    this.update('Acquired', values)
  }

  updateHowAcquired (values) {
    this.update('HowAcquired', values)
  }

  updateCost (values) {
    this.update('Cost', values)
  }

  updateValue (values) {
    this.update('Value', values)
  }

  updateRelinquished (values) {
    this.update('Relinquished', values)
  }

  updateRelinquishedNotApplicable (values) {
    this.update('RelinquishedNotApplicable', values)
  }

  updateExplanation (values) {
    this.update('Explanation', values)
  }

  updateCoOwners (values) {
    this.update('CoOwners', values)
  }

  render () {
    const prefix = this.props.prefix
    return (
      <div className="interest">
        <Field title={i18n.t(`foreign.direct.interest.heading.interestTypes`)}
          help={`foreign.direct.interest.help.interestType`}
          adjustFor="big-buttons">

          <p>{i18n.t(`foreign.direct.interest.para.checkAll`)}</p>
          <CheckboxGroup className="interest-types option-list"
            selectedValues={this.props.InterestTypes}>
            <Checkbox name="interest-type"
              label={i18n.t(`foreign.direct.interest.label.interestTypes.yourself`)}
              value="Yourself"
              className="yourself"
              onChange={this.updateInterestTypes}
            />
            <Checkbox name="interest-type"
              label={i18n.t(`foreign.direct.interest.label.interestTypes.spouse`)}
              value="Spouse"
              className="spouse"
              onChange={this.updateInterestTypes}
            />
            <Checkbox name="interest-type"
              label={i18n.t(`foreign.direct.interest.label.interestTypes.cohabitant`)}
              value="Cohabitant"
              className="cohabitant"
              onChange={this.updateInterestTypes}
            />
            <Checkbox name="interest-type"
              label={i18n.t(`foreign.direct.interest.label.interestTypes.dependentChildren`)}
              value="DependentChildren"
              className="dependent-children"
              onChange={this.updateInterestTypes}
            />
          </CheckboxGroup>
        </Field>

        <Field title={i18n.t(`foreign.direct.interest.heading.interestType`)}
          help={`foreign.direct.interest.help.interestType`}
          adjustFor="labels"
          shrink={true}>
          <Text name="InterestType"
            className="interest-type"
            {...this.props.InterestType}
            onUpdate={this.updateInterestType}
            onValidate={this.props.onValidate}
          />
        </Field>

        <Field title={i18n.t(`foreign.direct.interest.heading.acquired`)}
          help={`foreign.direct.interest.help.acquired`}
          adjustFor="labels"
          shrink={true}>
          <DateControl name="Acquired"
            className="acquired"
            {...this.props.Acquired}
            label={i18n.t(`foreign.direct.interest.label.acquired`)}
            hideDay={true}
            maxDate={new Date()}
            prefix={this.props.prefix}
            onUpdate={this.updateAcquired}
            onValidate={this.props.onValidate}
          />
        </Field>

        <Field title={i18n.t(`foreign.direct.interest.heading.howAcquired`)}
          help={`foreign.direct.interest.help.howAcquired`}>
          <Textarea name="HowAcquired"
            className="how-acquired"
            {...this.props.HowAcquired}
            onUpdate={this.updateHowAcquired}
            onValidate={this.props.onValidate}
          />
        </Field>

        <Field title={i18n.t(`foreign.direct.interest.heading.cost`)}
          help={`foreign.direct.interest.help.cost`}>
          <Currency name="Cost"
            className="cost"
            {...this.props.Cost}
            onUpdate={this.updateCost}
            onValidate={this.props.onValidate}
          />
        </Field>

        <Field title={i18n.t(`foreign.direct.interest.heading.value`)}
          help={`foreign.direct.interest.help.value`}>
          <Currency name="Value"
            className="value"
            {...this.props.Value}
            onUpdate={this.updateValue}
            onValidate={this.props.onValidate}
          />
        </Field>

        <Field title={i18n.t(`foreign.direct.interest.heading.relinquished`)}
          help={`foreign.direct.interest.help.relinquished`}
          adjustFor="labels"
          shrink={true}>
          <NotApplicable name="RelinquishedNotApplicable"
            {...this.props.RelinquishedNotApplicable}
            label={i18n.t(`foreign.direct.interest.label.relinquishedNotApplicable`)}
            or={i18n.t(`foreign.direct.interest.label.or`)}
            onUpdate={this.updateRelinquishedNotApplicable}>
            <DateControl name="Relinquished"
              className="relinquished"
              {...this.props.Relinquished}
              label={i18n.t(`foreign.direct.interest.label.relinquished`)}
              hideDay={true}
              maxDate={new Date()}
              prefix={this.props.prefix}
              onUpdate={this.updateRelinquished}
              onValidate={this.props.onValidate}
            />
          </NotApplicable>
        </Field>

        <Field title={i18n.t(`foreign.direct.interest.heading.explanation`)}
          help={`foreign.direct.interest.help.explanation`}>
          <Textarea name="Explanation"
            className="explanation"
            {...this.props.Explanation}
            onUpdate={this.updateExplanation}
            onValidate={this.props.onValidate}
          />
        </Field>

        <CoOwners prefix={prefix}
          {...this.props.CoOwners}
          onUpdate={this.updateCoOwners}
          onValidate={this.props.onValidate}
        />

      </div>
    )
  }
}

DirectInterest.defaultProps = {
  List: [],
  prefix: 'direct.interest'
}
