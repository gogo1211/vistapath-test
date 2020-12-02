import PropTypes from 'prop-types'

import { CASE_STATUS } from '../../utils/constants'

export default function FilterPanel({ data, onChange }) {
  const handleChanage = (key) => (e) => {
    onChange({
      ...data,
      [key]: e.target.value.toLowerCase()
    })
  }

  return (
    <div className="field is-horizontal">
      <div className="field-label is-small">
        <label className="label">Filter</label>
      </div>
      <div className="field-body">
        <div className="field">
          <div className="control">
            <input
              className="input is-small"
              type="text"
              placeholder="Name"
              value={data.name}
              onChange={handleChanage('name')}
            />
          </div>
        </div>
        <div className="field">
          <div className="select is-small">
            <select
              className="is-capitalized"
              onChange={handleChanage('status')}
            >
              <option value="all">All</option>
              {Object.values(CASE_STATUS).map((item) => (
                <option key={item} className="is-capitalized" value={item}>
                  {item}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
    </div>
  )
}

FilterPanel.propTypes = {
  data: PropTypes.shape({
    name: PropTypes.string,
    status: PropTypes.oneOf(['all', 'created', 'approved', 'rejected'])
  }),
  onChange: PropTypes.func
}

FilterPanel.defaultProps = {
  data: {
    name: '',
    status: 'all'
  },
  onChange: () => {}
}
