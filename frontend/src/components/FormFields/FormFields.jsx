import PropTypes from 'prop-types'

export function InputField({ label, isValid, isViewOnly, ...props }) {
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
  isValid: PropTypes.bool,
  isViewOnly: PropTypes.bool
}

InputField.defaultProps = {
  label: '',
  isValid: true,
  isViewOnly: false
}

export function TextField({ label, isValid, isViewOnly, ...props }) {
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

TextField.propTypes = {
  label: PropTypes.string,
  isValid: PropTypes.bool,
  isViewOnly: PropTypes.bool
}

TextField.defaultProps = {
  label: '',
  isValid: true,
  isViewOnly: false
}
