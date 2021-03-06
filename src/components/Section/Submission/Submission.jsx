import React from 'react'
import { connect } from 'react-redux'
import { navigation, navigationWalker } from '../../../config'
import { hideHippa } from '../../../validators/releases'
import { SectionViews, SectionView } from '../SectionView'
import SectionElement from '../SectionElement'
import AuthenticatedView from '../../../views/AuthenticatedView'
import ValidForm from './ValidForm'
import InvalidForm from './InvalidForm'
import SubmissionStatus from './SubmissionStatus'
import { push } from '../../../middleware/history'

class Submission extends SectionElement {
  constructor (props) {
    super(props)

    this.updateSubmission = this.updateSubmission.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
    this.onTransitionEnd = this.onTransitionEnd.bind(this)
    // TODO: Remove after testing
    this.goToReleases = this.goToReleases.bind(this)
    this.errorCheck = this.errorCheck.bind(this)
  }

  updateSubmission (values) {
    this.handleUpdate('Releases', values)
  }

  onSubmit () {
    // TODO: Generate has code here and send to print screen when
    // merged with persistence updates
    this.props.dispatch(push('/form/print/intro'))
  }

  /**
   * When the progress bar transition ends, redirect to page containing
   * releases or errors based on whether the form is valid
   */
  onTransitionEnd () {
    const tally = this.errorCheck()
    for (const sectionName in tally) {
      const mark = tally[sectionName]
      if (mark.errors > 0) {
        this.props.dispatch(push('/form/submission/errors'))
        return
      }
    }

    this.props.dispatch(push('/form/submission/releases'))
    return
  }

  /**
   * TODO: Remove after testing. Hook to get to releases form
   */
  goToReleases () {
    this.props.dispatch(push('/form/submission/releases'))
  }

  errorCheck () {
    let tally = {}

    navigationWalker((path, child) => {
      if (path.length && path[0].store && child.store && child.validator) {
        if (child.excluded || child.hidden || (child.hiddenFunc && child.hiddenFunc(this.props.Application))) {
          return
        }

        const sectionName = path[0].url
        const data = (this.props.Application[path[0].store] || {})[child.store] || {}

        let subsectionName = child.url
        if (path.length > 1) {
          for (let i = path.length - 1; i > 0; i--) {
            subsectionName = `${path[i].url}/${subsectionName}`
          }
        }

        let valid = null
        try {
          valid = new child.validator(data, data).isValid()
        } catch (e) {
          valid = null
        }

        if (!tally[sectionName]) {
          tally[sectionName] = {}
        }

        tally[sectionName].section = path[0]
        if (valid === false) {
          tally[sectionName].errors = (tally[sectionName].errors || 0) + (valid === false ? 1 : 0)
          tally[sectionName].subsections = [...(tally[sectionName].subsections || []), child]
        }
      }
    })

    return tally
  }

  render () {
    const tally = this.errorCheck()
    const releases = (this.props.Submission || {}).Releases
    return (
      <SectionViews current={this.props.subsection} dispatch={this.props.dispatch}>
        <SectionView name="intro">
          <SubmissionStatus transition={true} onTransitionEnd={this.onTransitionEnd}/>
        </SectionView>
        <SectionView name="valid">
          <SubmissionStatus transition={true} onTransitionEnd={this.goToReleases}/>
        </SectionView>
        <SectionView name="releases">
          <SubmissionStatus valid={true} transition={false}>
            <ValidForm
              onUpdate={this.updateSubmission}
              hideHippa={hideHippa(this.props.Application)}
              {...releases}
              LegalName={this.props.LegalName}
              onSubmit={this.onSubmit}
              Identification={this.props.Identification}
              History={this.props.History}
            />
          </SubmissionStatus>
        </SectionView>
        <SectionView name="errors">
          <SubmissionStatus valid={false} transition={false}>
            <InvalidForm tally={tally} />
          </SubmissionStatus>
        </SectionView>
      </SectionViews>
    )
  }
}

/**
 * Checks if all sections are complete
 */
export const allSectionsValid = (sections) => {
  for (let section of sections) {
    const topLevel = section.subsections
    if (!topLevel.every(s => { return s.complete === true })) {
      return false
    }
  }
  return true
}

/**
 * Generates the status for all sections
 * Has the structure:
 * {
 *  title: '',
 *  url: '',
 *  subsections: [
 *    {
 *        name: '',
 *        url: '',
 *        complete:
 *    }
 *  ]
 * }
 */
export const statusForAllSections = (application) => {
  let possibleSections = possibleSectionsToComplete()
  const completedTopLevelSections = application.Completed

  for (let possibleSection of possibleSections) {
    const completedSections = completedTopLevelSections[possibleSection.url]
    if (!completedSections) {
      return possibleSections
    }

    let possibleSubsections = possibleSection.subsections
    for (let possibleSubsection of possibleSubsections) {
      for (let completedSection of completedSections) {
        if (possibleSubsection.url === completedSection.code) {
          possibleSubsection.complete = completedSection.valid
        }
      }
    }
  }
  return possibleSections
}

/**
 * Returns sections that are eligible to be completed. This includes sections that
 * are not hidden or excluded
 */
export const possibleSectionsToComplete = () => {
  let sections = [...navigation]
  let paths = []
  for (let section of sections) {
    if (section.exclude || section.hidden) {
      continue
    }
    paths.push({
      title: section.title,
      url: section.url,
      subsections: flattenSectionsComplete(section)
    })
  }
  return paths
}

/**
 * Flattens subsections that have more than 1 level. Examples include
 * the Foreign activities section. The errors are comprised of
 * top level sections and then their children (2nd and 3rd level subsections).
 */
export const flattenSectionsComplete = (section, base) => {
  if (!section.subsections || !section.subsections.length) {
    return [
      {
        url: section.url,
        name: section.name,
        complete: false
      }
    ]
  }
  let paths = []
  for (let subsection of section.subsections) {
    if (subsection.exclude || subsection.hidden) {
      continue
    }

    let url = `${section.url}`
    let sPaths = flattenSectionsComplete(subsection).map(i => {
      return {
        url: `${url}/${i.url}`,
        name: i.name,
        complete: false
      }
    })
    paths = paths.concat(sPaths)
  }

  return paths
}

function mapStateToProps (state) {
  const app = state.application || {}
  const releases = app.Releases || {}
  const identification = app.Identification || {}
  const relationships = app.Relationships || {}
  const history = app.History || {}
  const historyResidence = history.Residence || []
  const historyEmployment = history.Employment || { List: [], ListBranch: '' }
  const historyEducation = history.Education || { HasAttended: '', HasDegree10: '', List: [] }
  const citizenship = app.Citizenship || {}
  const military = app.Military || {}
  const foreign = app.Foreign || {}
  const financial = app.Financial || {}
  const substanceUse = app.SubstanceUse || {}
  const legal = app.Legal || {}

  let errors = app.Errors || {}
  let completed = app.Completed || {}
  return {
    Application: app,
    Releases: releases,
    Submission: app.Submission || {
      AdditionalComments: {
        Signature: {}
      },
      General: {
        Signature: {}
      },
      Medical: {
        Signature: {}
      },
      Credit: {
        Signature: {}
      }
    },
    Identification: identification,
    Relationships: relationships,
    History: {
      ...history,
      Residence: historyResidence,
      Employment: historyEmployment,
      Education: historyEducation
    },
    Citizenship: citizenship,
    Military: military,
    Foreign: foreign,
    Financial: financial,
    SubstanceUse: substanceUse,
    Legal: legal,
    LegalName: identification.ApplicantName || {},
    Errors: errors.releases || [],
    Completed: completed.releases || []
  }
}

Submission.defaultProps = {
  section: 'submission',
  store: 'Submission'
}

export default connect(mapStateToProps)(AuthenticatedView(Submission))
