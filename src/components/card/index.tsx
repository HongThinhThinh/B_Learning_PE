import { Avatar, Card } from "antd";
import { Student } from "../../model/students";
import { useNavigate } from "react-router-dom";

const { Meta } = Card;

interface CardComponentProps {
  student: Student;
}

function CardComponent({ student }: CardComponentProps) {
  const navigate = useNavigate();
  return (
    <div>
      <Card
        style={{ width: 300 }}
        cover={<img alt="example" src={student?.image} />}
        actions={[
          <span onClick={() => navigate(`details/${student.id}`)}>
            View Details
          </span>,
        ]}
      >
        <Meta
          title={
            <p style={{ display: "flex", justifyContent: "space-between" }}>
              <span>{student.name}</span>
              <span>{student.class}</span>
            </p>
          }
        />
      </Card>
    </div>
  );
}

export default CardComponent;
