import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

const ViewsChart = ({ data }) => (
  <ResponsiveContainer width="100%" height={200}>
    <LineChart data={data}>
      <XAxis dataKey="date"/>
      <YAxis />
      <Tooltip />
      <Line type="monotone" dataKey="views" stroke="#8884d8" />
    </LineChart>
  </ResponsiveContainer>
);

export default ViewsChart;