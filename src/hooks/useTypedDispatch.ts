import { useDispatch } from 'react-redux';
import { store } from '../redux/store';

export const useTypedDispatch: () => typeof store.dispatch = useDispatch;
