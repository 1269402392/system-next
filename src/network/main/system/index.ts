import lyRequest from '@/network'
import { IDataType } from '@/network/type'

export function getPageListData(url: string, queryInfo: any, showLoading?: boolean) {
  return lyRequest.post<IDataType>({
    url: url,
    data: queryInfo,
    showLoading: showLoading || false
  })
}
