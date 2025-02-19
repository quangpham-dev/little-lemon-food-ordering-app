const EMAIL_REGEX =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
const NAME_REGEX = /^[a-zA-Z]+$/

export const validateEmail = (email: string): boolean => {
  if (!email) return false
  return EMAIL_REGEX.test(email.toLowerCase())
}

export const validateName = (name: string): boolean => {
  if (!name) return false
  return NAME_REGEX.test(name)
}

export const validateRequired = (value: string): boolean => {
  return Boolean(value?.trim())
}
