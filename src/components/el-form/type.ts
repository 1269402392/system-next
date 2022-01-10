type IFromType = 'input' | 'password' | 'select' | 'datepicker'

export interface IFromItem {
  label: string
  placeholder?: string
  type: IFromType
  rules?: any[]
  options?: IOption[]
  otherOptions?: any
  field: string
}

export interface IForm {
  formItems: IFromItem[]
  labelWidth?: string
  colLayout?: any
  itemStyle?: any
}

export interface IOption {
  title: string
  value: string
}
