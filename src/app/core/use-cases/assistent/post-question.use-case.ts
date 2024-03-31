import { AssistentQuestionResponse } from '@interfaces/assistent-question.response';
import { environment } from 'environments/environment.development';

export const postQuestionUseCase = async (
  threadId: string,
  question: string
) => {
  try {
    const resp = await fetch(`${environment.apiUrlAssistent}/user-question`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ threadId, question }),
    });
    const replies = (await resp.json()) as AssistentQuestionResponse[];
    return replies;
  } catch (error) {
    throw new Error('Error creating thread');
  }
};
