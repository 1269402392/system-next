import { App } from 'vue'
import { formatUtcString } from '@/utils/date-format'

export function regiterProperties(app: App): void {
  app.config.globalProperties.$filter = {
    formatTime(value: string) {
      return formatUtcString(value, 'YYYY-MM-DD')
    }
  }
}
