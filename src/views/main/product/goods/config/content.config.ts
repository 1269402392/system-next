export const TableContentConfig = {
  title: '商品列表',
  showSelectColumn: true,
  showIndexColumn: true,
  propList: [
    { prop: 'name', label: '商品名称', minWidth: '60' },
    { prop: 'oldPrice', label: '旧价格', minWidth: '60' },
    { prop: 'newPrice', label: '新价格', minWidth: '60' },
    { prop: 'status', label: '状态', minWidth: '60', slotName: 'enable' },
    { prop: 'imgUrl', label: '状态', minWidth: '60', slotName: 'imgUrl' },
    {
      prop: 'createAt',
      label: '创建时间',
      minWidth: '100',
      slotName: 'createAt'
    },
    {
      prop: 'updateAt',
      label: '更新时间',
      minWidth: '100',
      slotName: 'updateAt'
    },
    {
      label: '操作',
      minWidth: '90',
      slotName: 'handler'
    }
  ]
}
