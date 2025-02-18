import { StyleSheet } from 'react-native'
import { Box } from '@/components/ui/Box'
import { Input } from '@/components/ui/Input'
import { Button } from '@/components/ui/Button'
import { FormFields } from '@/hooks/use-form'

interface OnboardingFormProps {
  fields: FormFields<'name' | 'email'>
  onChange: (name: 'name' | 'email', value: string) => void
  onBlur: (name: 'name' | 'email') => void
  onSubmit: () => void
}

export function OnboardingForm({
  fields,
  onChange,
  onBlur,
  onSubmit,
}: OnboardingFormProps) {
  return (
    <Box style={styles.form}>
      <Input
        label="Name"
        required
        value={fields.name.value}
        onChangeText={value => onChange('name', value)}
        onBlur={() => onBlur('name')}
        placeholder="Enter your name"
        autoCapitalize="words"
        autoCorrect={false}
        error={fields.name.touched ? fields.name.error : undefined}
      />

      <Input
        label="Email"
        required
        value={fields.email.value}
        onChangeText={value => onChange('email', value)}
        onBlur={() => onBlur('email')}
        placeholder="Enter your email"
        keyboardType="email-address"
        autoCapitalize="none"
        autoCorrect={false}
        error={fields.email.touched ? fields.email.error : undefined}
      />

      <Button title="Next" onPress={onSubmit} style={{ marginTop: 16 }} />
    </Box>
  )
}

const styles = StyleSheet.create({
  form: {
    padding: 16,
  },
})
