import { FC } from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faDoorOpen } from '@fortawesome/free-solid-svg-icons'
import { withReducers } from '../utils'

// redux
import { userRedux } from '../redux'

// types
import type { ElementType } from 'react'
import type { StaticState, AsyncReducers, AsyncState } from '../store/reducers'

type HomePageProps = Readonly<ReturnType<typeof mapStateToProps> & typeof mapDispatchToProps>

const HomePage: FC<HomePageProps> = (props: Readonly<HomePageProps>): JSX.Element => {
  return (
    <div className='mt-5'>
      <h1 className='text-center text-primary'><FontAwesomeIcon icon={faDoorOpen} /> Hello World!</h1>
    </div>
  )
}

const asyncReducers = { 
  user: userRedux.userReducer,
} satisfies Partial<AsyncReducers>

const mapStateToProps = (state: StaticState & AsyncState<typeof asyncReducers>) => ({
  user: state.user,
})

const mapDispatchToProps = {
  setUserDataValue: userRedux.userActions.setUserDataValue,
  setUserData: userRedux.userActions.setUserData,
}

export default compose<ElementType>(
  withReducers(asyncReducers),
  connect(mapStateToProps, mapDispatchToProps),
)(HomePage)
