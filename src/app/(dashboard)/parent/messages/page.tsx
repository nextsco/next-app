"use client";

import { useState } from "react";
import { Topbar } from "@/components/layout/Topbar";
import { PageHeader } from "@/components/shared/PageHeader";
import { mockMessages } from "@/lib/mock-data";
import { formatDateTime, getInitials } from "@/lib/utils";
import { ROLES_LABELS } from "@/lib/constants";
import { Send } from "lucide-react";

const PARENT_USER_ID = "usr_04";

export default function ParentMessagesPage() {
  const [newMessage, setNewMessage] = useState("");

  const parentMessages = mockMessages
    .filter(
      (m) => m.receiverId === PARENT_USER_ID || m.senderId === PARENT_USER_ID
    )
    .sort(
      (a, b) =>
        new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
    );

  // Group conversations by the other person
  const conversations = parentMessages.reduce(
    (acc, msg) => {
      const otherId =
        msg.senderId === PARENT_USER_ID ? msg.receiverId : msg.senderId;
      const otherName =
        msg.senderId === PARENT_USER_ID ? msg.receiverName : msg.senderName;
      const otherRole =
        msg.senderId === PARENT_USER_ID
          ? ("TEACHER" as const)
          : msg.senderRole;
      if (!acc[otherId]) {
        acc[otherId] = { name: otherName, role: otherRole, messages: [] };
      }
      acc[otherId].messages.push(msg);
      return acc;
    },
    {} as Record<
      string,
      {
        name: string;
        role: string;
        messages: typeof parentMessages;
      }
    >
  );

  const [selectedContact, setSelectedContact] = useState<string | null>(
    Object.keys(conversations)[0] ?? null
  );

  const activeConversation = selectedContact
    ? conversations[selectedContact]
    : null;

  const handleSend = () => {
    if (!newMessage.trim()) return;
    // In a real app, this would send via API
    setNewMessage("");
  };

  return (
    <>
      <Topbar title="Messages" />
      <main className="p-4 lg:p-6 space-y-6">
        <PageHeader
          title="Messagerie"
          description="Communiquez avec les enseignants et l'administration"
        />

        <div className="bg-white rounded-xl border border-green-200 overflow-hidden flex flex-col lg:flex-row" style={{ minHeight: "500px" }}>
          {/* Contact list */}
          <div className="lg:w-72 border-b lg:border-b-0 lg:border-r border-green-200">
            <div className="px-4 py-3 border-b border-green-100">
              <h3 className="text-sm font-display font-semibold text-green-950">
                Conversations
              </h3>
            </div>
            <nav aria-label="Liste des conversations">
              <ul className="divide-y divide-green-50">
                {Object.entries(conversations).map(
                  ([contactId, conv]) => {
                    const lastMsg =
                      conv.messages[conv.messages.length - 1];
                    const hasUnread = conv.messages.some(
                      (m) =>
                        !m.isRead && m.receiverId === PARENT_USER_ID
                    );
                    const isActive = selectedContact === contactId;

                    return (
                      <li key={contactId}>
                        <button
                          onClick={() => setSelectedContact(contactId)}
                          aria-current={isActive ? "true" : undefined}
                          className={`w-full text-left px-4 py-3 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-green-700 ${
                            isActive
                              ? "bg-green-50"
                              : "hover:bg-green-50/50"
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <div
                              className="w-9 h-9 rounded-full bg-green-200 flex items-center justify-center text-green-950 text-xs font-semibold shrink-0"
                              aria-hidden="true"
                            >
                              {getInitials(
                                conv.name.split(" ")[0],
                                conv.name.split(" ")[1] ?? ""
                              )}
                            </div>
                            <div className="min-w-0 flex-1">
                              <div className="flex items-center gap-2">
                                <p className="text-sm font-medium text-green-950 truncate">
                                  {conv.name}
                                </p>
                                {hasUnread && (
                                  <span className="w-2 h-2 rounded-full bg-green-600 shrink-0" />
                                )}
                              </div>
                              <p className="text-xs text-green-700 truncate">
                                {ROLES_LABELS[conv.role as keyof typeof ROLES_LABELS] ?? conv.role}
                              </p>
                            </div>
                          </div>
                        </button>
                      </li>
                    );
                  }
                )}
              </ul>
            </nav>
          </div>

          {/* Message thread */}
          <div className="flex-1 flex flex-col">
            {activeConversation ? (
              <>
                {/* Header */}
                <div className="px-5 py-3 border-b border-green-100 flex items-center gap-3">
                  <div
                    className="w-8 h-8 rounded-full bg-green-200 flex items-center justify-center text-green-950 text-xs font-semibold shrink-0"
                    aria-hidden="true"
                  >
                    {getInitials(
                      activeConversation.name.split(" ")[0],
                      activeConversation.name.split(" ")[1] ?? ""
                    )}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-green-950">
                      {activeConversation.name}
                    </p>
                    <p className="text-xs text-green-700">
                      {ROLES_LABELS[activeConversation.role as keyof typeof ROLES_LABELS] ?? activeConversation.role}
                    </p>
                  </div>
                </div>

                {/* Messages */}
                <div
                  className="flex-1 overflow-y-auto p-5 space-y-4"
                  role="log"
                  aria-label="Messages de la conversation"
                >
                  {activeConversation.messages.map((msg) => {
                    const isSent = msg.senderId === PARENT_USER_ID;
                    return (
                      <div
                        key={msg.id}
                        className={`flex ${isSent ? "justify-end" : "justify-start"}`}
                      >
                        <div
                          className={`max-w-[80%] px-4 py-3 rounded-xl ${
                            isSent
                              ? "bg-green-700 text-white rounded-br-sm"
                              : "bg-green-50 text-green-950 border border-green-200 rounded-bl-sm"
                          }`}
                        >
                          <p className="text-sm leading-relaxed">
                            {msg.content}
                          </p>
                          <p
                            className={`text-xs mt-1.5 ${
                              isSent
                                ? "text-green-200"
                                : "text-green-600"
                            }`}
                          >
                            {formatDateTime(msg.createdAt)}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Compose */}
                <div className="px-4 py-3 border-t border-green-100">
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      handleSend();
                    }}
                    className="flex items-center gap-3"
                  >
                    <label htmlFor="message-input" className="sr-only">
                      Ecrire un message
                    </label>
                    <input
                      id="message-input"
                      type="text"
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      placeholder="Ecrire un message..."
                      className="flex-1 px-4 py-2.5 text-sm rounded-lg border border-green-200 bg-green-50 text-green-950 placeholder:text-green-700/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-700 focus-visible:ring-offset-2"
                    />
                    <button
                      type="submit"
                      disabled={!newMessage.trim()}
                      className="p-2.5 rounded-lg bg-green-700 text-white hover:bg-green-900 disabled:opacity-50 disabled:cursor-not-allowed transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-700 focus-visible:ring-offset-2"
                      aria-label="Envoyer le message"
                    >
                      <Send className="h-4 w-4" aria-hidden="true" />
                    </button>
                  </form>
                </div>
              </>
            ) : (
              <div className="flex-1 flex items-center justify-center">
                <p className="text-sm text-green-700">
                  Selectionnez une conversation
                </p>
              </div>
            )}
          </div>
        </div>
      </main>
    </>
  );
}
