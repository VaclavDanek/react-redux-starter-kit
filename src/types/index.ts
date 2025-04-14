export type ObjectType = Record<string, any>
export type ValuesType = Record<string, string | number>
export interface Alert { 
  type: 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info' | 'light' | 'dark'; 
  message: string; 
}