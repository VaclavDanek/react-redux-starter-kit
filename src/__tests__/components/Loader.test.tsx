import renderer from 'react-test-renderer'
import { store } from '../../main'
import { generalActions } from '../../redux/generalRedux'

// components
import { Loader } from '../../components'

describe('Loader', () => {
  it('should render null when is not fetching', () => {
    const tree = renderer.create(<Loader active={store.getState().general.fetching > 0} />).toJSON();
    expect(tree).toBeNull();
  });

  it('should render Loader while fetching', () => {
    store.dispatch(generalActions.onStartFetching());
    const tree = renderer.create(<Loader active={store.getState().general.fetching > 0} />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});