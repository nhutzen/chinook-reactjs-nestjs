import { Modal, Form, Input } from "antd";
import { useEffect } from "react";

const SaveModel = ({ visible, onSave, onCancel, editingArtist }) => {
  const [form] = Form.useForm();

  useEffect(() => {
    if (visible) {
      if (editingArtist) {
        form.setFieldsValue(editingArtist);
      } else {
        form.resetFields();
      }
    }
  }, [visible, editingArtist, form]);

  const handleOk = () => {
    form
      .validateFields() // Kiểm tra các rules (required,...)
      .then((values) => {
        onSave(values); // Gửi dữ liệu ra ArtistPage để gọi API
      })
      .catch((info) => {
        console.log("Validate Failed:", info);
      });
  };

  return (
    <Modal
      title={editingArtist ? "Edit Artist" : "Add Artist"}
      open={visible}
      onCancel={onCancel}
      onOk={handleOk}
      okText="Save"
      cancelText="Cancel"
    >
      <Form layout="vertical" form={form} name="artistForm">
        <Form.Item
          name="name"
          label="Artist Name"
          rules={[{ required: true, message: "Please enter the artist name" }]}
        >
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default SaveModel;
