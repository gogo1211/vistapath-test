import PropTypes from 'prop-types'

export default function Modal({ title, children, open, onClose }) {
  return (
    <div className={`modal${open ? ' is-active' : ''}`}>
      <div className="modal-background" onClick={onClose}></div>
      <div className="modal-card">
        <header className="modal-card-head">
          <p className="modal-card-title">{title}</p>
          <button
            className="delete"
            aria-label="close"
            onClick={onClose}
          ></button>
        </header>
        <section className="modal-card-body">{children}</section>
      </div>
    </div>
  )
}

Modal.propTypes = {
  title: PropTypes.string,
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  children: PropTypes.node
}

Modal.defaultProps = {
  title: ''
}
