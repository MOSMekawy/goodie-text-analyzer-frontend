import { Suspense } from 'react';
import { Dashboard } from '@/components/dashboard/dashboard';


export default function DashBoardPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Dashboard />
    </Suspense>
  );
}
