import React, { useState } from 'react';
import { Space, Table, Tag , Button } from 'antd';

const { Column } = Table;

interface DataType {
    key : React.Key;
    title : string;
    description : string;
    status : string[];
}

const data: DataType[] = [
    {
        key: '1',
        title: 'Test Mock up 1',
        description: 'วันนี้ฉันต้องทำการบ้าน 1 + 1 * 2 / 3 = ?',
        status: ['process'],
    },
    {
        key: '2',
        title: 'Test Mock up 2',
        description: 'วันนี้ฉันต้องทำการบ้าน 1 + 1 * 2 / 3 = ?',
        status: ['process'],
    },
    {
        key: '3',
        title: 'Test Mock up 3',
        description: 'วันนี้ฉันต้องทำการบ้าน 1 + 1 * 2 / 3 = ?',
        status: ['success'],
    },
];

function TableList() {
    const FilterStatus = (value:any , record:any) => {
        return record.status.includes(value);
    };
    
    const updateStatus = (status:string) => {
        console.log(status)
    };
    return (
        <>
            <Table dataSource={data}>
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
                                <Button type="primary" onClick={() => updateStatus('success')}>Success</Button>
                            )}
                            {record.status.includes('success') && (
                                <Button type="primary" ghost onClick={() => updateStatus('process')}>Process</Button>
                            )}
                            <Button type="primary" danger onClick={() => updateStatus('delete')}>Delete</Button>
                      </Space>
                    )}
                />
            </Table>
        </>
    )
}

export default TableList