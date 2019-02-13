// @flow

export const error = (
  name: string,
  {
    errors,
    touched,
  }: { errors: { [string]: ?string }, touched: { [string]: boolean } },
) => touched[name] && errors[name]
export const isValid = (
  name: string,
  form: { errors: { [string]: ?string }, touched: { [string]: boolean } },
) => !!error(name, form)
export const errorOutline = (
  name: string,
  form: { errors: { [string]: ?string }, touched: { [string]: boolean } },
) => (isValid(name, form) ? 'error' : undefined)
