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
      field: 'password',
      label: '密码',
      type: 'password',
      placeholder: '请输入密码'
    },
    {
      field: 'sport',
      label: '运动',
      type: 'select',
      placeholder: '请选择',
      options: [
        {
          title: '篮球',
          value: 'basketball'
        },
        {
          title: '足球',
          value: 'football'
        }
      ]
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
