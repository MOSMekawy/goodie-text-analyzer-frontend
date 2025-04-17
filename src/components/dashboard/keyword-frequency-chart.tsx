import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { Keyword } from '@/lib/api/keywords';

interface KeywordFrequencyChartProps {
  keywords: Keyword[];
}

export function KeywordFrequencyChart({ keywords }: KeywordFrequencyChartProps) {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={keywords}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="word" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="frequency" fill="#8884d8" />
        <Bar dataKey="positiveMentions" fill="#82ca9d" />
        <Bar dataKey="negativeMentions" fill="#ff8042" />
      </BarChart>
    </ResponsiveContainer>
  );
}
