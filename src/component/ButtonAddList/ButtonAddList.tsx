import React, { useState } from 'react';
import { FloatButton } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import ModalAdd from './ModalAdd';

function ButtonAddList() {
  const [modalVisible, setModalVisible] = useState(false);

  const handleButtonClick = () => {
    setModalVisible(true);
  };

  return (
    <>
      <FloatButton 
        shape="circle"
        type="primary"
        tooltip={<div>Add</div>}
        icon={<PlusOutlined />}
        onClick={handleButtonClick} 
      />
      <ModalAdd onOpen={modalVisible} onClose={() => setModalVisible(false)} />
    </>
  );
}

export default ButtonAddList;
