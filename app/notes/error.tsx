'use client';

interface ErrorMessageProps {
  message?: string;
}

export default function ErrorMessage({ message }: ErrorMessageProps) {
  return <p>Could not fetch the list of notes. {message}</p>;
}
