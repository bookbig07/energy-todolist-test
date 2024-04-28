import React, { useState } from 'react';
import {  Input , Button, Modal , Alert  } from 'antd';
import { useDispatch } from 'react-redux';
import { addTodo  } from '../store/action';

const { TextArea } = Input;

function ModalAdd({ onOpen , onClose }: { onOpen: boolean; onClose: () => void; }) {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState<boolean>(false);
  const [description, setDescription] = useState<string>('');
  const [title, setTitle] = useState<string>('');
  const [alert, setAlert] = useState<boolean>(false);
  const addList = () => {
    if (title.length <= 0) {
      setAlert(true);
      return
    }
    if (description.length <= 0) {
      setAlert(true);
      return
    }
    setLoading(true);
    const newTodo = {
      key: Date.now(),
      title,
      description,
      status: ['process'],
    };
    dispatch(addTodo(newTodo));
    setDescription('');
    setAlert(false);
    setTitle('');
    setTimeout(() => {
      setLoading(false);
      onClose();
    }, 100);
  };

  return (
    <Modal
      open={onOpen}
      title="Add List New"
      onOk={addList}
      onCancel={() => { onClose(); setAlert(false); }}
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
          maxLength={80} 
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
      {alert && (
        <Alert
          message="Please enter a title or description."
          type="error"
          className="mt-4"
        />
      )}
      </>
    </Modal>
  );
}

export default ModalAdd;
