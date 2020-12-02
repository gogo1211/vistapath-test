import { useEffect, useState } from 'react'

import Grid from '../../components/Grid'
import Modal from '../../components/Modal'
import CaseForm from '../../components/CaseForm'
import FilterPanel from '../../components/FilterPanel'
import { createCase, fetchCases, updateCase } from '../../utils/api'
import {
  CASE_STATUS,
  CASE_STATUS_COLOR,
  OPEN_MODE
} from '../../utils/constants'
import './style.css'

export default function App() {
  const [cases, setCases] = useState([])
  const [filter, setFilter] = useState({
    name: '',
    status: 'all'
  })
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

  const handleSubmit = (mode, data, newFiles) => {
    if (mode === OPEN_MODE.ADD) {
      createCase(data, newFiles)
        .then((res) => {
          setCases([...cases, res])
        })
        .finally(() => {
          setOpenForm(false)
        })
    } else if (mode === OPEN_MODE.EDIT && data.id) {
      updateCase(data.id, data, newFiles)
        .then((res) => {
          const newCases = [...cases]
          const index = cases.findIndex((item) => item.id === res.id)
          newCases.splice(index, 1, res)
          setCases(newCases)
        })
        .finally(() => {
          setOpenForm(false)
        })
    } else if (mode === OPEN_MODE.VIEW) {
      setOpenForm({
        ...openForm,
        mode: OPEN_MODE.EDIT
      })
    }
  }

  const filterCases = () =>
    cases.filter(
      (item) =>
        item.name.toLowerCase().includes(filter.name) &&
        (filter.status === 'all' || filter.status === item.status)
    )

  return (
    <div className="app">
      <h1 className="title">Cases</h1>
      <div className="header">
        <FilterPanel data={filter} onChange={setFilter} />
        <button
          className="button is-primary is-small"
          onClick={handleAddNewCase}
        >
          Add New Case
        </button>
      </div>

      <div className="box">
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
                renderer: (row) => {
                  return (
                    <span
                      className={`tag is-capitalized ${
                        CASE_STATUS_COLOR[row.status]
                      }`}
                    >
                      {row.status}
                    </span>
                  )
                }
              }
            ],
            values: filterCases(),
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
      </div>

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
