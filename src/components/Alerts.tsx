import i18n from 'i18next'
import { Alert, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faInfo } from '@fortawesome/free-solid-svg-icons'

// types
import type { ImmutableArray } from 'seamless-immutable'
import type { Alert as AlertType } from '../types'
import type { FC } from 'react'

interface AlertsProps {
  alerts: ImmutableArray<AlertType>;
  onCloseAlert?: (index: number) => void;
}

const Alerts: FC<AlertsProps> = (props: Readonly<AlertsProps>): JSX.Element => {
  const handleOnCloseAlert = (index: number): void => {
    props.onCloseAlert?.(index)
  }

  return <>
    {props.alerts.map((alert: AlertType, index: number) => (
      <Modal key={`modal-alert-${alert.message}`} isOpen toggle={() => { handleOnCloseAlert(index) }}>
        <ModalHeader>
          <FontAwesomeIcon icon={faInfo} /> {i18n.t('general.labels.warning')}
        </ModalHeader>
        <ModalBody>
          <Alert className='mb-0' color={alert.type}>{alert.message}</Alert>
        </ModalBody>
        <ModalFooter>
          <button
            className='btn btn-primary btn-lg'
            onClick={() => { handleOnCloseAlert(index) }}
            type='button'
          >{i18n.t('general.labels.close')}</button>
        </ModalFooter>
      </Modal>
    ))}
  </>
}

export default Alerts
