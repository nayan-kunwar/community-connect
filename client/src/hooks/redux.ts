import { AppDispatch, RootState } from '@/lib/store';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';

/**
 * Type-safe version of useDispatch hook
 */
export const useAppDispatch = () => useDispatch<AppDispatch>();

/**
 * Type-safe version of useSelector hook
 */
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;