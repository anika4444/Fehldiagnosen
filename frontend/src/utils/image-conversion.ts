import { ImageManipulator, SaveFormat } from "expo-image-manipulator";

export interface PickedFile {
  uri: string;
  name: string;
  type: string;
}

// iPhones speichern Fotos als HEIC/HEIF; das Backend akzeptiert nur PDF, PNG und JPEG
export const isHeic = (file: {
  name?: string | null;
  mimeType?: string | null;
}) =>
  /^image\/hei[cf]/i.test(file.mimeType ?? "") ||
  /\.hei[cf]$/i.test(file.name ?? "");

// Wandelt ein Bild in JPEG um; wirft, wenn das Gerät/der Browser das Format nicht dekodieren kann
export const convertToJpeg = async (file: {
  uri: string;
  name?: string | null;
}): Promise<PickedFile> => {
  const image = await ImageManipulator.manipulate(file.uri).renderAsync();
  const result = await image.saveAsync({
    format: SaveFormat.JPEG,
    compress: 0.9,
  });

  const baseName = (file.name ?? "arztbrief").replace(/\.[^.]+$/, "");
  return { uri: result.uri, name: `${baseName}.jpg`, type: "image/jpeg" };
};
