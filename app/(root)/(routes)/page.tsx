'use client';

import { useStoreModal } from '@/hooks/use-store-modal';
import { useEffect } from 'react';
import { useAuth } from '@clerk/nextjs';
import ModalProvider from '@/providers/modal-provider';

export default function SetupPage() {
  const onOpen = useStoreModal((state) => state.onOpen);
  const isOpen = useStoreModal((state) => state.isOpen);
  const { isLoaded, userId, sessionId, getToken } = useAuth();

  useEffect(() => {
    if (userId) {
      onOpen();
    }
    // if (!isOpen) {
    //   onOpen();
    // }
  }, [isOpen, onOpen]);

  if (!isLoaded || !userId) {
    return null;
  }

  return (
    <div>
      Hello, {userId} your current active session is {sessionId}
      <ModalProvider />
    </div>
  );
}
