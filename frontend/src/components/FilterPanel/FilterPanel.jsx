import { CASE_STATUS } from '../../utils/constants'

export default function FilterPanel({ data, onChange }) {
  const handleChanage = (key) => (e) => {
    onChange({
      ...data,
      [key]: e.target.value.toLowerCase()
    })
  }

  return (
    <div class="field is-horizontal">
      <div class="field-label is-small">
        <label class="label">Filter</label>
      </div>
      <div class="field-body">
        <div class="field">
          <div class="control">
            <input
              class="input is-small"
              type="text"
              placeholder="Name"
              value={data.name}
              onChange={handleChanage('name')}
            />
          </div>
        </div>
        <div class="field">
          <div class="select is-small">
            <select
              className="is-capitalized"
              onChange={handleChanage('status')}
            >
              <option value="all">All</option>
              {Object.values(CASE_STATUS).map((item) => (
                <option className="is-capitalized" value={item}>
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
