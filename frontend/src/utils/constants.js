export const BASE_URL = process.env.REACT_APP_API_URL

export const CASE_STATUS = {
  CREATED: 'created',
  APPROVED: 'approved',
  REJECTED: 'rejected'
}

export const CASE_STATUS_COLOR = {
  [CASE_STATUS.CREATED]: 'is-info',
  [CASE_STATUS.APPROVED]: 'is-success',
  [CASE_STATUS.REJECTED]: 'is-danger'
}

export const OPEN_MODE = {
  ADD: 'add',
  EDIT: 'edit',
  VIEW: 'view'
}
