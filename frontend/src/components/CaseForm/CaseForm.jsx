import { useEffect, useState } from 'react'
import PropTypes from 'prop-types'

import { CASE_STATUS, OPEN_MODE } from '../../utils/constants'
import './style.css'

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

  // new images & annotations
  const [newImages, setNewImages] = useState([])

  useEffect(() => {
    setCaseData(data.case)
    setNewImages([])
  }, [data])

  const handleChange = (e, type) => {
    setCaseData({
      ...caseData,
      [type]: e.target.value
    })
  }

  const handleSubmit = () => {
    onSubmit(data.mode, {
      ...caseData,
      files: newImages
    })
  }

  const handleChangeNewFile = (index, key, value) => {
    const temp = [...newImages]
    temp.splice(index, 1, { ...newImages[index], [key]: value })
    setNewImages(temp)
  }

  const renderSubmit = () => {
    switch (data.mode) {
      case OPEN_MODE.ADD:
        return 'Create'
      case OPEN_MODE.EDIT:
        return 'Resubmit'
      case OPEN_MODE.VIEW:
        return 'Edit'
      default:
        return 'Submit'
    }
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
      <div className="content">
        <ul>
          {caseData &&
            caseData.images.map(({ link, annotation }) => (
              <li>
                <article class="media">
                  <figure class="media-left">
                    <p class="image">
                      <img
                        src={`http://localhost:3100/images/view/${link}`}
                        alt={link}
                        style={{ width: 128 }}
                      />
                    </p>
                  </figure>
                  <div class="media-content">
                    <div class="content">
                      <TextField type="text" value={annotation} />
                    </div>
                  </div>
                  <div class="media-right">
                    <button class="delete"></button>
                  </div>
                </article>
              </li>
            ))}
          {newImages.map(({ file, annotation }, index) => (
            <li>
              <article class="media">
                <figure class="media-left">
                  <p class="image">
                    <img
                      src={URL.createObjectURL(file)}
                      alt={file.name}
                      style={{ width: 128 }}
                    />
                  </p>
                </figure>
                <div class="media-content">
                  <div class="content">
                    <TextField
                      type="text"
                      value={annotation}
                      onChange={(e) =>
                        handleChangeNewFile(index, 'annotation', e.target.value)
                      }
                    />
                  </div>
                </div>
                <div class="media-right">
                  <button class="delete"></button>
                </div>
              </article>
            </li>
          ))}
        </ul>
      </div>
      <div className="field is-grouped is-grouped-centered">
        <p className="control">
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={(e) => {
              if (e.target.files) {
                // setAvatar(URL.createObjectURL(e.target.files[0]));
                setNewImages(
                  [...e.target.files].map((file) => ({ file, annotation: '' }))
                )
              }
            }}
          />
        </p>
        {caseData && caseData.status !== CASE_STATUS.APPROVED && (
          <p className="control">
            <button className="button is-primary" onClick={handleSubmit}>
              {renderSubmit()}
            </button>
          </p>
        )}
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
