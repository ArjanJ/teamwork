import { useCallback } from 'react';
import { useDispatch, useMappedState } from 'redux-react-hook';

import { setActiveSpace, setSpaces } from './actions';
import { SpacesState } from './reducer';
import { ActiveSpace, Spaces } from './types';

interface UseSpaces extends SpacesState {
  setActiveSpace(activeSpace: ActiveSpace): void;
  setSpaces(spaces: Spaces): void;
}

export const useSpaces = () => {
  const dispatch = useDispatch();

  const mapState = useCallback(state => state.auth, []);
  const { spaces } = useMappedState(mapState);

  const api: UseSpaces = {
    ...spaces,
    setActiveSpace: activeSpace => dispatch(setActiveSpace(activeSpace)),
    setSpaces: spaces => dispatch(setSpaces(spaces)),
  };

  return api;
};
