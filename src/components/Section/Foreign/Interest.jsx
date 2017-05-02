import React from 'react'
import { i18n } from '../../../config'
import { ValidationElement, Field, Text, DateControl, Textarea, NotApplicable, Checkbox, CheckboxGroup } from '../../Form'

export default class Interest extends ValidationElement {
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
        [field]: values
      })
    }
  }

  updateInterestTypes (values) {
    this.update('InterestTypes', values)
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

  render () {
    const prefix = this.props.prefix
    return (
      <div className="direct-interest">
        <Field title={i18n.t(`foreign.${prefix}.heading.interestTypes`)}
          help={`foreign.${prefix}.help.interestType`}
          adjustFor="big-buttons">

          <p>{i18n.t(`foreign.${prefix}.para.checkAll`)}</p>
          <CheckboxGroup className="interest-types option-list"
            selectedValues={this.state.InterestTypes}>
            <Checkbox name="interest-type"
              label={i18n.m(`foreign.${prefix}.label.interestTypes.yourself`)}
              value="Yourself"
              className="yourself"
              onChange={this.updateInterestTypes}
            />
            <Checkbox name="interest-type"
              label={i18n.m(`foreign.${prefix}.label.interestTypes.spouse`)}
              value="Spouse"
              className="spouse"
              onChange={this.updateInterestTypes}
            />
            <Checkbox name="interest-type"
              label={i18n.m(`foreign.${prefix}.label.interestTypes.cohabitant`)}
              value="Cohabitant"
              className="cohabitant"
              onChange={this.updateInterestTypes}
            />
            <Checkbox name="interest-type"
              label={i18n.m(`foreign.${prefix}.label.interestTypes.dependentChildren`)}
              value="DependentChildren"
              className="dependent-children"
              onChange={this.updateInterestTypes}
            />
          </CheckboxGroup>
        </Field>

        <Field title={i18n.t(`foreign.${prefix}.heading.interestType`)}
          help={`foreign.${prefix}.help.interestType`}
          adjustFor="labels"
          shrink={true}>
          <Text name="InterestType"
            className="interest-type"
            {...this.props.InterestType}
            onUpdate={this.updateInterestType}
            onValidate={this.props.onValidate}
          />
        </Field>

        <Field title={i18n.t(`foreign.${prefix}.heading.acquired`)}
          help={`foreign.${prefix}.help.acquired`}
          adjustFor="labels"
          shrink={true}>
          <DateControl name="Acquired"
            {...this.props.Acquired}
            label={i18n.t(`foreign.${prefix}.label.acquired`)}
            hideDay={true}
            maxDate={new Date()}
            prefix={this.props.prefix}
            onUpdate={this.updateAcquired}
            onValidate={this.props.onValidate}
          />
        </Field>

        <Field title={i18n.t(`foreign.${prefix}.heading.howAcquired`)}
          help={`foreign.${prefix}.help.howAcquired`}>
          <Textarea name="HowAcquired"
            className="how-acquired"
            {...this.props.HowAcquired}
            onUpdate={this.updateHowAcquired}
            onValidate={this.props.onValidate}
          />
        </Field>

        <Field title={i18n.t(`foreign.${prefix}.heading.cost`)}
          help={`foreign.${prefix}.help.cost`}>
          <Text name="Cost"
            className="cost"
            {...this.props.Cost}
            onUpdate={this.updateCost}
            onValidate={this.props.onValidate}
          />
        </Field>

        <Field title={i18n.t(`foreign.${prefix}.heading.value`)}
          help={`foreign.${prefix}.help.value`}>
          <Text name="Value"
            className="value"
            {...this.props.Value}
            onUpdate={this.updateValue}
            onValidate={this.props.onValidate}
          />
        </Field>


        <Field title={i18n.t(`foreign.${prefix}.heading.relinquished`)}
          help={`foreign.${prefix}.help.relinquished`}
          adjustFor="labels"
          shrink={true}>
          <NotApplicable name="RelinquishedNotApplicable"
            {...this.props.RelinquishedNotApplicable}
            label={`foreign.${prefix}.label.relinquishedNotApplicable`}
            or={`foreign.${prefix}.label.or`}
            onUpdate={this.updateRelinquishedNotApplicable}>
            <DateControl name="Relinquished"
              {...this.props.Relinquished}
              label={i18n.t(`foreign.${prefix}.label.relinquished`)}
              hideDay={true}
              maxDate={new Date()}
              prefix={this.props.prefix}
              onUpdate={this.updateRelinquished}
              onValidate={this.props.onValidate}
            />
          </NotApplicable>
        </Field>

        <Field title={i18n.t(`foreign.${prefix}.heading.explanation`)}
          help={`foreign.${prefix}.help.explanation`}>
          <Textarea name="Explanation"
            className="explanation"
            {...this.props.Explanation}
            onUpdate={this.updateExplanation}
            onValidate={this.props.onValidate}
          />
        </Field>
      </div>
    )
  }
}

Interest.defaultProps = {
  List: [],
  prefix: 'direct'
}
