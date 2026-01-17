import { Form, Input, Layout, Button, Typography, message } from "antd";
import authApi from "../../api/authApi";
import {useNavigate} from "react-router-dom"
const { Title } = Typography;
const LoginPage = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const handleLogin = async (values) => {
  try {
    const response = await authApi.login(values);
    console.log("Dữ liệu thô:", response);

    const token = response.access_token || response.data?.access_token;

    if (token && typeof token === 'string') {
      localStorage.setItem('access_token', token); // Lưu chuỗi này vào
      message.success("Đăng nhập thành công!");
      navigate("/artists");
      
    } else {
      console.error("Token không phải là chuỗi:", token);
      message.error("Lỗi định dạng Token!");
    }
  } catch (error) {
    console.error("Lỗi:", error);
  }
};
  return (
    <>
      <Layout style={{ padding: 50 }}>
        <Title level={2} style={{ textAlign: "center", fontFamily: "Arial" }}>
          Login Page
        </Title>
        <Form form={form} layout="vertical" onFinish={handleLogin}>
          <Form.Item
            name="username"
            label="Username"
            rules={[{ required: true, message: "Vui lòng nhập username!" }]}
          >
            <Input placeholder="Enter username"></Input>
          </Form.Item>

          <Form.Item
            name="password"
            label="Password"
            rules={[{ required: true, message: "Vui lòng nhập mật khẩu!" }]}
          >
            <Input placeholder="Enter password" type="password"></Input>
          </Form.Item>

          <Form.Item style={{ textAlign: "center" }}>
            <Button type="primary" htmlType="submit">
              Login
            </Button>
          </Form.Item>
        </Form>
      </Layout>
    </>
  );
};

export default LoginPage;
