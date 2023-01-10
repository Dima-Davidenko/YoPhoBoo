import { useDispatch } from 'react-redux';
import { store } from '../store';

export const useTypedDispatch: () => typeof store.dispatch = useDispatch;
