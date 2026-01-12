import { Input, Space } from "antd";
import { AudioOutlined, SearchOutlined } from "@ant-design/icons";
const { Search } = Input;

const SearchComponent = ({onSearch}) => {
  const suffix = <AudioOutlined style={{ fontSize: 16, color: "#1677ff" }} />;

  return (
    <Space vertical style={{ width: "100%" }} align="end">
      <Search
        placeholder="Enter keyword: "
        enterButton="Search"
        onSearch={onSearch}
        allowClear
        suffix={suffix}
        size="large"
      />
    </Space>
  );
};

export default SearchComponent;
