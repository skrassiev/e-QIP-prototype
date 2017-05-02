import React from 'react'
import { i18n } from '../../../../config'
import { Accordion, ValidationElement, Branch, Show } from '../../../Form'
//import { CompetenceValidator } from '../../../../validators'
import Interest from '../Interest'

export default class Direct extends ValidationElement {
  constructor (props) {
    super(props)

    this.state = {
      HasInterests: props.HasInterests,
      List: props.List,
      errorCodes: []
    }

    this.update = this.update.bind(this)
    this.updateHasInterests = this.updateHasInterests.bind(this)
    this.updateList = this.updateList.bind(this)
    this.handleValidation = this.handleValidation.bind(this)
  }

  update (field, values) {
    this.setState({[field]: values}, () => {
      if (this.props.onUpdate) {
        this.props.onUpdate({
          IsIncompetent: this.state.IsIncompetent,
          List: this.state.List
        })
      }
    })
  }

  updateList (values) {
    this.update('List', values)
  }

  updateHasInterests (values) {
    this.update('HasInterests', values)
  }

  isValid () {
    return true
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
    const o = (item || {}).Competence || {}
    const occurred = (o.Occurred || {}).date ? `${o.Occurred.month}/${o.Occurred.year}` : ''
    const courtName = (o.CourtName || {}).value ? o.CourtName.value : null
    const type = i18n.t('foreign.direct.collection.itemType')

    return (
      <span className="content">
        <span className="index">{type} {index + 1}:</span>
        <span className="courtname">
          <strong>{courtName || i18n.t('foreign.direct.collection.summaryCourtName')}</strong>
        </span>
        <span className="occurred"><strong>{courtName && occurred}</strong></span>
      </span>
    )
  }

  render () {
    return (
      <div className="direct">
        <h3>{i18n.t('foreign.direct.heading.title')}</h3>
        {i18n.m('foreign.direct.para.intro')}
        <Branch name="has_interests"
          value={this.state.HasInterests}
          onValidate={this.handleValidation}
          onUpdate={this.updateHasInterests}>
        </Branch>

        <Show when={this.state.HasInterests === 'Yes'}>
          <Accordion minimum="1"
            defaultState={this.props.defaultState}
            items={this.state.List}
            onUpdate={this.updateList}
            summary={this.summary}
            onValidate={this.handleValidation}
            description={i18n.t('foreign.direct.collection.description')}
            appendTitle={i18n.t('foreign.direct.collection.appendTitle')}
            appendMessage={i18n.m('foreign.direct.collection.appendMessage')}
            appendLabel={i18n.t('foreign.direct.collection.appendLabel')}>
            <Interest name="DirectInterest"
              bind={true}
              prefix="direct"
            />
          </Accordion>
        </Show>
      </div>
    )
  }
}

Direct.defaultProps = {
  List: [],
  defaultState: true
}
