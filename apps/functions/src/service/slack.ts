import type {
  Block,
  DividerBlock,
  HeaderBlock,
  RichTextBlock,
} from '@slack/types';
import type {
  IncomingWebhookResult,
  IncomingWebhookSendArguments,
} from '@slack/webhook';

// DONT: Use @slack/webhook implementation.
//       @slack/webhook is not compatible Cloudflare Workers because of requiring some node builtin modules.
export const sendMessage = async (
  url: string,
  payload: IncomingWebhookSendArguments,
): Promise<IncomingWebhookResult> => {
  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });

  const responseText = await res.text();

  if (!res.ok) {
    console.error('Failed to send message to slack.', {
      status: res.status,
      body: responseText,
    });
  }

  return { text: responseText } as IncomingWebhookResult;
};

type KV = {
  [key: string]: string | undefined;
};

export const buildMessage = (title: string, keyValue: KV): Block[] => {
  const blocks: Block[] = [];

  blocks.push(newHeader(title));

  for (const key of Object.keys(keyValue)) {
    blocks.push(newKeyValue(key, keyValue[key]));
    blocks.push(newDivider());
  }

  blocks.pop(); // remove last divider

  return blocks;
};

export const newHeader = (text: string): HeaderBlock => {
  return {
    type: 'header',
    text: {
      type: 'plain_text',
      text: text,
    },
  };
};

export const newKeyValue = (
  key: string,
  value: string | undefined,
): RichTextBlock => {
  return {
    type: 'rich_text',
    elements: [
      {
        type: 'rich_text_section',
        elements: [
          {
            type: 'text',
            text: key,
            style: {
              bold: true,
            },
          },
        ],
      },
      {
        type: 'rich_text_section',
        elements: [
          {
            type: 'text',
            text: value || '',
          },
        ],
      },
    ],
  };
};

export const newDivider = (): DividerBlock => {
  return {
    type: 'divider',
  };
};
