import { IForm } from '@/components/el-form'

const itemStyle = {
  padding: '10px 10px',
  width: '100%',
  boxSizing: 'border-box'
}
const colLayout = {
  span: 8
}
const labelWidth = '100px'
export const SearchFromConfig: IForm = {
  labelWidth: labelWidth,
  itemStyle: itemStyle,
  colLayout: colLayout,
  formItems: [
    {
      field: 'name',
      label: '用户名',
      type: 'input',
      placeholder: '请输入用户名'
    },
    {
      field: 'realname',
      label: '真实姓名',
      type: 'input',
      placeholder: '请输入真实姓名'
    },
    {
      field: 'cellphone',
      label: '电话号码',
      type: 'input',
      placeholder: '请输入电话号码'
    },
    {
      field: 'enable',
      label: '用户状态',
      type: 'select',
      placeholder: '请选择用户状态',
      options: [
        {
          title: '启用',
          value: '1'
        },
        {
          title: '禁用',
          value: '0'
        }
      ]
    },
    {
      field: 'createAt ',
      label: '创建时间',
      type: 'datepicker',
      otherOptions: {
        startPlaceholder: '起始时间',
        endPlaceholder: '结束时间',
        type: 'daterange'
      }
    }
  ]
}
