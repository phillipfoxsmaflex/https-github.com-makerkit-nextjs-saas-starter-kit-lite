'use client';

import { useEffect, useState } from 'react';
import { useActionState } from 'react';

import { Button } from '@kit/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@kit/ui/dialog';
import { Input } from '@kit/ui/input';
import { Label } from '@kit/ui/label';

import addStudent from '~/home/actions';

type State = {
  errors?: {
    name?: string[];
    email?: string[];
  };
  message?: string | null;
  success?: boolean;
};

const initialState: State = { message: null, errors: {}, success: false };

export default function AddStudentDialog() {
  const [open, setOpen] = useState(false);
  const [state, formAction] = useActionState(addStudent, initialState);

  useEffect(() => {
    if (state.success) {
      setOpen(false);
    }
  }, [state.success]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">Add Student</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add Student</DialogTitle>
          <DialogDescription>
            Add a new student to your account.
          </DialogDescription>
        </DialogHeader>
        <form action={formAction}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Name
              </Label>
              <div className="col-span-3">
                <Input
                  id="name"
                  name="name"
                  placeholder="Enter student name"
                  className={state.errors?.name ? 'border-red-500' : ''}
                />
                {state.errors?.name && (
                  <p className="mt-1 text-sm text-red-500">
                    {state.errors.name[0]}
                  </p>
                )}
              </div>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="email" className="text-right">
                Email
              </Label>
              <div className="col-span-3">
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="student@example.com"
                  className={state.errors?.email ? 'border-red-500' : ''}
                />
                {state.errors?.email && (
                  <p className="mt-1 text-sm text-red-500">
                    {state.errors.email[0]}
                  </p>
                )}
              </div>
            </div>
          </div>
          {state.message && (
            <p
              className={`text-sm ${state.success ? 'text-green-500' : 'text-red-500'} mb-4`}
            >
              {state.message}
            </p>
          )}
          <DialogFooter>
            <Button type="submit">Add Student</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
