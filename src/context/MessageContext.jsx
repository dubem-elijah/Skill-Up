import React, { createContext, useState, useCallback } from 'react';

export const MessageContext = createContext();

export function MessageProvider({ children }) {
  const [dynamicMessages, setDynamicMessages] = useState([]);
  const [interactions, setInteractions] = useState({});

  const addInteractionMessage = useCallback((type, user, postAuthor, postText) => {
    const messageId = `interaction-${Date.now()}`;
    const message = {
      id: messageId,
      user: {
        name: user.name,
        initials: user.initials,
        gradient: user.gradient,
      },
      lastMessage:
        type === 'like'
          ? `liked your ${postAuthor ? 'comment' : 'post'} on ${postAuthor || 'their'} post`
          : `commented on your post: "${postText.substring(0, 40)}..."`,
      time: 'now',
      unread: 1,
      isInteraction: true,
    };

    setDynamicMessages((prev) => {
      const filtered = prev.filter((m) => m.id !== messageId);
      return [message, ...filtered];
    });

    // Also track the interaction
    setInteractions((prev) => ({
      ...prev,
      [messageId]: {
        type,
        user,
        postAuthor,
        postText,
        timestamp: Date.now(),
      },
    }));
  }, []);

  const value = {
    dynamicMessages,
    addInteractionMessage,
    interactions,
  };

  return <MessageContext.Provider value={value}>{children}</MessageContext.Provider>;
}

export function useMessages() {
  const context = React.useContext(MessageContext);
  if (!context) {
    throw new Error('useMessages must be used within MessageProvider');
  }
  return context;
}
