import { Suspense } from 'react';
import NoteDetailsPage from './NoteDetails';
import Loader from '../../loader';

interface PageProps {
  params: Promise<{ id: string }>;
}

export default function Page({ params }: PageProps) {
  return (<Suspense fallback={<Loader />}>
    <NoteDetailsPage params={params} />
  </Suspense>); 
}