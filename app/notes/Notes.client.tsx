'use client';

import { useState } from 'react';
import { useQuery, keepPreviousData } from '@tanstack/react-query';
import { useDebouncedCallback } from 'use-debounce';
import NoteList from '../../components/NoteList/NoteList';
import Modal from '../../components/Modal/Modal';
import NoteForm from '../../components/NoteForm/NoteForm';
import Pagination from '../../components/Pagination/Pagination';
import SearchBox from '../../components/SearchBox/SearchBox';
import { fetchNotes } from '../../lib/api/api';
import css from './page.module.css';
import Loader from '../loader';
import ErrorMessage from './error';
import { Note } from '@/types/note';

export interface NotesClientProps {
  initialNotes: Note[];
  initialTotalPages: number;
}

export default function NotesClient({ initialNotes, initialTotalPages }: NotesClientProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const [inputValue, setInputValue] = useState('');
  const [page, setPage] = useState(1);
  const perPage = 10;

  const useGetNotes = (searchText: string, page: number) => {
    return useQuery({
      queryKey: ['notes', searchText, page],
      queryFn: () => fetchNotes(searchText, page, perPage),
        placeholderData: keepPreviousData,
      initialData: {
        notes: initialNotes,
        totalPages: initialTotalPages,
      },
    });
  };

  const handleSearch = useDebouncedCallback((searchText: string) => {
    setInputValue(searchText);
    setPage(1);
  }, 300);

  const { data, isLoading, isError } = useGetNotes(inputValue, page);
  const notes = data?.notes ?? [];
  const totalPages = data?.totalPages ?? 0;

  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        <SearchBox value={inputValue} onChange={handleSearch} />
        {totalPages > 1 && (
          <Pagination
            pageCount={totalPages}
            onPageChange={({ selected }) => setPage(selected + 1)}
            forcePage={page - 1}
          />
        )}
        <button className={css.button} onClick={openModal}>
          Create note +
        </button>
      </header>
      {isLoading && <Loader />}
      {isError && <ErrorMessage />}
      {notes && notes.length > 0 && <NoteList notes={notes} />}
      {isModalOpen && (
        <Modal onClose={closeModal}>
          <NoteForm onClose={closeModal} />
        </Modal>
      )}
    </div>
  );
}
