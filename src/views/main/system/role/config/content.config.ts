export const TableContentConfig = {
  title: '角色列表',
  showSelectColumn: true,
  showIndexColumn: true,
  propList: [
    { prop: 'name', label: '角色名', minWidth: '60' },
    { prop: 'intro', label: '权限介绍', minWidth: '60' },
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
