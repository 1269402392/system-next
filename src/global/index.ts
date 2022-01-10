import { App } from 'vue'
import { ElButton } from 'element-plus'

const components = [ElButton]

export function registerApp(app: App): void {
  for (const cpn of components) {
    app.component(cpn.name, cpn)
  }
}
