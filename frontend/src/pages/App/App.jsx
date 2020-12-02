import { useEffect, useState } from 'react'

import Grid from '../../components/Grid'
import Modal from '../../components/Modal'
import CaseForm from '../../components/CaseForm'
import { createCase, fetchCases } from '../../utils/api'
import { CASE_STATUS, OPEN_MODE } from '../../utils/constants'
import './style.css'

export default function App() {
  const [cases, setCases] = useState([])
  const [openForm, setOpenForm] = useState({})

  useEffect(() => {
    fetchCases().then((res) => setCases(res))
  }, [])

  const handleAddNewCase = (e) => {
    setOpenForm({
      case: {
        name: '',
        note: '',
        images: []
      },
      mode: OPEN_MODE.ADD
    })
  }

  const handleAction = (mode) => (row) => {
    setOpenForm({
      case: row,
      mode
    })
  }

  const handleSubmit = (data) => {
    createCase(data)
      .then((res) => {
        setCases([...cases, res])
      })
      .finally(() => {
        setOpenForm(false)
      })
  }

  return (
    <div className="app">
      <div className="header">
        <h1 className="title">Cases</h1>
        <button
          className="button is-primary is-small"
          onClick={handleAddNewCase}
        >
          Add New Case
        </button>
      </div>
      <Grid
        data={{
          header: [
            { label: 'ID', key: 'id' },
            { label: 'Name', key: 'name' },
            { label: 'Note', key: 'note' },
            {
              label: 'Number of Images',
              type: 'number',
              renderer: (row) => row.images.length
            },
            {
              label: 'Status',
              type: 'number',
              renderer: (row) => (
                <span className="tag is-info is-capitalized">{row.status}</span>
              )
            }
          ],
          values: cases,
          actions: [
            {
              label: 'Edit',
              action: handleAction(OPEN_MODE.EDIT),
              show: (row) => row.status !== CASE_STATUS.APPROVED
            },
            { label: 'View', action: handleAction(OPEN_MODE.VIEW) }
          ]
        }}
      />

      <Modal
        title={`${openForm.mode} case`}
        open={!!openForm.mode}
        onClose={() => setOpenForm({})}
      >
        <CaseForm
          data={openForm}
          onSubmit={handleSubmit}
          onCancel={() => setOpenForm({})}
        />
      </Modal>
    </div>
  )
}
