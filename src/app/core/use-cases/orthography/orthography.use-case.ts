import type { orthographyResponse } from '@interfaces/orthography.response';
import { environment } from 'environments/environment.development';

export const orthographyCase = async (prompt: string) => {
  try {
    const responses = await fetch(`${environment.apiUrl}/orthography-check`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ prompt }),
    });
    if (!responses.ok) {
      throw new Error('No se pudo realizar la operación');
    }
    const data = (await responses.json()) as orthographyResponse;
    return {
      ok: true,
      ...data,
    };
  } catch (error) {
    return {
      ok: false,
      userScore: 0,
      errors: [],
      message: error,
      hasDude: false,
    };
  }
};
