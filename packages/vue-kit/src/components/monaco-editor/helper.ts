export const MonacoEditorProps = {
  theme: {
    type: String,
    default: 'vs-dark',
    validator: (value: string) => ['vs', 'vs-dark', 'hc-black'].includes(value),
  },
  minimapEnabled: {
    type: Boolean,
    default: true,
  },
  language: {
    type: String,
    default: 'javascript',
  },
  modelValue: {
    type: String,
    default: '',
  },
}
