import React from 'react';
import { Form, Input, Button } from 'antd';
import './styles.scss';

const formItemLayout = {
  labelCol: { span: 5 },
  wrapperCol: { span: 14 },
};

const StopConfigPanel = ({ title, clickLatLon, onFinish }) => {
  return (
    <div className="StopConfigPanel TU--Yellow">
      <h1>{title}</h1>
      <Form name="add_stop" {...formItemLayout} onFinish={onFinish}>
        <Form.Item label="LatLon">
          <span className="ant-form-text">
            {`(${clickLatLon[0]},${clickLatLon[1]})`}
          </span>
        </Form.Item>
        <Form.Item label="ID" name="id">
          <Input allowClear placeholder="stop id" />
        </Form.Item>
        <Form.Item label="name_en" name="name_en">
          <Input allowClear placeholder="stop name" />
        </Form.Item>
        <Form.Item label="name_th" name="name_th">
          <Input allowClear placeholder="ชื่อสถานี" />
        </Form.Item>
        <Form.Item wrapperCol={{ offset: 3 }}>
          <Button type="primary" htmlType="submit">
            Add
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default StopConfigPanel;
