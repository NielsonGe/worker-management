import { Plugins, CameraResultType, CameraSource } from "@capacitor/core";

const convertBlobToBase64 = (blob: Blob) => new Promise((resolve, reject) => {
  const reader = new FileReader;
  reader.onerror = reject;
  reader.onload = () => {
      resolve(reader.result);
  };
  reader.readAsDataURL(blob);
});

function PhotoPlugin() {
  const { Camera } = Plugins;

  const takePhoto = async (): Promise<string> => {
    const cameraPhoto = await Camera.getPhoto({
      resultType: CameraResultType.Uri,
      source: CameraSource.Camera,
      quality: 100
    });

    const response = await fetch(cameraPhoto.webPath!);
    const blob = await response.blob();
    const base64Data: string = await convertBlobToBase64(blob) as string;

    return base64Data;
  };

  return {
    takePhoto
  };
}

export { PhotoPlugin }