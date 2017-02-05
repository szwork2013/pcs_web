module.exports = [
  {
    key: 'sysmanage',
    name: '系统管理',
    icon: 'solution',
    child: [
      {
        key: 'sysuser',
        name: '用户管理'
      },
      {
        key: 'sysrole',
        name: '角色管理'
      },
      {
        key: 'sysmenu',
        name: '模块管理'
      }
    ]
  },
  {
    key: 'setting',
    name: '系统配置',
    icon: 'setting',
    child: [
      {
        key: 'camera_setting',
        name: '摄像机设置'
      },
      {
        key: 'preview_setting',
        name: '视频设置'
      }
    ]
  }
]
