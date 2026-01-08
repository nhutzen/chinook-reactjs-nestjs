import { useEffect, useState } from "react";
import { message, Card, Typography, Button } from "antd";
import AlbumTable from "./components/AlbumTable"; // Import component bạn vừa viết
import albumApi from "../../api/albumApi"; // Giả định bạn đã có file này

const { Title } = Typography;

const AlbumPage = () => {
  const [albums, setAlbums] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchAlbums = async () => {
    setLoading(true);
    try {
      const response = await albumApi.getAll();
      console.log("Mẫu 1 phần tử:", response.data[0]);
      setAlbums(response.data);
    } catch (error) {
      message.error("Không thể tải danh sách album!");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAlbums();
  }, []);


  return (
    <Card>
        <Title level={2}>Album Management</Title>
        <AlbumTable data={albums} loading={loading} />
    </Card>
  )
};

export default AlbumPage;
