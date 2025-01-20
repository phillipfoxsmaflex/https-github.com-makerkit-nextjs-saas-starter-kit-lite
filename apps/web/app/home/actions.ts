'use server';

import { revalidatePath } from 'next/cache';

import { z } from 'zod';

import { getSupabaseServerClient } from '@kit/supabase/server-client';

type State = {
  errors?: {
    name?: string[];
    email?: string[];
  };
  message?: string | null;
  success?: boolean;
};

export default async function addStudent(prevState: State, formData: FormData) {
  const studentSchema = z.object({
    name: z.string().min(2, 'Name is required'),
    email: z.string().email('Valid email is required'),
  });

  const validateData = studentSchema.safeParse({
    name: formData.get('name'),
    email: formData.get('email'),
  });

  if (!validateData.success) {
    return {
      errors: validateData.error.flatten().fieldErrors,
      message: 'Please fix the errors above',
      success: false,
    };
  }

  const client = getSupabaseServerClient();
  const { data: userData } = await client.auth.getUser();

  const { error } = await client.from('student').insert({
    ...validateData.data,
    account_id: userData.user?.id,
  });

  if (error) {
    return {
      message: 'Failed to add student',
      success: false,
    };
  }

  revalidatePath('/home');
  return {
    message: 'Student added successfully',
    success: true,
  };
}
