import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";

export default function TaskChart({selectedTask}) {
const completed = selectedTask.subtasks.filter(sub => sub.color === "#118B50").length || 0;
const pending = selectedTask.subtasks.filter(sub => sub.color !== "#118B50").length || 0;

const data = [
    { name: "مكتملة", value: completed },
    { name: "قيد التنفيذ", value: pending }
  ];
  const COLORS = ["#118B50", "#FFC107"]; 


   return (
    <div className="d-flex justify-content-center mt-4">
      <PieChart width={300} height={300}>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          label
          outerRadius={100}
          fill="#8884d8"
          dataKey="value"
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
    </div>
  );
}
