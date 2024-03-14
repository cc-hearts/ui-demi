export function genSelectTemplatePrompt(
  choices: Array<{ name: string; value: string }>
) {
  return {
    type: 'list',
    message: 'select a components template',
    name: 'selectTemplate',
    choices,
  }
}

export function genComponentPrompt(
  choices: Array<{ name: string; value: string }>
) {
  return {
    type: 'list',
    message: 'select components',
    name: 'selectComponents',
    choices,
  }
}
