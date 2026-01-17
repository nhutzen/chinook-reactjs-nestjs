import { useEffect, useState } from "react";
import { message, Card, Typography, Button, Modal } from "antd";
import AlbumTable from "./components/AlbumTable"; // Import component bạn vừa viết
import albumApi from "../../api/albumApi";
import ModalSave from "./components/ModalSave";
import SearchComponent from "../../components/Search";

const { Title } = Typography;

const AlbumPage = () => {
  const [albums, setAlbums] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingAlbum, setEditingAlbum] = useState(null);

  const fetchAlbums = async () => {
    setLoading(true);
    try {
      const response = await albumApi.getAll();
      setAlbums(response);
      // eslint-disable-next-line no-unused-vars
    } catch (error) {
      console.error("Chi tiết lỗi:", error);
      // Hiện thông báo lỗi cụ thể từ Server hoặc từ Axios
      const errorMsg =
        error.response?.data?.message || error.message || "Lỗi không xác định";
      message.error("Lỗi: " + errorMsg);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (albumId) => {
    setLoading(true);
    try {
      await albumApi.delete(albumId);
      message.success("Xóa album thành công");
      fetchAlbums();
    } catch (error) {
      message.error("Xóa thất bại!" + error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async (values) => {
    setLoading(true);
    try {
      if (editingAlbum) {
        console.log("Dữ liệu chuẩn bị gửi:", values);
        const id = editingAlbum.albumId || editingAlbum.AlbumId;

        if (!id) {
          message.error("Không tìm thấy ID album!");
          return;
        }

        await albumApi.update(id, values);
        message.success("Cập nhật album thành công");
      } else {
        await albumApi.create(values);
        message.success("Thêm album thành công");
      }
      setEditingAlbum(null);
    } catch (error) {
      message.error("Cập nhật thất bại!" + error.message);
    } finally {
      setIsModalOpen(false);
      setLoading(false);
      fetchAlbums();
    }
  };

  const showModal = (album) => {
    setIsModalOpen(true);
    setEditingAlbum(album);
  };

  useEffect(() => {
    fetchAlbums();
  }, []);

  const handleSearch = async (keyword) => {
    if (!keyword || keyword.trim() === "") {
      return fetchAlbums();
    }

    setLoading(true);
    try {
      console.log("Searching for albums with keyword:", keyword);
      const response = await albumApi.search(keyword);
      setAlbums(response.data);
    } catch (error) {
      message.error("Tìm kiếm thất bại!" + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <SearchComponent onSearch={handleSearch} />
      <Card>
        <Title level={2}>Album Management</Title>
        <AlbumTable
          data={albums}
          loading={loading}
          onEdit={(record) => showModal(record)}
          onDelete={handleDelete}
        />
        <ModalSave
          open={isModalOpen}
          onCancel={() => setIsModalOpen(false)}
          onSave={handleSave}
          editingAlbum={editingAlbum}
        />
      </Card>
    </>
  );
};

export default AlbumPage;
