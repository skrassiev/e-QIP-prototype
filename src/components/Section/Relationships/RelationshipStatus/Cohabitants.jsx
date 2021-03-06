import React from 'react'
import { i18n } from '../../../../config'
import schema from '../../../../schema'
import validate from '../../../../validators'
import { CohabitantsValidator } from '../../../../validators'
import { CohabitantValidator } from '../../../../validators/cohabitant'
import SubsectionElement from '../../SubsectionElement'
import { Accordion, Branch, Show } from '../../../Form'
import Cohabitant from './Cohabitant'

export default class Cohabitants extends SubsectionElement {
  constructor (props) {
    super(props)

    this.update = this.update.bind(this)
    this.updateHasCohabitant = this.updateHasCohabitant.bind(this)
    this.updateCohabitantList = this.updateCohabitantList.bind(this)
  }

  update (queue) {
    this.props.onUpdate({
      HasCohabitant: this.props.HasCohabitant,
      CohabitantList: this.props.CohabitantList,
      ...queue
    })
  }

  updateHasCohabitant (values) {
    this.update({
      HasCohabitant: values,
      CohabitantList: values.value === 'Yes' ? this.props.CohabitantsList : {}
    })
  }

  updateCohabitantList (values) {
    this.update({
      CohabitantList: values
    })
  }

  summary (item, index) {
    const itemType = i18n.t('relationships.cohabitant.collection.itemType')
    const o = (item || {}).Item || {}
    const date = (o.CohabitationBegan || {}).date ? `${o.CohabitationBegan.month}/${o.CohabitationBegan.year}` : ''
    const name = o.Name
          ? `${o.Name.first || ''} ${o.Name.middle || ''} ${o.Name.last || ''}`.trim()
          : date === '' ? i18n.m('relationships.relatives.collection.summary.unknown') : ''
    return (
      <span>
        <span className="index">{itemType}:</span>
        <span className="info"><strong>{name} {date}</strong></span>
      </span>
    )
  }

  render () {
    return (
      <div className="cohabitants">
        <Branch name="hasCohabitant"
                label={i18n.t('relationships.cohabitant.heading.hasCohabitant')}
                labelSize="h3"
                className="has-cohabitant"
                {...this.props.HasCohabitant}
                warning={true}
                help="relationships.cohabitant.help.hasCohabitant"
                onUpdate={this.updateHasCohabitant}
                required={this.props.required}
                scrollIntoView={this.props.scrollIntoView}
                onError={this.handleError}>
        </Branch>

        <Show when={this.props.HasCohabitant.value === 'Yes'}>
          <Accordion {...this.props.CohabitantList}
                     defaultState={this.props.defaultState}
                     scrollToBottom={this.props.scrollToBottom}
                     summary={this.summary}
                     onUpdate={this.updateCohabitantList}
                     onError={this.handleError}
                     validator={CohabitantValidator}
                     required={this.props.required}
                     description={i18n.t('relationships.cohabitant.collection.description')}
                     appendTitle={i18n.t('relationships.cohabitant.collection.appendTitle')}
                     appendLabel={i18n.t('relationships.cohabitant.collection.appendLabel')}
                     scrollIntoView={this.props.scrollIntoView}>
            <Cohabitant name="Item"
                        spouse={this.props.spouse}
                        required={this.props.required}
                        scrollIntoView={this.props.scrollIntoView}
                        bind={true} />
          </Accordion>
        </Show>
      </div>
    )
  }
}

Cohabitants.defaultProps = {
  HasCohabitant: {},
  CohabitantList: {},
  onUpdate: (queue) => {},
  onError: (value, arr) => { return arr },
  section: 'relationships',
  subsection: 'status/cohabitant',
  dispatch: () => {},
  validator: (state, props) => {
    return validate(schema('relationships.status.cohabitant', props))
  },
  defaultState: true,
  scrollToBottom: ''
}
