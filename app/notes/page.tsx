import NotesClient from './Notes.client';
import { fetchNotes } from '../../lib/api';
import { connection } from 'next/server';
import { Suspense } from 'react';
import Loader from '../loading';

// export const dynamic = 'force-dynamic';

async function NotesPage() {
  await connection();
  const initialData = await fetchNotes('', 1, 10);

  return (
    <NotesClient initialNotes={initialData.notes} initialTotalPages={initialData.totalPages} />
  );
}

export default function Page() {
  return (
    <Suspense fallback={<Loader />}>
      <NotesPage />
    </Suspense>
  );
}
