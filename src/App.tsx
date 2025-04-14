import { Component } from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons'
import { withTranslation } from 'react-i18next'
import * as config from './config'

// pages
import { HomePage } from './pages'

// components
import { Loader, Modals } from './components'

// redux
import { generalActions } from './redux/generalRedux'

// types
import type { ElementType } from 'react'
import type { WithTranslation } from 'react-i18next'
import type { State } from './store/reducers'
import type { CustomErrorEvent } from './types/errorTypes'
import type { ModalKey } from './components/Modals'

// styles
import 'bootstrap/scss/bootstrap.scss'
import './styles/main.scss'

type AppContainerProps = Readonly<WithTranslation & ReturnType<typeof mapStateToProps> & typeof mapDispatchToProps>

interface AppContainerState {
  hasError?: boolean;
}

class AppContainer extends Component<AppContainerProps, AppContainerState> {
  state: AppContainerState = {}

  constructor(props: AppContainerProps) {
    super(props)
    window.addEventListener('error', this.handleOnError)
  }

  static getDerivedStateFromProps(
    nextProps: AppContainerProps, 
    prevState: AppContainerState, // eslint-disable-line @typescript-eslint/no-unused-vars
  ): Partial<AppContainerState> | null {
    return null
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  static getDerivedStateFromError(error: Error): Partial<AppContainerState> {
    return { hasError: true }
  }

  componentDidMount(): void {}

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
    const errorEvent: CustomErrorEvent = {
      message: error.message,
      stack: errorInfo.componentStack,
    }
    this.handleOnError(errorEvent)
  }

  componentWillUnmount(): void {
    window.removeEventListener('error', this.handleOnError)
  }

  handleOnError = (errorEvent?: ErrorEvent | CustomErrorEvent): void => {
    const { addAlert, onActionFailure, onStopFetching, t } = this.props
    
    onStopFetching() // just for sure...
    if (errorEvent && !config.ignoredErrorEventMessages.includes(errorEvent.message)) {
      onActionFailure(errorEvent)
      if (process.env.NODE_ENV === 'production' && config.showErrorAlert) {
        addAlert({ message: t('alerts.onGlobalError') as string, type: 'warning' })
      }
    }
  }

  handleCloseAlert = (index: number): void => {
    this.props.removeAlert(index)
  }

  handleToggleModal = (key: ModalKey, show?: boolean): void => {
    this.props.toggleModal(key, show)
  }

  render(): JSX.Element {
    const { handleCloseAlert, handleToggleModal } = this
    const { alerts, fetching, modals } = this.props

    return <>
      <BrowserRouter basename={process.env.NODE_ENV === 'production' ? config.basename : undefined}>
        <Routes>
          <Route
            path='/'
            element={<HomePage />}
          />
          <Route 
            path='*' 
            element={
              <h1 className='text-center text-primary mt-5'>
                404 <FontAwesomeIcon icon={faExclamationTriangle} color='orange' />
              </h1>
            } 
          />
        </Routes>
      </BrowserRouter>
      <Modals
        alerts={alerts}
        modals={modals}
        onCloseAlert={handleCloseAlert}
        onToggleModal={handleToggleModal}
      />
      <Loader active={fetching > 0} />
    </>
  }
}

const mapStateToProps = (state: State) => ({
  ...state.general,
  authorization: state.auth.authorization,
})

const mapDispatchToProps = {
  addAlert: generalActions.addAlert,
  onActionFailure: generalActions.onActionFailure,
  onStopFetching: generalActions.onStopFetching,
  removeAlert: generalActions.removeAlert,
  toggleModal: generalActions.toggleModal,
}

export default compose<ElementType>(
  withTranslation(),
  connect(mapStateToProps, mapDispatchToProps),
)(AppContainer)
