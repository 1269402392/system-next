export const TableContentConfig = {
  title: '菜单列表',
  showSelectColumn: false,
  showIndexColumn: false,
  propList: [
    { prop: 'name', label: '菜单名称', minWidth: '60' },
    { prop: 'type', label: '层级', minWidth: '60' },
    { prop: 'permission', label: '按钮', minWidth: '60' },
    {
      prop: 'url',
      label: '路径',
      minWidth: '100'
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
  ],
  treeProps: {
    rowKey: 'id',
    treeProps: { children: 'children' }
  },
  showFooter: false
}
