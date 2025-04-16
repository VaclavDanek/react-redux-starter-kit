import i18n from 'i18next'
import { Alert, Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons'

// types
import type { ModalType } from '../../types'
import type { FC } from 'react'
interface AuthExpireAlertProps extends ModalType {
  className?: string;
}

const AuthExpireAlert: FC<AuthExpireAlertProps> = (props: Readonly<AuthExpireAlertProps>): JSX.Element => {
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
        <Alert className='mb-0' color='info'>{i18n.t('alerts.authExpire')}</Alert>
      </ModalBody>
      <ModalFooter>
        <button 
          className='btn btn-primary btn-lg' 
          onClick={handleOnClose} 
          type='button'
        >{i18n.t('general.labels.close')}</button>
      </ModalFooter>
    </Modal>
  )
}

export default AuthExpireAlert
