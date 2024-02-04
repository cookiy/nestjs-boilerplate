'use client'

import React, {useState} from 'react';
import { message, Upload, Form, Input, Button } from 'antd';
import axios from 'axios';

const { Dragger } = Upload;

const UploadContainer = () => {
  const [form] = Form.useForm();
  const [filePath, setFilePath] = useState('');
  const [fileName, setFileName] = useState('');

  const compress = async (values) => {
    const res = await axios.get('http://localhost:8899/api/upload/compression', {
      params: {
        color: values.color || 256,
        level: values.level || 9,
        path: filePath
      },
      responseType: 'arraybuffer'
    });

    const blob = new Blob([res.data], { type: 'image/jpeg' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = fileName;
    link.click();
    URL.revokeObjectURL(url);

    message.success('压缩成功');
  };

  const props = {
    name: 'file',
    action: 'http://localhost:8899/api/upload/files',
    onChange(info) {
      const { status } = info.file;
      if (status === 'done') {
        setFilePath(info.file.response);
        setFileName(info.file.name);
        message.success(`${info.file.name} 文件上传成功`);
      } else if (status === 'error') {
        message.error(`${info.file.name} 文件上传失败`);
      }
    }
  };

  return (
    <section id="contact" className="overflow-hidden py-16 md:py-20 lg:py-28">
      <div className="container">
        <div className="-mx-4 flex flex-wrap">
          <button className="bg-red-700 font-semibold text-white py-2 px-4 rounded hover:bg-red-700 duration-1000">前端晚间课</button>
          <div className="w-full px-4 lg:w-7/12 xl:w-8/12">
            <div
              className="wow fadeInUp mb-12 rounded-md bg-primary/[3%] py-11 px-8 dark:bg-dark sm:p-[55px] lg:mb-5 lg:px-8 xl:p-[55px]"
              data-wow-delay=".15s
              "
            >
              <Form style={{width: 500, margin: '50px auto'}}form={form} onFinish={compress}>
                <Form.Item
                  label="颜色数量"
                  name="color"
                >
                  <Input />
                </Form.Item>

                <Form.Item
                  label="level"
                  name="level"
                >
                  <Input />
                </Form.Item>

                <Form.Item>
                  <Dragger {...props}>
                    <p className="ant-upload-text">点击或拖拽文件到这个区域来上传</p>
                  </Dragger>
                </Form.Item>

                <Form.Item>
                  <Button type="primary" htmlType="submit">压缩</Button>
                </Form.Item>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default UploadContainer;
