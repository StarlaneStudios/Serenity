
/* Pick default props from props interface */
export type DefaultProps<T, U extends keyof T> = Required<Pick<T, U>>;