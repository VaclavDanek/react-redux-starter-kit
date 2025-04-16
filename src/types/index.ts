// components
import * as ModalComponents from '../components/Modal'

export type ObjectType = Record<string, any>
export type ValuesType = Record<string, string | number>
export interface Alert { 
  type: 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info' | 'light' | 'dark'; 
  message: string; 
}

export type ModalKey = keyof typeof ModalComponents
export interface ModalType {
  show: boolean;
  onClose: () => void;
  [key: string]: any;
}