import React from 'react'
import { i18n } from '../../../../config'
import schema from '../../../../schema'
import validate from '../../../../validators'
import SubsectionElement from '../../SubsectionElement'
import { Location, Field } from '../../../Form'

export default class ApplicantBirthPlace extends SubsectionElement {
  constructor (props) {
    super(props)
    this.update = this.update.bind(this)
    this.updateLocation = this.updateLocation.bind(this)
  }

  update (queue) {
    this.props.onUpdate({
      location: this.props.location,
      ...queue
    })
  }

  updateLocation (values) {
    this.update({
      location: values
    })
  }

  render () {
    const klass = `applicant-birthplace ${this.props.className || ''}`.trim()

    return (
      <div className={klass}>
        <Field title={i18n.t('identification.birthplace.title')}
               titleSize="h2"
               className="no-margin-bottom"
               scrollIntoView={this.props.scrollIntoView}>
          <Location name="birthplace"
                    layout={Location.BIRTHPLACE}
                    label={i18n.t('identification.birthplace.label.location')}
                    stateLabel={i18n.t('identification.birthplace.label.state')}
                    statePlaceholder={i18n.t('identification.birthplace.placeholder.state')}
                    cityLabel={i18n.t('identification.birthplace.label.city')}
                    cityPlaceholder={i18n.t('identification.birthplace.placeholder.city')}
                    countyLabel={i18n.t('identification.birthplace.label.county')}
                    countyPlaceholder={i18n.t('identification.birthplace.placeholder.county')}
                    countryLabel={i18n.t('identification.birthplace.label.country')}
                    countryPlaceholder={i18n.t('identification.birthplace.placeholder.country')}
                    {...this.props.location}
                    onUpdate={this.updateLocation}
                    onError={this.handleError}
                    required={this.props.required}
                    />
        </Field>
      </div>
    )
  }
}

ApplicantBirthPlace.defaultProps = {
  location: {},
  onUpdate: (queue) => {},
  onError: (value, arr) => { return arr },
  section: 'identification',
  subsection: 'birthplace',
  dispatch: () => {},
  validator: (state, props) => {
    return validate(schema('identification.birthplace', props))
  }
}

ApplicantBirthPlace.errors = []
