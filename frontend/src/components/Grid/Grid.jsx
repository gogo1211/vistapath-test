import Loader from '../Loader'
import PropTypes from 'prop-types'
import './Grid.css'

function Grid({ loading, data: { header = [], values = [], actions = [] } }) {
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
        {header.map(({ label, type }) => (
          <td key={label} className={type === 'number' ? 'right' : 'center'}>
            {row[label]}
          </td>
        ))}
        {!!actions.length && (
          <td className="gridActions">
            <div className="field is-grouped is-grouped-multiline">
              {actions
                .filter(({ show }) => show(row))
                .map(({ label, action }, index) => (
                  <p key={index} className="control">
                    <button
                      className="button is-primary is-small"
                      onClick={() => action(row)}
                    >
                      {label}
                    </button>
                  </p>
                ))}
            </div>
          </td>
        )}
      </tr>
    ))
  }
  return (
    <table className="gridTable">
      <thead>
        <tr>
          {header.map(({ label, type }) => (
            <th key={label} className={type === 'number' ? 'right' : 'center'}>
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

export default Grid
