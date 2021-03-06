import React from 'react'
import { i18n } from '../../../../config'
import { ValidationElement, Email, Text, Field, Location, Telephone, NotApplicable } from '../../../Form'

export default class Supervisor extends ValidationElement {
  constructor (props) {
    super(props)

    this.state = {
      SupervisorName: props.SupervisorName,
      Title: props.Title,
      Email: props.Email,
      EmailNotApplicable: props.EmailNotApplicable,
      Address: props.Address,
      Telephone: props.Telephone
    }

    this.updateEmailNotApplicable = this.updateEmailNotApplicable.bind(this)
  }

  doUpdate () {
    if (this.props.onUpdate) {
      this.props.onUpdate({
        name: this.props.name,
        SupervisorName: this.state.SupervisorName,
        Title: this.state.Title,
        Email: this.state.Email,
        EmailNotApplicable: this.state.EmailNotApplicable,
        Address: this.state.Address,
        Telephone: this.state.Telephone
      })
    }
  }

  onUpdate (field, value) {
    this.setState({ [field]: value }, () => {
      this.doUpdate()
    })
  }

  updateEmailNotApplicable (values) {
    this.setState({ EmailNotApplicable: values }, () => {
      this.doUpdate()
    })
  }

  render () {
    return (
      <div className="supervisor">
        <Field title={i18n.t('history.employment.default.supervisor.heading.name')}
               adjustFor="labels"
               scrollIntoView={this.props.scrollIntoView}>
          <Text name="SupervisorName"
                className="text full-width"
                {...this.props.SupervisorName}
                onError={this.props.onError}
                onUpdate={this.onUpdate.bind(this, 'SupervisorName')}
                required={this.props.required}
                />
        </Field>

        <Field title={i18n.t('history.employment.default.supervisor.heading.title')}
               adjustFor="labels"
               scrollIntoView={this.props.scrollIntoView}>
          <Text name="Title"
                {...this.props.Title}
                className="text full-width supervisor-title"
                onUpdate={this.onUpdate.bind(this, 'Title')}
                onError={this.props.onError}
                required={this.props.required}
                />
        </Field>

        <Field title={i18n.t('history.employment.default.supervisor.heading.email')}
               adjustFor="label"
               shrink={true}
               scrollIntoView={this.props.scrollIntoView}>
          <NotApplicable name="EmailNotApplicable"
                         {...this.state.EmailNotApplicable}
                         label={i18n.t('reference.label.idk')}
                         or={i18n.m('reference.para.or')}
                         onUpdate={this.updateEmailNotApplicable}
                         onError={this.props.onError}>
            <Email name="Email"
                   {...this.props.Email}
                   className="text supervisor-email"
                   onUpdate={this.onUpdate.bind(this, 'Email')}
                   onError={this.props.onError}
                   required={(this.state.EmailNotApplicable || {}).applicable === false ? false : this.props.required}
                   />
          </NotApplicable>
        </Field>

        <Field title={i18n.t('history.employment.default.supervisor.heading.address')}
               optional={true}
               help="history.employment.default.supervisor.address.help"
               adjustFor="address"
               scrollIntoView={this.props.scrollIntoView}>
          <Location name="Address"
                    {...this.props.Address}
                    label={i18n.t('history.employment.default.supervisor.address.label')}
                    className="supervisor-address"
                    layout={Location.ADDRESS}
                    geocode={true}
                    addressBooks={this.props.addressBooks}
                    addressBook={this.props.addressBook}
                    dispatch={this.props.dispatch}
                    onUpdate={this.onUpdate.bind(this, 'Address')}
                    onError={this.props.onError}
                    required={this.props.required}
                    />
        </Field>

        <Field title={i18n.t('history.employment.default.supervisor.heading.telephone')}
               className="override-required"
               adjustFor="telephone"
               scrollIntoView={this.props.scrollIntoView}>
          <Telephone name="Telephone"
                     {...this.props.Telephone}
                     className="supervisor-telephone"
                     onUpdate={this.onUpdate.bind(this, 'Telephone')}
                     onError={this.props.onError}
                     required={this.props.required}
                     />
        </Field>
      </div>
    )
  }
}

Supervisor.defaultProps = {
  SupervisorName: {},
  Title: {},
  Email: {},
  EmailNotApplicable: {},
  Address: {},
  Telephone: {},
  addressBooks: {},
  addressBook: 'Supervisor',
  dispatch: (action) => {},
  onError: (value, arr) => { return arr }
}
