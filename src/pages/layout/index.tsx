import avator from '@/assets/user.png';
import { EditOutlined, LogoutOutlined } from '@ant-design/icons';
import { Dropdown, Image, Layout, Menu, MenuProps } from 'antd';
import 'moment/locale/zh-cn';
import { useEffect, useState } from 'react';
import { Outlet } from 'umi';
import styles from './index.less';
const { Header, Sider, Content } = Layout;

export default () => {
  const { user } = JSON.parse(localStorage.getItem('userInfo') || '');
  const [menu, setMenu] = useState<API.MenuListSiderItemType[]>([]);
  const handleLoginOut = () => {
    console.log('退出登录');
  };
  const handleUpdatePassword = () => {
    console.log('修改密码');
  };
  // 采用antd的layout实现页面的框架布局
  /*
  1、左上角的标题
  2、左边的菜单栏，可只是收缩
  3、右边的NAV，展示登录的账户的信息
  4、内容部分，根据路由展示的页面信息
  */
  /*
 1、head的title可以使用Helmet
 2、head的图标再config.ts或者.umirc.ts配置
 */

  /*返回的菜单部分，做成权限结构
 1、首先是结构
 2、一级菜单下面是二级菜单，添加二级菜单的时候，可以添加二级菜单下面的按钮权限
 */
  /*
C:表示目录
M:表示菜单
 */

  const handleMenuData = (menuList: API.MenuListItemType[]) => {
    const menu: API.MenuListSiderItemType[] = menuList
      .map((item) => {
        if (item.type === 'C') {
          return {
            key: item.path,
            icon: item.icon,
            label: item.name,
            children: item.children ? handleMenuData(item.children) : [],
          };
        }
        if (item.type === 'M') {
          return {
            key: item.path,
            icon: item.icon,
            label: item.name,
          };
        }
        return null;
      })
      .filter((item): item is API.MenuListSiderItemType => item !== null);
    return menu;
  };
  useEffect(() => {
    const menuList = JSON.parse(localStorage.getItem('menuList') || '[]');
    console.log(menuList);
    const menu = handleMenuData(menuList);
    setMenu(menu);
  }, []);
  const items: MenuProps['items'] = [
    {
      key: '1',
      label: <a onClick={handleUpdatePassword}>修改密码</a>,
      icon: <EditOutlined />,
    },
    {
      key: '2',
      label: <a onClick={handleLoginOut}>退出登录</a>,
      icon: <LogoutOutlined />,
    },
  ];
  return (
    <Layout className={styles.layout}>
      <Sider className={styles.sider}>
        <Menu
          items={menu as MenuProps['items']}
          mode="inline"
          // theme="dark"
        />
      </Sider>
      <Layout>
        <Header className={styles.header}>
          <div className={styles.userInfo}>
            <Image className={styles.avator} src={avator} preview={false} />
            <Dropdown menu={{ items }}>
              <div className={styles.userName}>{user.userName}</div>
            </Dropdown>
          </div>
        </Header>
        <Content>
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};
