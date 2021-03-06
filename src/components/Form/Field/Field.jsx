import React from 'react'
import { i18n } from '../../../config'
import ValidationElement, { newGuid } from '../ValidationElement'
import Svg from '../Svg'
import Textarea from '../Textarea'

const message = (id) => {
  const noteId = `${id}.note`
  let note = i18n.m(noteId)
  if (Object.prototype.toString.call(note) === '[object String]' && note.indexOf(noteId) > -1) {
    note = ''
  } else {
    note = <em>{note}</em>
  }

  return (
    <div key={newGuid()}>
      <h5>{i18n.t(`${id}.title`)}</h5>
      {i18n.m(`${id}.message`)}
      {note}
    </div>
  )
}

export default class Field extends ValidationElement {
  constructor (props) {
    super(props)

    this.state = {
      errors: props.errors,
      helpActive: props.helpActive,
      commentsActive: props.commentsActive,
      commentsValue: (props.commentsValue || {}).value || ''
    }

    this.toggleHelp = this.toggleHelp.bind(this)
    this.toggleComments = this.toggleComments.bind(this)
    this.handleError = this.handleError.bind(this)
    this.children = this.children.bind(this)

    this.errors = props.errors || []
  }

  /**
   * Handle the click event for the rendering of messages.
   */
  toggleHelp (event) {
    this.setState({ helpActive: !this.state.helpActive }, () => {
      this.scrollIntoView(this.refs.helpMessage)
    })
  }

  /**
   * Toggle the comment visibility.
   */
  toggleComments () {
    const future = !this.visibleComments()
    const value = future ? this.state.commentsValue : ''
    this.setState({ commentsActive: future, commentsValue: value }, () => {
      if (this.props.onUpdate) {
        this.props.onUpdate({
          name: this.props.commentsName,
          value: value
        })
      }
    })
  }

  /**
   * Determines if the comments should be visible.
   */
  visibleComments () {
    return this.props.comments && (this.state.commentsValue || this.state.commentsActive || this.props.commentsActive)
  }

  handleError (value, arr = []) {
    let errors = [...this.errors]
    if (arr.length === 0) {
      if (errors.length && errors.some(err => err.valid === false)) {
        this.scrollIntoView(this.refs.errorMessages)
      }
      return arr
    }

    for (const e of arr) {
      const idx = errors.findIndex(x => x.uid === e.uid && x.code === e.code)
      if (idx !== -1) {
        errors[idx] = { ...e }
      } else {
        errors.push({ ...e })
      }
    }

    // Store in instance variable to update immediately as opposed to storing in state
    // which is an asynchronous operation. This prevents the issue where one call
    // overrides the errors of another call if both are executed almost at the time same.
    this.errors = [...errors]
    this.setState({ errors: errors }, () => {
      if (errors.length && errors.some(err => err.valid === false)) {
        this.scrollIntoView(this.refs.errorMessages)
      }
    })

    return arr
  }

  /**
   * Render the title as needed
   */
  title (required = false) {
    if (this.props.title) {
      const klassTitle = `title ${this.props.titleSize}`.trim()
      const optional = !required && this.props.optionalText
            ? <span className="optional">{this.props.optionalText}</span>
            : null
      return <span className={klassTitle}>{this.props.title}{optional}</span>
    }

    return null
  }

  /**
   * Render the comments toggle link if needed.
   */
  commentsButton () {
    if (!this.props.comments) {
      return null
    }

    if (this.visibleComments()) {
      return (
        <a href="javascript:;;" onClick={this.toggleComments} className="comments-button remove">
          <span>{i18n.t(this.props.commentsRemove)}</span>
          <i className="fa fa-times-circle"></i>
        </a>
      )
    }

    return (
      <a href="javascript:;;" onClick={this.toggleComments} className="comments-button add">
        <span>{i18n.t(this.props.commentsAdd)}</span>
        <i className="fa fa-plus-circle"></i>
      </a>
    )
  }

  /**
   * Render the comments if necessary.
   */
  comments () {
    if (!this.props.comments || !this.visibleComments()) {
      return null
    }

    return (
      <Textarea name={this.props.commentsName}
                value={this.state.commentsValue}
                className="comments"
                onUpdate={this.props.onUpdate}
                onValidate={this.props.onValidate}
                />
    )
  }

  /**
   * Render the help icon if needed.
   */
  icon () {
    if (!this.props.help) {
      return null
    }

    const klass = `toggle ${this.props.titleSize} ${this.state.helpActive ? 'active' : ''} ${this.props.adjustFor ? `adjust-for-${this.props.adjustFor}` : ''}`.trim()

    return (
      <a href="javascript:;"
         tabIndex="-1"
         title="Show help"
         className={klass}
         onClick={this.toggleHelp}>
        <Svg src="/img/info.svg" />
      </a>
    )
  }

  /**
   * Render the help messages allowing for Markdown syntax.
   */
  helpMessage () {
    if (this.state.helpActive && this.props.help) {
      return (
        <div className="message help">
          <i className="fa fa-question"></i>
          {message(this.props.help)}
          <a href="javascript:;;" className="close" onClick={this.toggleHelp}>
            {i18n.t('help.close')}
          </a>
        </div>
      )
    }

    return null
  }

  /**
   * Render the error messages allowing for Markdown syntax.
   */
  errorMessages () {
    let el = []
    let stateErrors = this.props.filterErrors(this.errors || [])
    let errors = stateErrors.filter(err => err.valid === false && err.code.indexOf('required') === -1 && err.code.indexOf('country.notfound') === -1)
    const required = stateErrors
      .filter(err => err.code.indexOf('required') > -1 && err.valid === false)
      .sort((e1, e2) => {
        return e1.code.split('.').length - e2.code.split('.').length
      })

    if (required.length) {
      errors = errors.concat(required[0])
    }

    if (errors.length) {
      const markup = errors.map(err => {
        return message(`error.${err.code}`)
      })

      el.push(
        <div className="message error" key={super.guid()}>
          <i className="fa fa-exclamation"></i>
          {markup}
        </div>
      )
    }

    return el
  }

  /**
   * Iterate through the children and bind methods to them.
   */
  children (el) {
    return React.Children.map(el, (child) => {
      if (!child || !child.props) {
        return child
      }

      let props = child.props || {}
      let extendedProps = { ...props }
      let injected = false

      if (React.isValidElement(child)) {
        // Inject ourselves in to the validation callback
        if (props.onError) {
          injected = true
          extendedProps.onError = (value, arr) => {
            return this.handleError(value, props.onError(value, arr))
          }
        }
      }

      if (props.children && !injected) {
        const typeOfChildren = Object.prototype.toString.call(props.children)
        if (props.children && ['[object Object]', '[object Array]'].includes(typeOfChildren)) {
          extendedProps.children = this.children(props.children)
        }
      }

      return React.cloneElement(child, extendedProps)
    })
  }

  /**
   * Checks if the children and help message are within the current viewport. If not, scrolls the
   * help message into view so that users can see the message without having to manually scroll.
   */
  scrollIntoView (ref) {
    if (!ref) {
      return
    }

    // Grab the bottom position for the help container
    const helpBottom = ref.getBoundingClientRect().bottom

    // Grab the current window height
    const winHeight = window.innerHeight

    // Flag if help container bottom is within current viewport
    const notInView = (winHeight < helpBottom)

    const active = this.state.helpActive || this.errors.some(x => x.valid === false)

    if (active && this.props.scrollIntoView && notInView) {
      window.scrollBy({ top: (helpBottom - winHeight), left: 0, behavior: 'smooth' })
    }
  }

  render () {
    const required = !this.props.optional || (!this.props.optional && (this.props.children || []).length === 0)
    const klass = `field ${required ? 'required' : ''} ${this.visibleComments() ? 'with-comments' : ''} ${this.props.className || ''}`.trim()
    const klassComponent = `component ${this.props.shrink ? 'shrink' : ''}`.trim()

    return (
      <div className={klass} ref="field">
        {this.title(required)}
        <span className="icon">
          {this.icon()}
        </span>
        <div className="table expand">
          <span className="messages help-messages" ref="helpMessage">
            {this.helpMessage()}
          </span>
        </div>
        <div className="table">
          <span className="content">
            <span className={klassComponent}>
              {this.children(this.props.children)}
              {this.comments()}
              {this.commentsButton()}
            </span>
          </span>
        </div>
        <div className="table expand">
          <span className="messages error-messages" ref="errorMessages">
            {this.errorMessages()}
          </span>
        </div>
      </div>
    )
  }
}

Field.defaultProps = {
  title: '',
  titleSize: 'h3',
  className: '',
  errors: [],
  errorPrefix: '',
  help: '',
  helpActive: false,
  adjustFor: '',
  comments: false,
  commentsName: 'Comments',
  commentsValue: {},
  commentsActive: false,
  commentsAdd: 'comments.add',
  commentsRemove: 'comments.remove',
  optional: false,
  optionalText: '',
  validate: true,
  shrink: false,
  scrollIntoView: true,
  filterErrors: (errors) => { return errors }
}
