import { ref } from 'vue'
import PageContent from '../components/page-content'

export function usePageContent() {
  const contentRef = ref<InstanceType<typeof PageContent>>()

  const handleQuery = (formData: any = {}) => {
    console.log(formData)
    contentRef.value?.getDataList(formData)
  }

  const handleReset = () => {
    contentRef.value?.getDataList()
  }
  return [contentRef, handleQuery, handleReset]
}
