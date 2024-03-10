import { audioToTextResponse } from '@interfaces/index';
import { environment } from 'environments/environment.development';

export const audioToTextUseCase = async (audioFile: File, prompt?: string) => {
  try {
    const formData = new FormData();
    formData.append('file', audioFile);
    if (prompt) {
      formData.append('prompt', prompt);
    }

    const responses = await fetch(`${environment.apiUrl}/audio-to-text`, {
      method: 'POST',
      body: formData,
    });
    if (!responses.ok) {
      throw new Error('No se pudo realizar la tranformacion de audio a texto');
    }
    const data = (await responses.json()) as audioToTextResponse;
    return data;
  } catch (error) {
    return error;
  }
};
