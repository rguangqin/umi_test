import { Layout } from 'antd';
import moment from 'moment';
import 'moment/locale/zh-cn';
import { useLocation } from 'umi';
// import './menu.less';

moment.locale('zh-cn');

const { Content } = Layout;
export default () => {
  const location = useLocation();

  return (
    <>
      主页面
      <Content>{location.pathname}</Content>
    </>
  );
};
