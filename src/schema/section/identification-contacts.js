import * as form from '../form'

export const identificationContacts = (data = {}) => {
  const emails = ((data.Emails || {}).items || []).map(x => {
    const xitem = x.Item || {}
    return {
      Item: {
        Email: form.email(xitem)
      }
    }
  })
  const phoneNumbers = ((data.PhoneNumbers || {}).items || []).map(x => {
    const xitem = x.Item || {}
    return {
      Item: {
        PhoneNumber: form.telephone(xitem.PhoneNumber)
      }
    }
  })
  return {
    Emails: form.collection(emails),
    PhoneNumbers: form.collection(phoneNumbers)
  }
}
