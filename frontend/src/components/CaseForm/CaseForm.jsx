import { useEffect, useState } from 'react'
import PropTypes from 'prop-types'

import { OPEN_MODE } from '../../utils/constants'

function InputField({ label, isValid = true, isViewOnly, ...props }) {
  return (
    <div className="field">
      <label className="label">{label}</label>
      <div className="control">
        {isViewOnly ? (
          props.value
        ) : (
          <input className={`input${isValid ? '' : ' is-danger'}`} {...props} />
        )}
      </div>
      {!isValid && <p className="help is-danger">This field is invalid</p>}
    </div>
  )
}

InputField.propTypes = {
  label: PropTypes.string,
  isValid: PropTypes.bool
}

function TextField({ label, isValid = true, isViewOnly, ...props }) {
  return (
    <div className="field">
      <label className="label">{label}</label>
      <div className="control">
        {isViewOnly ? (
          props.value
        ) : (
          <textarea
            className={`textarea${isValid ? '' : ' is-danger'}`}
            {...props}
          />
        )}
      </div>
      {!isValid && <p className="help is-danger">This field is invalid</p>}
    </div>
  )
}

InputField.propTypes = {
  label: PropTypes.string,
  isValid: PropTypes.bool
}

export default function CaseForm({ data, onSubmit, onCancel }) {
  const [caseData, setCaseData] = useState(data.case)

  useEffect(() => {
    setCaseData(data.case)
  }, [data])

  const handleChange = (e, type) => {
    setCaseData({
      ...caseData,
      [type]: e.target.value
    })
  }

  const handleSubmit = () => {
    onSubmit(caseData)
  }

  return (
    <fieldset>
      <InputField
        type="text"
        label="Name"
        value={caseData && caseData.name}
        isViewOnly={data.mode === OPEN_MODE.VIEW}
        onChange={(e) => handleChange(e, 'name')}
      />
      <TextField
        label="General Note"
        value={caseData && caseData.note}
        isViewOnly={data.mode === 'view'}
        onChange={(e) => handleChange(e, 'note')}
      />
      <div className="field is-grouped is-grouped-centered">
        <p className="control">
          <button className="button is-primary" onClick={handleSubmit}>
            Submit
          </button>
        </p>
        <p className="control">
          <button className="button is-light" onClick={onCancel}>
            Cancel
          </button>
        </p>
      </div>
    </fieldset>
  )
}

CaseForm.propTypes = {
  item: PropTypes.shape({
    name: PropTypes.string,
    note: PropTypes.string
  })
}
