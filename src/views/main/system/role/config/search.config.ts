import { IForm } from '@/components/el-form'

export const SearchFromConfig: IForm = {
  labelWidth: '100px',
  itemStyle: {
    padding: '10px 10px',
    width: '100%',
    boxSizing: 'border-box'
  },
  formItems: [
    {
      field: 'name',
      label: '角色名称',
      type: 'input',
      placeholder: '请输入角色名称'
    },
    {
      field: 'intro',
      label: '权限介绍',
      type: 'input',
      placeholder: '请输入权限介绍'
    },

    {
      field: 'createTime',
      label: '创建时间',
      type: 'datepicker',
      otherOptions: {
        startPlaceholder: '起始时间',
        endPlaceholder: '结束时间',
        type: 'datetimerange'
      }
    }
  ]
}
