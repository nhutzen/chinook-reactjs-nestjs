import { Table, Button, Space, Popconfirm } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';

const ArtistTable = ({ data, loading, onEdit, onDelete }) => {
    const columns = [
        {
            title: 'ID',
            dataIndex: 'artistId',
            key: 'artistId',
            width: '10%',
            sorter: (a, b) => a.artistId - b.artistId,
        },
        {
            title: 'Artist Name',
            dataIndex: 'name',
            key: 'name',
            sorter: (a, b) => a.name.localeCompare(b.name),
        },
        {
            title: 'Actions',
            key: 'actions',
            width: '20%',
            render: (_, record) => (
                <Space size="middle">
                    <Button 
                        type="primary" 
                        icon={<EditOutlined />} 
                        onClick={() => onEdit(record)}
                    >
                        Edit
                    </Button>
                    <Popconfirm
                        title="Delete this artist?"
                        onConfirm={() => onDelete(record.artistId)}
                        okText="Yes"
                        cancelText="No"
                    >
                        <Button 
                            danger 
                            icon={<DeleteOutlined />}
                        >
                            Delete
                        </Button>
                    </Popconfirm>
                </Space>
            ),
        },
    ];

    return (
        <Table 
            style={{ width: '100%' }}
            columns={columns} 
            dataSource={data} 
            loading={loading} 
            rowKey="artistId" // Quan trọng: xác định key duy nhất cho mỗi dòng
            pagination={{ pageSize: 10 }} 
        />
    );
};

export default ArtistTable;