import React from 'react'
import { connect } from 'react-redux'
import { i18n } from '../../../config'
import { SectionViews, SectionView } from '../SectionView'
import SectionElement from '../SectionElement'
import AuthenticatedView from '../../../views/AuthenticatedView'
import { IntroHeader } from '../../Form'
import ApplicantName from './ApplicantName'
import ApplicantSSN from './ApplicantSSN'
import ApplicantBirthPlace from './ApplicantBirthPlace'
import ApplicantBirthDate from './ApplicantBirthDate'
import OtherNames from './OtherNames'
import Physical from './Physical'
import ContactInformation from './ContactInformation'

class Identification extends SectionElement {
  render () {
    return (
      <div>
        <SectionViews current={this.props.subsection} dispatch={this.props.dispatch}>
          <SectionView name="">
            <div className="identification intro review-screen">
              <div className="usa-grid-full">
                <IntroHeader errors={() => { return this.props.Errors.some(x => x.valid === false) }}
                             completed={() => { return this.props.Completed.length === 7 && this.props.Completed.every(x => x.valid === true) }}
                             tour={i18n.t('identification.tour.para')}
                             review={i18n.t('identification.review.para')}
                             onTour={this.handleTour}
                             onReview={this.handleReview}
                             />
              </div>
            </div>
          </SectionView>

          <SectionView name="review"
                       title="Let&rsquo;s make sure everything looks right"
                       showTop="true"
                       next="financial"
                       nextLabel={i18n.t('financial.destination.gambling')}
                       back="identification/physical"
                       backLabel={i18n.t('identification.destination.physical')}>

            <h2>{i18n.t('identification.name.title')}</h2>
            <ApplicantName name="name"
                           value={this.props.ApplicantName}
                           dispatch={this.props.dispatch}
                           onUpdate={this.handleUpdate.bind(this, 'ApplicantName')}
                           onError={this.handleError}
                           />

            <h2>{i18n.t('identification.othernames.title')}</h2>
            <OtherNames name="othernames"
                        {...this.props.OtherNames}
                        dispatch={this.props.dispatch}
                        onUpdate={this.handleUpdate.bind(this, 'OtherNames')}
                        onError={this.handleError}
                        />

            <h2>{i18n.t('identification.birthdate.title')}</h2>
            <ApplicantBirthDate name="birthdate"
                                dispatch={this.props.dispatch}
                                onUpdate={this.handleUpdate.bind(this, 'ApplicantBirthDate')}
                                onError={this.handleError}
                                value={this.props.ApplicantBirthDate}
                                />

            <h2>{i18n.t('identification.birthplace.title')}</h2>
            <ApplicantBirthPlace name="birthplace"
                                 value={this.props.ApplicantBirthPlace}
                                 dispatch={this.props.dispatch}
                                 onUpdate={this.handleUpdate.bind(this, 'ApplicantBirthPlace')}
                                 onError={this.handleError}
                                 />

            <h2>{i18n.t('identification.contacts.title')}</h2>
            <ContactInformation name="contacts"
                                {...this.props.Contacts}
                                dispatch={this.props.dispatch}
                                onUpdate={this.handleUpdate.bind(this, 'Contacts')}
                                onError={this.handleError}
                                />

            <h2>{i18n.t('identification.ssn.title')}</h2>
            <ApplicantSSN name="ssn"
                          value={this.props.ApplicantSSN}
                          dispatch={this.props.dispatch}
                          onUpdate={this.handleUpdate.bind(this, 'ApplicantSSN')}
                          onError={this.handleError}
                          />

            <h2>{i18n.t('identification.traits.title')}</h2>
            <Physical name="physical"
                      {...this.props.Physical}
                      dispatch={this.props.dispatch}
                      onUpdate={this.handleUpdate.bind(this, 'Physical')}
                      onError={this.handleError}
                      />
          </SectionView>

          <SectionView name="name"
                       next="identification/contacts"
                       nextLabel={i18n.t('identification.destination.contacts')}>
            <h2>{i18n.t('identification.name.title')}</h2>
            <ApplicantName name="name"
                           value={this.props.ApplicantName}
                           dispatch={this.props.dispatch}
                           onUpdate={this.handleUpdate.bind(this, 'ApplicantName')}
                           onError={this.handleError}
                           />
          </SectionView>

          <SectionView name="othernames"
                       back="identification/contacts"
                       backLabel={i18n.t('identification.destination.contacts')}
                       next="identification/birthdate"
                       nextLabel={i18n.t('identification.destination.birthdate')}>
            <h2>{i18n.t('identification.othernames.title')}</h2>
            <OtherNames name="othernames"
                        {...this.props.OtherNames}
                        dispatch={this.props.dispatch}
                        onUpdate={this.handleUpdate.bind(this, 'OtherNames')}
                        onError={this.handleError}
                        />
          </SectionView>

          <SectionView name="birthdate"
                       next="identification/birthplace"
                       nextLabel={i18n.t('identification.destination.birthplace')}
                       back="identification/othernames"
                       backLabel={i18n.t('identification.destination.othernames')}>
            <h2>{i18n.t('identification.birthdate.title')}</h2>
            <ApplicantBirthDate name="birthdate"
                                dispatch={this.props.dispatch}
                                onUpdate={this.handleUpdate.bind(this, 'ApplicantBirthDate')}
                                onError={this.handleError}
                                value={this.props.ApplicantBirthDate}
                                />
          </SectionView>

          <SectionView name="birthplace"
                       next="identification/ssn"
                       nextLabel={i18n.t('identification.destination.ssn')}
                       back="identification/birthdate"
                       backLabel={i18n.t('identification.destination.birthdate')}>
            <h2>{i18n.t('identification.birthplace.title')}</h2>
            <ApplicantBirthPlace name="birthplace"
                                 value={this.props.ApplicantBirthPlace}
                                 dispatch={this.props.dispatch}
                                 onUpdate={this.handleUpdate.bind(this, 'ApplicantBirthPlace')}
                                 onError={this.handleError}
                                 />
          </SectionView>

          <SectionView name="contacts"
                       back="identification/name"
                       backLabel={i18n.t('identification.destination.name')}
                       next="identification/othernames"
                       nextLabel={i18n.t('identification.destination.othernames')}>
            <h2>{i18n.t('identification.contacts.title')}</h2>
            <ContactInformation name="contacts"
                                {...this.props.Contacts}
                                dispatch={this.props.dispatch}
                                onUpdate={this.handleUpdate.bind(this, 'Contacts')}
                                onError={this.handleError}
                                />
          </SectionView>

          <SectionView name="ssn"
                       back="identification/birthplace"
                       backLabel={i18n.t('identification.destination.birthplace')}
                       next="identification/physical"
                       nextLabel={i18n.t('identification.destination.physical')}>
            <h2>{i18n.t('identification.ssn.title')}</h2>
            <ApplicantSSN name="ssn"
                          value={this.props.ApplicantSSN}
                          dispatch={this.props.dispatch}
                          onUpdate={this.handleUpdate.bind(this, 'ApplicantSSN')}
                          onError={this.handleError}
                          />
          </SectionView>

          <SectionView name="physical"
                       back="identification/ssn"
                       backLabel={i18n.t('identification.destination.ssn')}
                       next="identification/review"
                       nextLabel={i18n.t('identification.destination.review')}>
            <h2>{i18n.t('identification.traits.title')}</h2>
            <Physical name="physical"
                      {...this.props.Physical}
                      dispatch={this.props.dispatch}
                      onUpdate={this.handleUpdate.bind(this, 'Physical')}
                      onError={this.handleError}
                      />
          </SectionView>
        </SectionViews>
      </div>
    )
  }
}

function mapStateToProps (state) {
  let section = state.section || {}
  let app = state.application || {}
  let identification = app.Identification || {}
  let errors = app.Errors || {}
  let completed = app.Completed || {}
  return {
    Section: section,
    Identification: identification,
    ApplicantName: identification.ApplicantName || {},
    ApplicantBirthDate: processApplicantBirthDate(identification.ApplicantBirthDate) || {},
    ApplicantBirthPlace: identification.ApplicantBirthPlace || {},
    ApplicantSSN: identification.ApplicantSSN || {},
    OtherNames: identification.OtherNames || {},
    Contacts: identification.Contacts || {},
    Physical: identification.Physical || {},
    Errors: errors.identification || [],
    Completed: completed.identification || []
  }
}

export function processApplicantBirthDate (birthDate) {
  if (!birthDate) {
    return null
  }

  let d = null
  const { month, day, year } = birthDate
  if (month && day && year) {
    d = new Date(year, month - 1, day)
  }
  return d
}

Identification.defaultProps = {
  defaultView: 'name',
  store: 'Identification'
}

export default connect(mapStateToProps)(AuthenticatedView(Identification))
