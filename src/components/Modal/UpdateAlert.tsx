import i18n from 'i18next'
import { Alert, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons'

interface UpdateAlertProps {
  className?: string;
  show: boolean;
  onClose: () => void;
}

const UpdateAlert = (props: Readonly<UpdateAlertProps>): JSX.Element => {
  const handleOnClose = (): void => {
    props.onClose()
  }

  const { className, show } = props
  return (
    <Modal className={className} isOpen={show} toggle={handleOnClose}>
      <ModalHeader>
        <FontAwesomeIcon icon={faExclamationTriangle} /> {i18n.t('general.labels.warning')}
      </ModalHeader>
      <ModalBody>
        <Alert className='mb-0' color='info'>{i18n.t('alerts.update')}</Alert>
      </ModalBody>
      <ModalFooter>
        <button 
          className='btn btn-primary btn-lg' 
          onClick={handleOnClose} 
          type='button'
        >{i18n.t('general.labels.reloadNewVersion')}</button>
      </ModalFooter>
    </Modal>
  )
}

export default UpdateAlert
