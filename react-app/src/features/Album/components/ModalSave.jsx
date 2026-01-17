import { Form, Input, Button, Modal, Select } from "antd";
import artistApi from "../../../api/artistApi";
import React, { useState, useEffect } from "react";

const ModalSave = ({ editingAlbum, open, onSave, onCancel }) => {
  const [form] = Form.useForm();
  const [artists, setArtists] = useState([]);

  useEffect(() => {
    if (open) {
      const fetchArtists = async () => {
        try {
          const response = await artistApi.getAll();
          const options = response.map((artist) => {
            return {
              label: artist.name,
              value: artist.artistId || artist.ArtistId,
            };
          });
          setArtists(options);
        } catch (error) {
          console.error("Failed to fetch artists:", error);
        }
      };
      fetchArtists();
    }
  }, [open]);

  useEffect(() => {
    if (open) {
      if (editingAlbum) {
        form.setFieldsValue({
        title: editingAlbum.title || editingAlbum.Title,
        artistId: editingAlbum.artistId || editingAlbum.ArtistId || editingAlbum.artist?.artistId
      });
      } else {
        form.resetFields();
      }
    }
  }, [open, editingAlbum, form, artists]);

  const handleOk = async () => {
    try {
      const values = await form.validateFields();
      await onSave(values);
    } catch (info) {
      console.log("Validate Failed:", info);
    }
  };

  return (
    <Modal
      title={editingAlbum ? "Edit Album" : "Add New Album"}
      open={open}
      onOk={handleOk}
      onCancel={onCancel}
    >
      <Form form={form} layout="vertical">
        <Form.Item
          name="title"
          label="Album Title"
          rules={[{ required: true, message: "Please enter album title" }]}
        >
          <Input placeholder="Album Title" />
        </Form.Item>
        <Form.Item name="artistId">
          <Select placeholder="Select Artist" options={artists}></Select>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default ModalSave;
