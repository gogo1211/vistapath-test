import { useEffect, useState } from 'react'
import PropTypes from 'prop-types'

import { InputField, TextField } from '../FormFields'
import StatusTag from '../StatusTag'
import { CASE_STATUS, OPEN_MODE } from '../../utils/constants'
import './style.css'

export default function CaseForm({ mode, data, onSubmit, onCancel }) {
  const [caseData, setCaseData] = useState(data)

  // new images & annotations
  const [newImages, setNewImages] = useState([])

  useEffect(() => {
    setCaseData(data)
    setNewImages([])
  }, [data])

  const handleChange = (e, type) => {
    setCaseData({
      ...caseData,
      [type]: e.target.value
    })
  }

  const handleSubmit = () => {
    onSubmit(mode, caseData, newImages)
  }

  const handleChangeFile = (index, key, value) => {
    const temp = [...caseData.images]
    temp.splice(index, 1, { ...temp[index], [key]: value })
    setCaseData({ ...caseData, images: temp })
  }

  const handleRemoveFile = (index) => (e) => {
    const temp = [...caseData.images]
    temp.splice(index, 1)
    setCaseData({ ...caseData, images: temp })
  }

  const handleChangeNewFile = (index, key, value) => {
    const temp = [...newImages]
    temp.splice(index, 1, { ...newImages[index], [key]: value })
    setNewImages(temp)
  }

  const handleRemoveNewFile = (index) => (e) => {
    const temp = [...newImages]
    temp.splice(index, 1)
    setNewImages(temp)
  }

  const renderSubmit = () => {
    switch (mode) {
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
        value={caseData.name}
        isViewOnly={mode === OPEN_MODE.VIEW}
        onChange={(e) => handleChange(e, 'name')}
      />
      <TextField
        label="General Note"
        value={caseData.note}
        isViewOnly={mode === OPEN_MODE.VIEW}
        onChange={(e) => handleChange(e, 'note')}
      />
      {caseData.status && (
        <div className="field">
          <label className="label">Status</label>
          <div className="control">
            <StatusTag status={caseData.status} />
          </div>
        </div>
      )}
      <div className="content">
        <ul>
          {caseData.images.map(({ link, annotation }, index) => (
            <li key={index}>
              <div className="media">
                <figure className="media-left">
                  <p className="image">
                    <img
                      src={`http://localhost:3100/images/view/${link}`}
                      alt={link}
                      style={{ width: 128 }}
                    />
                  </p>
                </figure>
                <div className="media-content">
                  <div className="content">
                    <TextField
                      type="text"
                      value={annotation}
                      isViewOnly={mode === OPEN_MODE.VIEW}
                      onChange={(e) =>
                        handleChangeFile(index, 'annotation', e.target.value)
                      }
                    />
                  </div>
                </div>
                {mode === OPEN_MODE.EDIT && (
                  <div className="media-right">
                    <button
                      className="delete"
                      onClick={handleRemoveFile(index)}
                    ></button>
                  </div>
                )}
              </div>
            </li>
          ))}
          {newImages.map(({ file, annotation }, index) => (
            <li key={index}>
              <article className="media">
                <figure className="media-left">
                  <p className="image">
                    <img
                      src={URL.createObjectURL(file)}
                      alt={file.name}
                      style={{ width: 128 }}
                    />
                  </p>
                </figure>
                <div className="media-content">
                  <div className="content">
                    <TextField
                      type="text"
                      value={annotation}
                      onChange={(e) =>
                        handleChangeNewFile(index, 'annotation', e.target.value)
                      }
                    />
                  </div>
                </div>
                <div className="media-right">
                  <button
                    className="delete"
                    onClick={handleRemoveNewFile(index)}
                  ></button>
                </div>
              </article>
            </li>
          ))}
        </ul>
      </div>
      <div className="field is-grouped is-grouped-centered">
        {mode !== OPEN_MODE.VIEW && (
          <div className="control">
            <label htmlFor="add-files">
              <div className="button is-primary">Add Files</div>
            </label>
            <input
              id="add-files"
              name="add-files"
              type="file"
              accept="image/*"
              multiple
              style={{ display: 'none' }}
              onChange={(e) => {
                if (e.target.files) {
                  setNewImages([
                    ...newImages,
                    ...[...e.target.files].map((file) => ({
                      file,
                      annotation: ''
                    }))
                  ])
                }
              }}
            />
          </div>
        )}
        {caseData.status !== CASE_STATUS.APPROVED && (
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
  mode: PropTypes.oneOf(['add', 'edit', 'view']),
  data: PropTypes.shape({
    name: PropTypes.string,
    note: PropTypes.string,
    images: PropTypes.array
  })
}

CaseForm.defaultProps = {
  mode: 'add',
  data: {
    name: '',
    note: '',
    images: []
  }
}
