import * as ImagePicker from 'expo-image-picker';
import { Alert } from 'react-native';

/**
 * Picks an image from camera or gallery.
 * @param {'camera' | 'gallery'} source
 * @returns The selected image URI, or null if cancelled or permission denied
 */
export const pickImage = async (source: 'camera' | 'gallery'): Promise<string | null> => {
  try {
    if (source === 'camera') {
      const cameraPermission = await ImagePicker.requestCameraPermissionsAsync();
      if (!cameraPermission.granted) {
        Alert.alert('Permiso denegado', 'Se necesita acceso a la cámara');
        return null;
      }

      const result = await ImagePicker.launchCameraAsync({
        allowsEditing: true,
        aspect: undefined,
        quality: 1,
      });

      if (!result.canceled) {
        return result.assets[0].uri;
      }
    } else if (source === 'gallery') {
      const galleryPermission = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (!galleryPermission.granted) {
        Alert.alert('Permiso denegado', 'Se necesita acceso a la galería');
        return null;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: undefined,
        quality: 1,
      });

      if (!result.canceled) {
        return result.assets[0].uri;
      }
    }

    return null;
  } catch (error) {
    console.error('Error picking image:', error);
    return null;
  }
};
