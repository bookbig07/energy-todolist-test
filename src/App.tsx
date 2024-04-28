import React from 'react';
import ButtonAddList from './component/ButtonAddList/ButtonAddList'
import TableList from './component/TableList/TableList'

function App() {
  return (
    <div className="w-full flex flex-col items-center justify-center min-h-screen py-2 bg-slate-100">
      <TableList/>
      <ButtonAddList/>
    </div>
  );
}

export default App;
