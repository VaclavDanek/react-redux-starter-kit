import i18n from 'i18next'
import { Component } from 'react'
import { Alert, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faInfo } from '@fortawesome/free-solid-svg-icons'

// components
import { AuthExpireAlert, UpdateAlert } from './Modal'

// types
import type { ImmutableArray } from 'seamless-immutable'
import type { ObjectType, Alert as AlertType } from '../types'

export type ModalKey = 'authExpireAlert' | 'updateAlert'

interface ModalsProps {
  alerts?: ImmutableArray<AlertType>;
  modals?: Partial<Record<ModalKey, boolean>>;
  modalProps?: Partial<Record<ModalKey, ObjectType>>;
  onCloseAlert?: (index: number) => void;
  onToggleModal?: (key: ModalKey) => void;
}

export default class Modals extends Component<Readonly<ModalsProps>> {
  handleToggleModal = (key: ModalKey): void => {
    this.props.onToggleModal?.(key)
  }

  handleOnCloseAlert = (index: number): void => {
    this.props.onCloseAlert?.(index)
  }

  render(): JSX.Element {
    const { alerts = [], modals = {}, modalProps = {} } = this.props
    return <>
      <UpdateAlert
        show={!!modals.updateAlert}
        onClose={() => { window.location.reload() }}
        {...modalProps.updateAlert}
      />
      <AuthExpireAlert
        show={!!modals.authExpireAlert}
        onClose={() => { this.handleToggleModal('authExpireAlert') }}
        {...modalProps.authExpireAlert}
      />
      <>
        {alerts.map((alert: AlertType, index: number) => (
          <Modal key={`modal-alert-${alert.message}`} isOpen toggle={() => { this.handleOnCloseAlert(index) }}>
            <ModalHeader>
              <FontAwesomeIcon icon={faInfo} /> {i18n.t('general.labels.warning')}
            </ModalHeader>
            <ModalBody>
              <Alert className='mb-0' color={alert.type}>{alert.message}</Alert>
            </ModalBody>
            <ModalFooter>
              <button
                className='btn btn-primary btn-lg'
                onClick={() => { this.handleOnCloseAlert(index) }}
                type='button'
              >{i18n.t('general.labels.close')}</button>
            </ModalFooter>
          </Modal>
        ))}
      </>
    </>
  }
}
