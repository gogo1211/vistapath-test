import { CASE_STATUS_COLOR } from '../../utils/constants'

export default function StatusTag({ status }) {
  return (
    <span className={`tag is-capitalized ${CASE_STATUS_COLOR[status]}`}>
      {status}
    </span>
  )
}
