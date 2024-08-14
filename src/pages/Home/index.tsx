import { useEffect, useState } from "react";
import api from "../../config/axios";
import { Student } from "../../model/students";
import CardComponent from "../../components/card";

function Home() {
  const [student, setStudent] = useState<Student[]>();

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

  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "space-around",
        padding: "20px",
        margin: "0 auto",
        gap: "20px",
      }}
    >
      {student?.map((studentItem: Student) => (
        <CardComponent key={studentItem.id} student={studentItem} />
      ))}
    </div>
  );
}

export default Home;
