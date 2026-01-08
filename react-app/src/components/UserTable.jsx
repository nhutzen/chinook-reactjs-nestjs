import {Table} from "antd";

const UserTable = ({users}) => {
    const columns = [
        {
            title: "ID",
            dataIndex: "id",
            key: "id",
        }, 
        {
            title: "Name",
            dataIndex: "name",
            key: "name",
        }, 
        {
            title: "Email",
            dataIndex: "email",
            key: "email",
        }, 
        {
            title: "Phone",
            dataIndex: "phone",
            key: "phone",
        }, 
        {
            title: "Website",
            dataIndex: "website",
            key: "website",
        },];

        return (
            <Table 
                columns = {columns}
                dataSource = {users}
                rowKey = "id"
                pagination={false}
            />  
        );
};
    export default UserTable;
    