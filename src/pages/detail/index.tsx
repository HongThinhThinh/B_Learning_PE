import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Student } from "../../model/students";
import api from "../../config/axios";
import { Card } from "antd";
const { Meta } = Card;
function DetailPage() {
  const { id } = useParams();

  const [student, setStudent] = useState<Student>();

  const fetchDetailStudent = async () => {
    try {
      const response = await api.get(`studentManagement/${id}`);
      console.log(response.data);
      setStudent(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchDetailStudent();
  }, []);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "85vh",
      }}
    >
      <Card
        style={{ width: 300 }}
        cover={<img alt="example" src={student?.image} />}
      >
        <p>
          <strong>ID :</strong> {student?.id}
        </p>

        <Meta
          title={
            <p style={{ display: "flex", justifyContent: "space-between" }}>
              <span>{student?.name}</span>
              <span>{student?.class}</span>
            </p>
          }
        />
        <p>
          <strong>Gender: </strong>
          {student?.gender ? "Female" : "Male"}
        </p>
        <p>
          <strong>Date of birth: </strong>
          {student?.dateofbirth}
        </p>
        <p>{student?.feedback}</p>
      </Card>
    </div>
  );
}

export default DetailPage;
