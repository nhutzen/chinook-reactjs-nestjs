import { useEffect, useState } from "react";
import { message, Card, Typography, Button } from "antd";
import ArtistTable from "./components/ArtistTable"; // Import component bạn vừa viết
import artistApi from "../../api/artistApi"; // Giả định bạn đã có file này
import SaveModel from "./components/SaveModel";

const { Title } = Typography;

const ArtistPage = () => {
  const [artists, setArtists] = useState([]);
  const [loading, setLoading] = useState(false);

  const [editingArtist, setEditingArtist] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const fetchArtists = async () => {
    setLoading(true);
    try {
      const response = await artistApi.getAll(); // Gọi qua axiosClient
      console.log("Mẫu 1 phần tử:", response.data[0]);
      setArtists(response.data);
      // eslint-disable-next-line no-unused-vars
    } catch (error) {
      message.error("Không thể tải danh sách nghệ sĩ!");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchArtists();
  }, []);

  const handleDelete = async (id) => {
    try {
      await artistApi.delete(id);
      message.success("Xóa nghệ sĩ thành công");
      fetchArtists();
    } catch (error) {
      message.error("Xóa thất bại!" + error.message);
    }
  };

  const handleSave = async (values) => {
    try {
      if (editingArtist) {
        const id = editingArtist.ArtistId || editingArtist.artistId;

        if (!id) {
          message.error("Không tìm thấy ID nghệ sĩ!");
          return;
        }
        
        await artistApi.update(id, values);

        message.success("Cập nhật nghệ sĩ thành công");
      } else {
        await artistApi.create(values);
        message.success("Thêm nghệ sĩ thành công");
      }
      setIsModalVisible(false);
      fetchArtists(); // Tải lại danh sách sau khi thêm/sửa
    } catch (error) {
      message.error("Lưu nghệ sĩ thất bại!" + error.message);
    }
  };

  const showModel = (artist = null) => {
    setEditingArtist(artist);
    setIsModalVisible(true);
  };

  return (
    <Card style={{ width: "100%", marginTop: 20 }}>
      <Title level={2}>Quản lý Nghệ sĩ (Chinook)</Title>
      <Button
        style={{ margin: "10px 0" }}
        type="primary"
        onClick={() => showModel(null)}
      >
        Add Artist
      </Button>
      <ArtistTable
        data={artists}
        loading={loading}
        onEdit={(record) => showModel(record)}
        editingArtist={editingArtist}
        onDelete={handleDelete}
      />
      <SaveModel
        onSave={handleSave}
        visible={isModalVisible}
        editingArtist={editingArtist}
        onCancel={() => setIsModalVisible(false)}
      />
    </Card>
  );
};

export default ArtistPage;
