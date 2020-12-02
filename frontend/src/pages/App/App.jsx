import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'

import Grid from '../../components/Grid'
import Modal from '../../components/Modal'
import CaseForm from '../../components/CaseForm'
import FilterPanel from '../../components/FilterPanel'
import StatusTag from '../../components/StatusTag'

import { createCase, fetchCases, updateCase } from '../../utils/api'
import { CASE_STATUS, OPEN_MODE } from '../../utils/constants'
import './style.css'

export default function App() {
  const [loading, setLoading] = useState(false)
  const [cases, setCases] = useState([])
  const [filter, setFilter] = useState({
    name: '',
    status: 'all'
  })
  const [openForm, setOpenForm] = useState({})

  useEffect(() => {
    setLoading(true)
    fetchCases()
      .then((res) => {
        setCases(res)
        toast.success(`Cases are loaded!`)
      })
      .catch(() => {
        toast.error('Case loading is failed!')
      })
      .finally(() => setLoading(false))
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
          toast.success(`New case [${res.name}] is created!`)
          setCases([...cases, res])
        })
        .catch(() => {
          toast.error('Creating a new case is failed!')
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
          toast.success(`Case [${res.name}] is updated!`)
        })
        .catch(() => {
          toast.error('Updating a case is failed!')
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
      <div className="case-action">
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
          loading={loading}
          data={{
            header: [
              { label: 'ID', key: 'id' },
              { label: 'Name', key: 'name' },
              { label: 'Note', key: 'note' },
              {
                label: '# of Images',
                align: 'right',
                renderer: (row) => row.images.length
              },
              {
                label: 'Created At',
                align: 'right',
                renderer: (row) =>
                  new Date(row.createdAt).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: '2-digit',
                    day: '2-digit'
                  })
              },
              {
                label: 'Status',
                align: 'right',
                renderer: (row) => <StatusTag status={row.status} />
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
          mode={openForm.mode}
          data={openForm.case}
          onSubmit={handleSubmit}
          onCancel={() => setOpenForm({})}
        />
      </Modal>
    </div>
  )
}
