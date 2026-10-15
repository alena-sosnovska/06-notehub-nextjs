import NotesClient from './Notes.client';
import { fetchNotes } from '../../lib/api';
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import { Suspense } from 'react';
import Loader from '../loading';

async function NotesPage() {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ['notes', '', 1],
    queryFn: () => fetchNotes('', 1, 12),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotesClient />
    </HydrationBoundary>
  );
}

export default function Page() {
  return (
    <Suspense fallback={<Loader />}>
      <NotesPage />
    </Suspense>
  );
}
