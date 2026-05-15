import React, { createContext, useState, useCallback } from 'react';

export const MessageContext = createContext();

export function MessageProvider({ children }) {
  const [dynamicMessages, setDynamicMessages] = useState([]);
  const [dynamicChats, setDynamicChats] = useState({});
  const [interactions, setInteractions] = useState({});

  const addInteractionMessage = useCallback((type, user, postAuthor, postText) => {
    const messageId = `interaction-${Date.now()}`;
    const messageText =
      type === 'like'
        ? `${user.name} liked ${postAuthor ? `your comment on ${postAuthor}'s post` : 'your post'}`
        : postText?.trim()
        ? postText.trim()
        : `${user.name} commented on your post`;

    const message = {
      id: messageId,
      user: {
        name: user.name,
        initials: user.initials,
        gradient: user.gradient,
      },
      lastMessage: messageText,
      time: 'now',
      unread: 1,
      isInteraction: true,
    };

    setDynamicMessages((prev) => {
      const filtered = prev.filter((m) => m.id !== messageId);
      return [message, ...filtered];
    });

    if (type === 'comment') {
      setDynamicChats((prev) => ({
        ...prev,
        [messageId]: [
          {
            id: Date.now(),
            text: messageText,
            fromMe: false,
            time: 'now',
          },
        ],
      }));
    }

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

  const markMessageAsRead = useCallback((messageId) => {
    setDynamicMessages((prev) =>
      prev.map((message) =>
        message.id === messageId ? { ...message, unread: 0 } : message
      )
    );
  }, []);

  const addChatMessage = useCallback((messageId, chatMessage) => {
    setDynamicChats((prev) => ({
      ...prev,
      [messageId]: [...(prev[messageId] || []), chatMessage],
    }));
  }, []);

  const value = {
    dynamicMessages,
    dynamicChats,
    addInteractionMessage,
    addChatMessage,
    markMessageAsRead,
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
