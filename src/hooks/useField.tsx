import { useCallback, useState } from 'react'

export const useField = ({ onBlur, touched, errorMessage }: any) => {
  const [isFocused, setIsFocused] = useState(false)

  const handleFocus = useCallback(() => {
    setIsFocused(true)
  }, [])

  const handleBlur = useCallback(
    (event: any) => {
      if (onBlur) {
        onBlur(event)
      }
      setIsFocused(false)
    },
    [onBlur]
  )
  const error = !isFocused && touched && errorMessage

  return { handleFocus, handleBlur, error }
}
