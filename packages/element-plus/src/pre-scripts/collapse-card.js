import { checkNoInstallDeps } from '@packages/_utils'

export default async function () {
  const deps = await checkNoInstallDeps(['@vueuse/core'])
  if (deps.length) {
    console.log(
      `\n\n🚨 Please install the following dependencies:\n\t `,
      deps.join('\t')
    )
    return true
  }

  return false
}
