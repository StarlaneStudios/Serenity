/**
 * Pick default props from props interface
 * 
 * @deprecated use new DefaultProps + OverrideComponentProps
 */
export type DefaultProps<T, U extends keyof T> = Required<Pick<T, U>>;