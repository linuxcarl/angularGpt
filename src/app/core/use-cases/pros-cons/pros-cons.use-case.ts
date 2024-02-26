import { prosConsResponse } from '@interfaces/pros-cons.response';
import { environment } from 'environments/environment.development';

export const prosConsCase = async (prompt: string) => {
  try {
    const responses = await fetch(`${environment.apiUrl}/pros-cons`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ prompt }),
    });
    if (!responses.ok) {
      throw new Error('No se pudo realizar la operación');
    }
    const data = (await responses.json()) as prosConsResponse;
    return {
      ok: true,
      ...data,
    };
  } catch (error) {
    return {
      ok: false,
      role: '',
      content: 'No fue posible realizar la operación.',
    };
  }
};
