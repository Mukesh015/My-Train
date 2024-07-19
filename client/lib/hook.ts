import { useDispatch, useSelector, useStore, TypedUseSelectorHook } from 'react-redux';
import type { RootState, AppDispatch } from './store'; // Adjust path as needed

// Define types for useDispatch, useSelector, and useStore
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export const useAppStore = () => useStore();
