import React from 'react'
import { connect } from 'react-redux'
import { push } from '../../../middleware/history'
import { i18n } from '../../../config'
import { SectionViews, SectionView } from '../SectionView'
import { updateApplication, reportErrors, reportCompletion } from '../../../actions/ApplicationActions'
import AuthenticatedView from '../../../views/AuthenticatedView'
import { ValidationElement, IntroHeader } from '../../Form'
import Passport from './Passport'
import Contacts from './Contacts'
import { Advice } from './Business'
import DirectActivity from './DirectActivity'

class Foreign extends ValidationElement {
  constructor (props) {
    super(props)

    this.state = {
      subsection: props.subsection
    }

    this.handleTour = this.handleTour.bind(this)
    this.handleReview = this.handleReview.bind(this)
  }

  componentDidMount () {
    let current = this.launch(this.props.Foreign, this.props.subsection, 'passport')
    if (current !== '') {
      this.props.dispatch(push(`/form/foreign/${current}`))
    }
  }

  handleTour (event) {
    this.props.dispatch(push('/form/foreign/passport'))
  }

  handleReview (event) {
    this.props.dispatch(push('/form/foreign/review'))
  }

  /**
   * Report errors and completion status
   */
  onValidate (event, status, errorCodes) {
    if (!event) {
      return
    }

    if (!event.fake) {
      let errors = super.triageErrors(this.props.Section.section, [...this.props.Errors], errorCodes)
      this.props.dispatch(reportErrors(this.props.Section.section, '', errors))
    }

    let cstatus = 'neutral'
    if (this.hasStatus('passport', status, true) &&
        this.hasStatus('contacts', status, true) &&
        this.hasStatus('direct', status, true)) {
      cstatus = 'complete'
    } else if (this.hasStatus('passport', status, false) ||
               this.hasStatus('contacts', status, false) ||
               this.hasStatus('direct', status, false)) {
      cstatus = 'incomplete'
    }
    let completed = {
      ...this.props.Completed,
      ...status,
      status: cstatus
    }
    this.props.dispatch(reportCompletion(this.props.Section.section, this.props.Section.subsection, completed))
  }

  /**
   * Update storage values for a subsection
   */
  onUpdate (field, values) {
    this.props.dispatch(updateApplication('Foreign', field, values))
  }

  /**
   * Helper to test whether a subsection is complete
   */
  hasStatus (property, status, val) {
    return (this.props.Completed[property] && this.props.Completed[property].status === val)
      || (status && status[property] && status[property].status === val)
  }

  /**
   * Determine the desired behaviour when visiting the
   * root of a route
   */
  launch (storage, subsection, defaultView) {
    subsection = subsection || ''
    if (subsection === '') {
      let keys = Object.keys(storage)
      if (keys.length === 0 && storage.constructor === Object) {
        return defaultView
      }
    }

    return subsection
  }

  render () {
    return (
      <div>
        <SectionViews current={this.props.subsection} dispatch={this.props.dispatch}>
          <SectionView name="">
            <div className="foreign intro review-screen">
              <div className="usa-grid-full">
                <IntroHeader Errors={this.props.Errors}
                            Completed={this.props.Completed}
                            tour={i18n.t('foreign.tour.para')}
                            review={i18n.t('foreign.review.para')}
                            onTour={this.handleTour}
                            onReview={this.handleReview}
                            />
              </div>
            </div>
          </SectionView>

          <SectionView name="review"
                       title="Let&rsquo;s make sure everything looks right"
                       showTop="true"
                       back="history/federal"
                       backLabel={i18n.t('history.destination.federal')}
                       >
            <h2>{i18n.t('foreign.passport.title')}</h2>
            <Passport name="passport"
                      {...this.props.Passport}
                      onUpdate={this.onUpdate.bind(this, 'Passport')}
                      onValidate={this.onValidate.bind(this)}
                      />
          </SectionView>

          <SectionView name="passport"
                       back="history/federal"
                       backLabel={i18n.t('history.destination.federal')}
                       next="foreign/review"
                       nextLabel={i18n.t('foreign.destination.review')}>
            <h2>{i18n.t('foreign.passport.title')}</h2>
            <Passport name="passport"
                      {...this.props.Passport}
                      suggestedNames={this.props.suggestedNames}
                      onUpdate={this.onUpdate.bind(this, 'Passport')}
                      onValidate={this.onValidate.bind(this)}
                      />
          </SectionView>

          <SectionView name="contacts"
                       back="foreign/passport"
                       backLabel={i18n.t('foreign.destination.passport')}
                       next="foreign/activities"
                       nextLabel={i18n.t('foreign.destination.activities')}>
            <Contacts name="contacts"
                      {...this.props.Contacts}
                      onUpdate={this.onUpdate.bind(this, 'Contacts')}
                      onValidate={this.onValidate.bind(this)}
                      />
          </SectionView>

          <SectionView name="activities"
                       back="foreign/contacts"
                       backLabel={i18n.t('foreign.destination.contacts')}
                       next="foreign/business"
                       nextLabel={i18n.t('foreign.destination.business')}>
            <DirectActivity name="direct"
                    {...this.props.DirectActivity}
                    onUpdate={this.onUpdate.bind(this, 'DirectActivity')}
                    onValidate={this.handleValidation}
                    />
          </SectionView>
          <SectionView name="activities/direct"
                       back="foreign/contacts"
                       backLabel={i18n.t('foreign.destination.contacts')}
                       next="foreign/business"
                       nextLabel={i18n.t('foreign.destination.business')}>
            <DirectActivity name="direct"
                    {...this.props.DirectActivity}
                    onUpdate={this.onUpdate.bind(this, 'DirectActivity')}
                    onValidate={this.handleValidation}
                    />
          </SectionView>

          <SectionView name="business"
                       back="foreign/activities/support"
                       backLabel={i18n.t('foreign.destination.activities.support')}
                       next="foreign/business/family"
                       nextLabel={i18n.t('foreign.destination.business.family')}>
            <Advice name="advice"
                    {...this.props.Advice}
                    onUpdate={this.updateAdvice}
                    onValidate={this.handleValidation}
                    />
          </SectionView>

          <SectionView name="business/advice"
                       back="foreign/activities/support"
                       backLabel={i18n.t('foreign.destination.activities.support')}
                       next="foreign/business/family"
                       nextLabel={i18n.t('foreign.destination.business.family')}>
            <Advice name="advice"
                    {...this.props.Advice}
                    onUpdate={this.updateAdvice}
                    onValidate={this.handleValidation}
                    />
          </SectionView>

          <SectionView name="travel"
                       back="foreign/business/voting"
                       backLabel={i18n.t('foreign.destination.business.voting')}
                       next="foreign/review"
                       nextLabel={i18n.t('foreign.destination.review')}>
          </SectionView>
        </SectionViews>
      </div>
    )
  }
}

function mapStateToProps (state) {
  let section = state.section || {}
  let app = state.application || {}
  let foreign = app.Foreign || {}
  let errors = app.Errors || {}
  let completed = app.Completed || {}

  let identification = app.Identification || {}
  let names = []
  if (identification.ApplicantName) {
    names.push(identification.ApplicantName)
  }

  if (identification.OtherNames && identification.OtherNames.List) {
    for (let item of identification.OtherNames.List) {
      names.push(item.Name)
    }
  }

  return {
    Section: section,
    Foreign: foreign,
    Passport: foreign.Passport || {},
    DirectActivity: foreign.DirectActivity || {},
    Contacts: foreign.Contacts || {},
    Errors: errors.foreign || [],
    Completed: completed.foreign || [],
    suggestedNames: names
  }
}

Foreign.defaultProps = {
  subsection: ''
}

export default connect(mapStateToProps)(AuthenticatedView(Foreign))
