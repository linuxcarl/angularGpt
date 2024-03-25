import { environment } from 'environments/environment.development';

type generetedImage = Image | null;
interface Image {
  url: string;
  alt: string;
}
export const imageGenerationUseCase = async (
  prompt: string,
  originalImage?: string,
  maskImage?: string
): Promise<generetedImage> => {
  try {
    const resp = await fetch(`${environment.apiUrl}/texto-to-imagen`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        prompt,
        originalImage,
        maskImage,
      }),
    });
    const { url, revised_prompt: alt } = await resp.json();
    return {
      url,
      alt,
    };
  } catch (error) {
    console.log(error);
    return null;
  }
};
