import { getSupabaseServerClient } from '@kit/supabase/server-client';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from '@kit/ui/table';

import AddStudentDialog from '~/home/_components/add-student-dialog';
import { addStudent } from '~/home/actions';

export default async function StudentTable() {
  const client = getSupabaseServerClient();
  const { data, error } = await client.from('student').select('*');

  if (error) {
    return (
      <div className="my-4 rounded-md bg-red-50 p-4">
        <div className="flex">
          <div className="text-sm text-red-700">
            Failed to load students. Please try again later.
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-md border">
      <Table>
        <TableCaption>List of registered students in your account</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead className="hidden md:table-cell">Account ID</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.length === 0 ? (
            <TableRow>
              <TableCell
                colSpan={4}
                className="text-center text-muted-foreground"
              >
                No students found. Add your first student to get started.
              </TableCell>
            </TableRow>
          ) : (
            data.map((student) => (
              <TableRow key={student.student_id}>
                <TableCell className="font-medium">{student.name}</TableCell>
                <TableCell>{student.email}</TableCell>
                <TableCell className="hidden md:table-cell">
                  {student.account_id}
                </TableCell>
                <TableCell className="text-right"></TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={3}>Total Students</TableCell>
            <TableCell className="text-right font-medium">
              {data.length}
            </TableCell>
          </TableRow>
        </TableFooter>
      </Table>
      <div className="p-4">
        <AddStudentDialog />
      </div>
    </div>
  );
}
