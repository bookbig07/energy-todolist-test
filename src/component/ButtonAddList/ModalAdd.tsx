import React, { useState } from 'react';
import {  Input , Button, Modal } from 'antd';

const { TextArea } = Input;

function ModalAdd({ onOpen , onClose }: { onOpen: boolean; onClose: () => void; }) {
    const [loading, setLoading] = useState(false);
    const [description, setDescription] = useState('');
    const [title, setTitle] = useState('');

    const addList = () => {
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
        onClose();
      }, 1000);
    };
  
    return (
      <Modal
        open={onOpen}
        title="Add List New"
        onOk={addList}
        onCancel={onClose}
        footer={[
          <Button key="submit" type="primary" loading={loading} onClick={addList}>
            Add
          </Button>,
          <Button key="back" onClick={onClose}>
            Cancel
          </Button>,
        ]}
      >
        <>
        <Input 
            showCount 
            maxLength={20} 
            value={title} 
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Title" 
        />
        <div className="my-6" />
        <TextArea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Description"
            autoSize={{ minRows: 3, maxRows: 5 }}
        />
        </>
      </Modal>
    );
}

export default ModalAdd;
