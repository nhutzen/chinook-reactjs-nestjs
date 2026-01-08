import { Typography } from "antd";
const { Title, Paragraph } = Typography;

const AboutPage = () => {
  return (
    <div style={{ padding: '24px', maxWidth: '800px', margin: '0 auto' }}>
      <Title level={2}>About Us</Title>
      <Paragraph>
        This is the About page of our application.
      </Paragraph>
    </div>
  );
};
export default AboutPage;