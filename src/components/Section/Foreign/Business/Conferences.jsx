import React from 'react'
import { i18n } from '../../../../config'
import { DateSummary } from '../../../Summary'
import { ForeignBusinessConferencesValidator } from '../../../../validators'
import SubsectionElement from '../../SubsectionElement'
import { Branch, Show, Accordion, Field,
         Text, Textarea, Country, DateRange } from '../../../Form'
import ConferenceContacts from './ConferenceContacts'

export default class Conferences extends SubsectionElement {
  constructor (props) {
    super(props)

    this.state = {
      HasForeignConferences: props.HasForeignConferences,
      List: props.List,
      ListBranch: props.ListBranch
    }

    this.updateHasForeignConferences = this.updateHasForeignConferences.bind(this)
    this.updateList = this.updateList.bind(this)
  }

  onUpdate (name, value) {
    this.setState({ [name]: value }, () => {
      if (this.props.onUpdate) {
        this.props.onUpdate({
          HasForeignConferences: this.state.HasForeignConferences,
          List: this.state.List
        })
      }
    })
  }

  updateHasForeignConferences (value) {
    this.onUpdate('HasForeignConferences', value)
  }

  updateList (values) {
    this.onUpdate('List', values.items)
    this.onUpdate('ListBranch', values.branch)
  }

  summary (item, index) {
    const obj = item || {}
    const city = (obj.City || {}).value || i18n.t('foreign.business.conferences.collection.summary.unknown')
    const date = DateSummary(item.Dates)

    return (
      <span>
        <span className="index">{i18n.t('foreign.business.conferences.collection.summary.item')} {index + 1}:</span>
        <span><strong>{city}</strong></span>
        <span className="dates"><strong>{date}</strong></span>
      </span>
    )
  }

  render () {
    return (
      <div className="foreign-business-conferences">
        <Branch name="has_foreign_conferences"
                label={i18n.t('foreign.business.conferences.heading.title')}
                labelSize="h3"
                adjustFor="p"
                value={this.state.HasForeignConferences}
                onUpdate={this.updateHasForeignConferences}
                onError={this.handleError}>
          {i18n.m('foreign.business.conferences.para.branch')}
        </Branch>

        <Show when={this.state.HasForeignConferences === 'Yes'}>
          <Accordion minimum="1"
                     items={this.state.List}
                     defaultState={this.props.defaultState}
                     branch={this.state.ListBranch}
                     onUpdate={this.updateList}
                     onError={this.handleError}
                     summary={this.summary}
                     description={i18n.t('foreign.business.conferences.collection.summary.title')}
                     appendTitle={i18n.t('foreign.business.conferences.collection.appendTitle')}
                     appendMessage={i18n.m('foreign.business.conferences.collection.appendMessage')}
                     appendLabel={i18n.t('foreign.business.conferences.collection.append')}>
            <Field title={i18n.t('foreign.business.conferences.heading.description')}>
              <Textarea name="Description"
                        className="conferences-description"
                        bind={true}
                        />
            </Field>

            <Field title={i18n.t('foreign.business.conferences.heading.sponsor')}>
              <Text name="Sponsor"
                    className="conferences-sponsor"
                    bind={true}
                    />
            </Field>

            <Field title={i18n.t('foreign.business.conferences.heading.city')}>
              <Text name="City"
                    className="conferences-city"
                    bind={true}
                    />
            </Field>

            <Field title={i18n.t('foreign.business.conferences.heading.country')}>
              <Country name="Country"
                       className="conferences-country"
                       bind={true}
                       />
            </Field>

            <Field title={i18n.t('foreign.business.conferences.heading.dates')}
                   help="foreign.business.conferences.help.dates"
                   adjustFor="daterange">
              <DateRange name="Dates"
                         className="conferences-dates"
                         bind={true}
                         />
            </Field>

            <Field title={i18n.t('foreign.business.conferences.heading.purpose')}>
              <Textarea name="Purpose"
                        className="conferences-purpose"
                        bind={true}
                        />
            </Field>

            <ConferenceContacts name="Contacts"
                                bind={true}
                                />
          </Accordion>
        </Show>
      </div>
    )
  }
}

Conferences.defaultProps = {
  name: 'Conferences',
  HasForeignConferences: '',
  List: [],
  ListBranch: '',
  onError: (value, arr) => { return arr },
  section: 'foreign',
  subsection: 'business/conferences',
  dispatch: () => {},
  validator: (state, props) => {
    return new ForeignBusinessConferencesValidator(state, props).isValid()
  },
  defaultState: true
}
