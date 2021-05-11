export default [
  {
    title: 'Dashboard',
    route: 'dashboard',
    icon: 'HomeIcon',
  },
  {
    title: 'Warehouse',
    route: 'warehouse',
    icon: 'LayoutIcon',
  },
  {
    title: 'User',
    icon: 'UserIcon',
    children: [
      {
        title: 'Warehouse User',
        route: 'warehouseuser',
      },
      {
        title: 'Client User',
        route: 'clientuser',
      },
    ],
  },
  {
    title: 'SKU',
    route: 'sku',
    icon: 'PlusCircleIcon',
  },
  {
    title: 'Inbound',
    route: 'inbound',
    icon: 'ArchiveIcon',
  },
  {
    title: 'Racking',
    route: 'racking',
    icon: 'GridIcon',
  },
  {
    title: 'Order',
    route: 'order',
    icon: 'CheckCircleIcon',
  },
  {
    title: 'Picking',
    route: 'picking',
    icon: 'ShoppingCartIcon',
  },
  {
    title: 'Packing',
    route: 'packing',
    icon: 'PackageIcon',
  },
  {
    title: 'Outbound',
    route: 'outbound',
    icon: 'CheckSquareIcon',
    children: [
      {
        title: 'Check-In',
        route: 'checkin',
      },
      {
        title: 'Outbound List',
        route: 'outboundlist',
      },
    ],
  },
]
