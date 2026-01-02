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
      key: "about",
      label: <Link to="/about">About</Link>,
    },
    {
        key: "google",
        label: (<a href="https://www.google.com" target="_blank" rel="noopener noreferrer">Google</a>)
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
