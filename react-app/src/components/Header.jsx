import { Menu, Layout } from "antd";
import {Link} from "react-router-dom";
const { Header } = Layout;

const AppHeader = () => {
  const menuItems = [
    {
      key: "home",
      label: <Link to="/">Home</Link>,
    },
    {
      key: "artist",
      label: <Link to="/artists">Artist</Link>,
    },
    {
      key: "album",
      label: <Link to="/albums">Album</Link>,
    },
    {
      key: "about",
      label: <Link to="/about">About</Link>,
    },
    {
        key: "antd",
        label: (<a href="https://ant.design/components/overview/" target="_blank" rel="noopener noreferrer">Ant Design Component</a>)
    }, 
    {
      key: "login",
      label: <Link to="/login">Login</Link>,
    }
  ];

  return (
    <Header>
      <Menu
        theme="light"
        mode="horizontal"
        items={menuItems}
        defaultSelectedKeys={["home"]}
        style={{ lineHeight: '64px', flex: 1, justifyContent: 'center' }}
      ></Menu>
    </Header>
  );
};

export default AppHeader;
