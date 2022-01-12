import lyRequest from '@/network'
import { IDataType } from '@/network/type'

export function getPageListData(url: string, queryInfo: any, showLoading?: boolean) {
  return lyRequest.post<IDataType>({
    url: url,
    data: queryInfo,
    showLoading: showLoading || false
  })
}
export function deletePageData(url: string) {
  return lyRequest.delete<IDataType>({
    url: url
  })
}

export function addPageData(url: string, newData: any) {
  return lyRequest.post<IDataType>({
    url: url,
    data: newData,
    showLoading: false
  })
}

export function editPageData(url: string, editData: any) {
  return lyRequest.patch<IDataType>({
    url: url,
    data: editData,
    showLoading: false
  })
}
