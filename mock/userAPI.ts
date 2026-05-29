const users = [{ id: 0, name: 'Umi', nickName: 'U', gender: 'MALE' }];

export default {
  'GET /api/v1/queryUserList': (req: any, res: any) => {
    res.json({
      success: true,
      data: { list: users },
      errorCode: 0,
    });
  },
  'PUT /api/v1/user/': (req: any, res: any) => {
    res.json({
      success: true,
      errorCode: 0,
    });
  },
  'GET /api/v1/menuList/': (req: any, res: any) => {
    res.json({
      success: true,
      errorCode: 0,
      code: 200,
      data: [
        {
          name: '组织架构',
          type: 'C',
          id: 1,
          path: '/organization', // ✅ 补充：目录对应的基础路径
          icon: 'TeamOutlined', // ✅ 补充：菜单图标
          sort: 1, // ✅ 补充：排序序号
          visible: true, // ✅ 补充：是否显示（软删除/启用禁用）
          children: [
            {
              id: 11,
              parentId: 1,
              name: '菜单管理',
              type: 'M',
              component: '/organization/deptManage',
              path: '/organization/menuManage', // ✅ 补充：路由路径
              icon: 'MenuOutlined', // ✅ 补充：菜单图标
              sort: 1, // ✅ 补充：排序
              children: [
                {
                  id: 1,
                  name: '增加',
                  permissKey: 'organization:add',
                  type: 'B',
                },
                {
                  id: 2,
                  name: '查看',
                  permissKey: 'organization:view',
                  type: 'B',
                },
              ],
            },
          ],
        },
      ],
    });
  },
  'POST /api/v1/login': (req: any, res: any) => {
    res.json({
      success: true,
      data: {
        user: {
          userId: '153',
          userName: 'frontAdmin',
          userCode: '100100',
        },
        token:
          'eyJhbGciOiJIUzUxMiJ9.eyJ1c2VyaWQiOjE1MywibG9naW5fdXNlcl9rZXkiOiIwNmEzMjc0ZS1hMTQxLTRlOWMtYTFlZS05MGE4OGFkMzI5ZTUifQ.x2EzBNinwc_hUSWW5SBMeEsfOsQti4SSY_cmyTlCPdugRUfkiTdxoRwHv8mN28DiXYEiNZqw84Uta0IWtmPFEw',
      },
      errorCode: 0,
      code: 200,
    });
  },
};
