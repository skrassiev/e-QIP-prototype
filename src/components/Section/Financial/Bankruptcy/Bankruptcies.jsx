import React from 'react'
import { i18n } from '../../../../config'
import schema from '../../../../schema'
import validate, { BankruptcyItemValidator } from '../../../../validators'
import SubsectionElement from '../../SubsectionElement'
import { Branch, Show, Accordion } from '../../../Form'
import Bankruptcy from './Bankruptcy'
import { Summary, AddressSummary, DateSummary } from '../../../Summary'

export default class Bankruptcies extends SubsectionElement {
  constructor (props) {
    super(props)

    this.updateList = this.updateList.bind(this)
    this.updateHasBankruptcy = this.updateHasBankruptcy.bind(this)
    this.summary = this.summary.bind(this)
  }

  update (queue) {
    this.props.onUpdate({
      List: this.props.List,
      HasBankruptcy: this.props.HasBankruptcy,
      ...queue
    })
  }

  updateList (values) {
    this.update({
      List: values
    })
  }

  updateHasBankruptcy (values) {
    this.update({
      HasBankruptcy: values,
      List: values === 'Yes' ? this.props.List : []
    })
  }

  /**
   * Assists in rendering the summary section.
   */
  summary (item, index) {
    const b = item.Item || {}
    const from = DateSummary(b.DateFiled)
    const address = AddressSummary(b.CourtAddress)

    return Summary({
      type: i18n.t('financial.bankruptcy.collection.summary.item'),
      index: index,
      left: address,
      right: from,
      placeholder: i18n.m('financial.bankruptcy.collection.summary.unknown')
    })
  }

  render () {
    return (
      <div className="bankruptcies">
        <Branch name="has_bankruptcydebt"
                label={i18n.t('financial.bankruptcy.title')}
                labelSize="h2"
                className="bankruptcy-branch"
                {...this.props.HasBankruptcy}
                help="financial.bankruptcy.help"
                warning={true}
                onUpdate={this.updateHasBankruptcy}
                required={this.props.required}
                scrollIntoView={this.props.scrollIntoView}
                onError={this.handleError}>
        </Branch>
        <Show when={(this.props.HasBankruptcy || {}).value === 'Yes'}>
          <Accordion {...this.props.List}
                     defaultState={this.props.defaultState}
                     scrollToBottom={this.props.scrollToBottom}
                     onUpdate={this.updateList}
                     onError={this.handleError}
                     required={this.props.required}
                     validator={BankruptcyItemValidator}
                     scrollIntoView={this.props.scrollIntoView}
                     summary={this.summary}
                     description={i18n.t('financial.bankruptcy.collection.summary.title')}
                     appendTitle={i18n.t('financial.bankruptcy.collection.summary.appendTitle')}
                     appendLabel={i18n.t('financial.bankruptcy.collection.append')}>
            <Bankruptcy name="Item"
                        dispatch={this.props.dispatch}
                        addressBooks={this.props.addressBooks}
                        required={this.props.required}
                        scrollIntoView={this.props.scrollIntoView}
                        bind={true} />
          </Accordion>
        </Show>
      </div>
    )
  }
}

Bankruptcies.defaultProps = {
  List: { items: [] },
  HasBankruptcy: {},
  addressBooks: {},
  onError: (value, arr) => { return arr },
  section: 'financial',
  subsection: 'bankruptcy',
  dispatch: () => {},
  validator: (state, props) => {
    return validate(schema('financial.bankruptcy', props))
  },
  defaultState: true
}
