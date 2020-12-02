import Loader from '../Loader'
import PropTypes from 'prop-types'
import './style.css'

export default function Grid({
  loading,
  data: { header = [], values = [], actions = [] }
}) {
  const renderValues = () => {
    if (!values.length) {
      return (
        <tr>
          <td colSpan={header.length + (actions.length ? 1 : 0)}>No Data</td>
        </tr>
      )
    }
    return values.map((row, index) => (
      <tr key={index}>
        {header.map(({ key, align, renderer }, index) => (
          <td key={index} className={align || ''}>
            {renderer ? renderer(row) : row[key]}
          </td>
        ))}
        {!!actions.length && (
          <td className="grid-actions">
            <div className="buttons">
              {actions
                .filter(({ show }) => !show || (show && show(row)))
                .map(({ label, action }, index) => (
                  <button
                    key={index}
                    className="button is-primary is-small is-outlined is-rounded"
                    onClick={() => action(row)}
                  >
                    {label}
                  </button>
                ))}
            </div>
          </td>
        )}
      </tr>
    ))
  }
  return (
    <table className="grid-table">
      <thead>
        <tr>
          {header.map(({ label, align }) => (
            <th key={label} className={align || ''}>
              {label}
            </th>
          ))}
          {!!actions.length && <th>Actions</th>}
        </tr>
      </thead>
      <tbody>
        {loading ? (
          <tr>
            <td colSpan={header.length + (actions.length ? 1 : 0)}>
              <Loader />
            </td>
          </tr>
        ) : (
          renderValues()
        )}
      </tbody>
    </table>
  )
}

Grid.propTypes = {
  loading: PropTypes.bool,
  data: PropTypes.shape({
    header: PropTypes.array.isRequired,
    values: PropTypes.array,
    actions: PropTypes.array
  })
}
