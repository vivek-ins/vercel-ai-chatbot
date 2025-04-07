import { Message } from 'ai';

import { cn } from '@/lib/utils';
import { CodeBlock } from '@/components/ui/codeblock';
import { MemoizedReactMarkdown } from '@/components/markdown';
import { IconOpenAI, IconUser } from '@/components/ui/icons';
import { ChatMessageActions } from '@/components/chat-message-actions';

export interface ChatMessageProps {
  message: Message;
}

export function ChatMessage({ message, ...props }: ChatMessageProps) {
  return (
    <div
      className={cn('group relative mb-4 flex items-start md:-ml-12')}
      {...props}
    >
      <div
        className={cn(
          'flex size-8 shrink-0 select-none items-center justify-center rounded-md border shadow',
          message.role === 'user'
            ? 'bg-background'
            : 'bg-primary text-primary-foreground'
        )}
      >
        {message.role === 'user' ? <IconUser /> : <IconOpenAI />}
      </div>
      <div className="ml-4 flex-1 space-y-2 overflow-hidden px-1">
        <MemoizedReactMarkdown
          className="prose break-words dark:prose-invert prose-p:leading-relaxed prose-pre:p-0"
          remarkPlugins={[
            require('remark-gfm').default
          ]}
          components={{

            p({ children }) {
              return <p className="mb-2 last:mb-0">{children}</p>;
            },
            code({ node, inline, className, children, ...props }) {
              const childText = String(children);

              if (childText === '▍') {
                return (
                  <span className="mt-1 animate-pulse cursor-default">▍</span>
                );
              }

              // Handle cursor placeholder
              const formattedText = childText.replace(/`▍`/g, '▍');

              const match = /language-(\w+)/.exec(className || '');

              if (inline) {
                return (
                  <code className={className} {...props}>
                    {formattedText}
                  </code>
                );
              }

              // Use a stable key based on content
              const codeKey = `code-${formattedText
                .slice(0, 20)
                .replace(/\W/g, '')}-${match?.[1] || 'plain'}`;

              return (
                <CodeBlock
                  key={codeKey}
                  language={(match && match[1]) || ''}
                  value={formattedText.replace(/\n$/, '')}
                  {...props}
                />
              );
            },
          }}
        >
          {message.content || ''}
        </MemoizedReactMarkdown>
        <ChatMessageActions message={message} />
      </div>
    </div>
  );
}
