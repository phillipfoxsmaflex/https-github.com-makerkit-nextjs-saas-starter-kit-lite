import { PageBody, PageHeader } from '@kit/ui/page';

import { DashboardDemo } from '~/home/_components/dashboard-demo';
import StudentTable from '~/home/_components/student-table';

export default function HomePage() {
  return (
    <>
      <PageHeader title={'Dashboard'} description={'Your SaaS at a glance'} />
      <PageBody>
        <StudentTable />
        <DashboardDemo />
      </PageBody>
    </>
  );
}
