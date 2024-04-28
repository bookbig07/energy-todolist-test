import React, { useEffect } from 'react';
import { Space, Table, Tag , Button } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { updateTodoStatus, deleteTodo , loadTodos , loadTodosFromLocalStorage  } from '../store/action';

const { Column } = Table;

interface DataType {
    key : React.Key;
    title : string;
    description : string;
    status : string[];
}

function TableList() {
    const todos = useSelector((state: any) => state.todos.todos);
    const dispatch = useDispatch();

    useEffect(() => {
        const initialTodos = loadTodosFromLocalStorage();
        dispatch(loadTodos(initialTodos));
    }, [dispatch]);

    const FilterStatus = (value:any , record:any) => {
        return record.status.includes(value);
    };
    
    const UpdateStatus = (key: React.Key, status: string) => {
        dispatch(updateTodoStatus({ key, status }));
    };

    const DeleteTodo = (key: React.Key) => {
        dispatch(deleteTodo({ key }));
    };

    return (
        <>
            <Table dataSource={todos}>
                <Column title="Title" dataIndex="title" key="title" />
                <Column title="Description" dataIndex="description" key="description" />
                <Column
                    title="Status"
                    dataIndex="status"
                    key="status"
                    filters={[
                        { text: 'Success', value: 'success' },
                        { text: 'Process', value: 'process' },
                    ]}
                    onFilter={FilterStatus}
                    render={(status: string[]) => (
                        <>
                        {status.map((status) => {
                            let color = status === 'success' ? 'green' : 'volcano';
                            return (
                                <Tag color={color} key={status}>
                                    {status.toUpperCase()}
                                </Tag>
                            );
                        })}
                        </>
                    )}
                />
                <Column
                    title="Action"
                    key="action"
                    render={(_: any, record: DataType) => (
                        <Space size="middle">
                            {record.status.includes('process') && (
                                <Button type="primary" onClick={() => UpdateStatus(record.key, 'success')}>Success</Button>
                            )}
                            {record.status.includes('success') && (
                                <Button type="primary" ghost onClick={() => UpdateStatus(record.key, 'process')}>Process</Button>
                            )}
                            <Button type="primary" danger onClick={() => DeleteTodo(record.key)}>Delete</Button>                      </Space>
                    )}
                />
            </Table>
        </>
    )
}

export default TableList