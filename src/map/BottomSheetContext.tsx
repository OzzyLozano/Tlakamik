import React, { createContext, useContext, useState, ReactNode } from 'react';
import BottomSheet from './BottomSheet';

interface BottomSheetContextProps {
  showBottomSheet: (title: string, content: () => JSX.Element) => void;
  hideBottomSheet: () => void;
}

const BottomSheetContext = createContext<BottomSheetContextProps | undefined>(undefined);

export const BottomSheetProvider = ({ children }: { children: ReactNode }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [content, setContent] = useState<(() => JSX.Element) | null>(null);
  const [title, setTitle] = useState<string>('');

  const showBottomSheet = (newTitle: string, newContent: () => JSX.Element) => {
    setTitle(newTitle);
    setContent(() => newContent);
    setIsVisible(true);
  };

  const hideBottomSheet = () => {
    setIsVisible(false);
  };

  return (
    <BottomSheetContext.Provider value={{ showBottomSheet, hideBottomSheet }}>
      {children}
      {isVisible && content && <BottomSheet title={title} renderThis={content} />}
    </BottomSheetContext.Provider>
  );
};

export const useBottomSheet = () => {
  const context = useContext(BottomSheetContext);
  if (context === undefined) {
    throw new Error('useBottomSheet must be used within a BottomSheetProvider');
  }
  return context;
};
