import React, { useState } from 'react';
import { Button, Input, Form, message } from 'antd';

interface ProjectFormProps {
  onCreate: (name: string) => void;
  existingProjects: string[];
}

const ProjectForm: React.FC<ProjectFormProps> = ({ onCreate, existingProjects }) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    try {
      const { name } = await form.validateFields();
      if (existingProjects.includes(name)) {
        message.error(`Project "${name}" already exists.`);
        return;
      }
      setLoading(true);
      onCreate(name);
      form.resetFields();
      message.success(`Project "${name}" created.`);
    } catch (err) {
      // Validation failed
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form form={form} layout="inline" onFinish={handleSubmit}>
      <Form.Item
        name="name"
        rules={[
          { required: true, message: 'Please enter a project name' },
          { whitespace: true, message: 'Name cannot be empty' },
        ]}
      >
        <Input placeholder="New project name" />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit" loading={loading}>
          Create
        </Button>
      </Form.Item>
    </Form>
  );
};

export default ProjectForm;
