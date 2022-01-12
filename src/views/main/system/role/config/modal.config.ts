import { IForm } from '@/components/el-form/type'

export const modalConfig: IForm = {
  formItems: [
    {
      field: 'name',
      label: '角色名',
      type: 'input',
      placeholder: '请输入角色名'
    },
    {
      field: 'intro',
      label: '描述',
      type: 'input',
      placeholder: '请输入角色描述'
    }
  ],
  colLayout: {
    span: 24
  },
  labelWidth: '80px',
  itemStyle: {
    padding: '10px 10px'
  }
}
