const VERSION = '0.0.1'
function initFormValue(schema) {
  return schema.reduce((acc, cur) => {
    switch (cur.type) {
      case 'input': {
        Reflect.set(acc, cur.name, '')
        break
      }
    }
    return acc
  }, {})
}
const baseComponentMap = {
  input: 'a-input',
  'input-number': 'a-input-number',
  radio: 'a-radio',
  select: 'a-select',
  checkbox: 'a-checkbox',
}
function mapComponentBySchemaComponentName(schemaComponentName) {
  if (
    Object.prototype.hasOwnProperty.call(baseComponentMap, schemaComponentName)
  ) {
    return Reflect.get(baseComponentMap, schemaComponentName)
  }
  return 'Fragment'
}
export { VERSION, initFormValue, mapComponentBySchemaComponentName }
