import { environment } from 'environments/environment.development';

type generetedImage = Image | null;
interface Image {
  url: string;
  alt: string;
}
export const imageVariationUseCase = async (
  baseImage: string
): Promise<generetedImage> => {
  try {
    const resp = await fetch(`${environment.apiUrl}/imagen-variation`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ baseImage }),
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
