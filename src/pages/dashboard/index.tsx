import { useEffect, useState } from "react";
import { Student } from "../../model/students";
import api from "../../config/axios";
import {
  Button,
  DatePicker,
  Form,
  Input,
  Modal,
  Popconfirm,
  Select,
  Table,
} from "antd";
import { useForm } from "antd/es/form/Form";
import moment from "moment";
import { toast } from "react-toastify";

function Dashboard() {
  const [student, setStudent] = useState<Student[]>();
  const [isOpen, setIsOpen] = useState(false);
  const [isUpdate, setIsUpdate] = useState(false);
  const [form] = useForm();

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Date of Birth",
      dataIndex: "dateofbirth",
      key: "dateofbirth",
    },
    {
      title: "Gender",
      dataIndex: "gender",
      key: "gender",
      render: (gender: boolean) => (gender ? "Male" : "Female"),
    },
    {
      title: "Class",
      dataIndex: "class",
      key: "class",
    },
    {
      title: "Image",
      dataIndex: "image",
      key: "image",
      render: (image: string) => (
        <img
          src={image}
          alt="Profile"
          style={{ width: "50px", height: "50px" }}
        />
      ),
    },
    {
      title: "Feedback",
      dataIndex: "feedback",
      key: "feedback",
    },

    {
      title: "Actions",
      dataIndex: "id",
      key: "id",
      render: (id, record) => (
        <>
          <Button
            type="primary"
            onClick={() => {
              const recordValiDate = {
                ...record,
                dateofbirth: record.dateofbirth
                  ? moment(record.dateofbirth, "YYYY-MM-DD")
                  : null,
              };

              form.setFieldsValue(recordValiDate);
              setIsOpen(true);
              setIsUpdate(true);
            }}
          >
            Update
          </Button>
          <Popconfirm
            title="Are you sure to delete this student "
            onConfirm={() => handleDelete(id)}
          >
            <Button type="primary" danger>
              Delete
            </Button>
          </Popconfirm>
        </>
      ),
    },
  ];

  const handleDelete = async (id) => {
    try {
      await api.delete(`studentManagement/${id}`);
      toast.success("Delete student successfully!");
      fetchStudent();
    } catch (error) {
      console.log(error);
    }
  };

  const fetchStudent = async () => {
    try {
      const response = await api.get("studentManagement");
      console.log(response.data);
      setStudent(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchStudent();
  }, []);

  const onFinish = async (values) => {
    const dateFormatted = moment(values.dateofbirth.$d).format("YYYY-MM-DD");
    values.dateofbirth = dateFormatted;
    if (values?.id) {
      await api.put(`studentManagement/${values.id}`, values);
      toast.success("Update student successfully !!!");
    } else {
      await api.post("studentManagement", values);
      toast.success("Add new student successfully !!!");
    }
    setIsOpen(false);
    form.resetFields();
    fetchStudent();
  };

  return (
    <div style={{ marginTop: "20px" }}>
      <Button
        onClick={() => {
          setIsOpen(true);
          setIsUpdate(false);
          form.resetFields();
        }}
      >
        Add New Student
      </Button>
      <div>
        <Table columns={columns} dataSource={student} />
      </div>

      <Modal
        onOk={() => form.submit()}
        title={isUpdate ? "Update Student" : "Add New Student"}
        open={isOpen}
        onCancel={() => setIsOpen(false)}
      >
        <Form form={form} onFinish={onFinish}>
          <Form.Item label="ID" name={"id"} hidden>
            <Input />
          </Form.Item>

          <Form.Item
            label="Name"
            name={"name"}
            rules={[
              {
                required: true,
                message: "Please input the name!",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="DateofBirth"
            name={"dateofbirth"}
            rules={[
              {
                required: true,
                message: "Please input DayOfBirth!",
              },
            ]}
          >
            <DatePicker />
          </Form.Item>

          <Form.Item
            label="Gender"
            name={"gender"}
            rules={[
              {
                required: true,
                message: "Please input gender!",
              },
            ]}
          >
            <Select
              options={[
                {
                  value: true,
                  label: "Male",
                },
                {
                  value: false,
                  label: "Female",
                },
              ]}
            />
          </Form.Item>
          <Form.Item
            label="Class"
            name={"class"}
            rules={[
              {
                required: true,
                message: "Please input class!",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Image"
            name={"image"}
            rules={[
              {
                required: true,
                message: "Please input Image!",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item label="Feedback" name={"feedback"}>
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}

export default Dashboard;
