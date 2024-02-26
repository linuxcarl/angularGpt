import { prosConsResponse } from '@interfaces/pros-cons.response';
import { environment } from 'environments/environment.development';

export async function* prosConsStreamCase(
  prompt: string,
  abortSignal?: AbortSignal
) {
  try {
    const responses = await fetch(`${environment.apiUrl}/pros-cons-stream`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ prompt }),
      signal: abortSignal,
    });
    if (!responses.ok) {
      throw new Error('No se pudo realizar la operación');
    }
    const reader = responses.body?.getReader();
    if (!reader) {
      console.log('No se pudo generar el reader');
      throw new Error('No se pudo generar el reader');
    }
    const decoder = new TextDecoder();
    let text = '';
    while (true) {
      const { value, done } = await reader.read();
      if (done) {
        break;
      }
      const decodedChunk = decoder.decode(value, { stream: true });
      text += decodedChunk;
      yield text;
    }
    return text;
  } catch (error) {
    return null;
  }
}
