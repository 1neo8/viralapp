
import * as MediaLibrary from 'expo-media-library';
import * as FileSystem from 'expo-file-system';

export async function saveToCameraRoll(uri) {
  const { status } = await MediaLibrary.requestPermissionsAsync();
  if (status !== 'granted') throw new Error('Permission denied');

  const asset = await MediaLibrary.createAssetAsync(uri);
  return asset;
}
