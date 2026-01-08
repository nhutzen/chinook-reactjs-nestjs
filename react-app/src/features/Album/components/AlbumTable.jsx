import { Table,Space, Button } from "antd";

const AlbumTable = ({ data, loading, onEdit, onDelete }) => {
  const columns = [
    {
      title: "ID",
      dataIndex: "albumId",
      key: "albumId",
      width: "10%",
      sorter: (a, b) => a.albumId - b.albumId,
    },
    {
      title: "Album Title",
      dataIndex: "title",
      key: "title",
      sorter: (a, b) => a.title.localeCompare(b.title),
    },
    {
      title: "Artist name",
      dataIndex: ['artist','name'],
      key: "artistId",
      sorter: (a, b) => a.artistId - b.artistId,
    },
    {
      title: "Actions",
      key: "actions",
      width: "20%",
      render: (_, record) => (
        <Space size="middle">
          <Button onClick={() => onEdit(record)}>Edit</Button>
          <Button danger onClick={() => onDelete(record.albumId)}>
            Delete
          </Button>
        </Space>
      ),
    },
  ];
  return (
    <Table
      style={{ width: "100%" }}
      columns={columns}
      dataSource={data}
      loading={loading}
      rowKey="albumId" // Quan trọng: xác định key duy nhất cho mỗi dòng
    />
  );
};

export default AlbumTable;
