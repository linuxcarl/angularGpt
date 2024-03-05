import { environment } from 'environments/environment.development';

export const textToAudioUseCase = async (prompt: string, voice: string) => {
  try {
    const responses = await fetch(`${environment.apiUrl}/text-to-audio`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ prompt, voice }),
    });
    if (!responses.ok) {
      throw new Error('No se pudo realizar la tranformacion de texto a audio');
    }
    const audioFile = await responses.blob();
    const audioUrl = URL.createObjectURL(audioFile);
    return {
      ok: true,
      message: prompt,
      audioUrl: audioUrl,
    };
  } catch (error) {
    return {
      ok: false,
      message: error,
      audioUrl: '',
    };
  }
};
