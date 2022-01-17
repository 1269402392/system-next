import { ref } from 'vue'
import PageModal from '@/components/page-modal'
type CbTypeFn = (row?: any) => void
export function usePageModal(newCbFn?: CbTypeFn, editCbFn?: CbTypeFn) {
  const pageModalRef = ref<InstanceType<typeof PageModal>>()
  const defaultInfo = ref({})
  const handleEdit = (row: any) => {
    pageModalRef.value!.dialogVisible = true
    defaultInfo.value = { ...row }
    editCbFn && editCbFn({ ...row })
  }

  const handleNew = () => {
    defaultInfo.value = {}
    pageModalRef.value!.dialogVisible = true
    newCbFn && newCbFn()
  }
  return [pageModalRef, defaultInfo, handleEdit, handleNew]
}
