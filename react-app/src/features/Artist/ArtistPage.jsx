import React, { useEffect, useState } from 'react';
import { message, Card, Typography } from 'antd';
import ArtistTable from './components/ArtistTable'; // Import component bạn vừa viết
import artistApi from '../../api/artistApi'; // Giả định bạn đã có file này

const { Title } = Typography;

const ArtistPage = () => {
    const [artists, setArtists] = useState([]);
    const [loading, setLoading] = useState(false);

    // 1. Hàm lấy danh sách Artist từ Backend (Node-server)
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

    // 2. Xử lý Xóa
    const handleDelete = async (id) => {
        try {
            await artistApi.delete(id);
            message.success("Xóa nghệ sĩ thành công");
            fetchArtists(); // Tải lại danh sách sau khi xóa
        // eslint-disable-next-line no-unused-vars
        } catch (error) {
            message.error("Xóa thất bại!");
        }
    };

    // 3. Xử lý Sửa (Tạm thời log ra, bạn có thể mở Modal ở đây)
    const handleEdit = (artist) => {
        console.log("Sửa nghệ sĩ:", artist);
        // logic mở Modal form sẽ nằm ở đây
    };

    

    return (
        <Card>
            <Title level={2}>Quản lý Nghệ sĩ (Chinook)</Title>
            <ArtistTable 
                data={artists} 
                loading={loading} 
                onEdit={handleEdit} 
                onDelete={handleDelete} 
            />
        </Card>
    );
};

export default ArtistPage;