import React, { createContext, useContext, useState, useEffect } from 'react';
import { fetchContent } from '../lib/api';

const ContentContext = createContext<Record<string, string>>({});

export function ContentProvider({ children }: { children: React.ReactNode }) {
  const [content, setContent] = useState<Record<string, string>>({});

  useEffect(() => {
    fetchContent().then(res => {
      if (res.success && res.data) {
        setContent(res.data);
      }
    });
  }, []);

  return (
    <ContentContext.Provider value={content}>
      {children}
    </ContentContext.Provider>
  );
}

export function useContent() {
  return useContext(ContentContext);
}
