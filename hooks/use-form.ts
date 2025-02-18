import { useState, useCallback, useMemo } from 'react'

export interface FormField {
  value: string
  error?: string
  touched?: boolean
}

export type FormFields<T extends string> = Record<T, FormField>

interface UseFormProps<T extends string> {
  initialValues: Record<T, string>
  validate?: (name: T, value: string) => string | undefined
}

export function useForm<T extends string>({
  initialValues,
  validate,
}: UseFormProps<T>) {
  const [fields, setFields] = useState<FormFields<T>>(() =>
    Object.keys(initialValues).reduce(
      (acc, key) => ({
        ...acc,
        [key]: {
          value: initialValues[key as T],
          touched: false,
        },
      }),
      {} as FormFields<T>,
    ),
  )

  const handleChange = useCallback(
    (name: T, value: string) => {
      setFields(prev => {
        const updatedField: FormField = {
          value,
          touched: true,
          error: validate?.(name, value),
        }

        return {
          ...prev,
          [name]: updatedField,
        }
      })
    },
    [validate],
  )

  const handleBlur = useCallback(
    (name: T) => {
      setFields(prev => {
        const currentField = prev[name]
        const updatedField: FormField = {
          ...currentField,
          touched: true,
          error: validate?.(name, currentField.value),
        }

        return {
          ...prev,
          [name]: updatedField,
        }
      })
    },
    [validate],
  )

  const setAllTouched = useCallback(() => {
    setFields(prev => {
      const updatedFields: FormFields<T> = {} as FormFields<T>

      ;(Object.keys(prev) as T[]).forEach(key => {
        const currentField = prev[key]
        updatedFields[key] = {
          value: currentField.value,
          touched: true,
          error: validate?.(key, currentField.value),
        }
      })

      return updatedFields
    })
  }, [validate])

  const isValid = useCallback(() => {
    return (Object.keys(fields) as T[]).every(key => {
      const field = fields[key]
      const error = validate?.(key, field.value)
      return !error
    })
  }, [fields, validate])

  const getValues = useCallback(() => {
    return (Object.keys(fields) as T[]).reduce(
      (acc, key) => ({
        ...acc,
        [key]: fields[key].value,
      }),
      {} as Record<T, string>,
    )
  }, [fields])

  const getFieldErrors = useMemo(() => {
    return (Object.keys(fields) as T[])
      .filter(key => fields[key].touched && fields[key].error)
      .reduce(
        (acc, key) => ({
          ...acc,
          [key]: fields[key].error,
        }),
        {} as Partial<Record<T, string>>,
      )
  }, [fields])

  return {
    fields,
    handleChange,
    handleBlur,
    setAllTouched,
    isValid,
    getValues,
    getFieldErrors,
  }
}
