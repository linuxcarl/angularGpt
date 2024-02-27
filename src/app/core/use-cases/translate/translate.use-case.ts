import { translateResponse } from '@interfaces/translate.response';
import { environment } from 'environments/environment.development';

export const translateUseCase = async (prompt: string, lang: string) => {
  try {
    const responses = await fetch(`${environment.apiUrl}/translate`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ prompt, lang }),
    });
    if (!responses.ok) {
      throw new Error('No se pudo realizar la tranduccion');
    }
    const data = (await responses.json()) as translateResponse;
    return {
      ok: true,
      ...data,
    };
  } catch (error) {
    return {
      ok: false,
      message: error,
    };
  }
};
