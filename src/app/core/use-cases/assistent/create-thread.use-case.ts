import { environment } from 'environments/environment.development';

export const createThreadUseCase = async () => {
  try {
    const resp = await fetch(`${environment.apiUrlAssistent}/create-thread`, {
      method: 'POST',
    });
    const { id } = (await resp.json()) as { id: string };
    return id;
  } catch (error) {
    throw new Error('Error creating thread');
  }
};
