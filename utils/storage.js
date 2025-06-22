
import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY = 'NOTES_DATA';

export const saveNotes = async (notes) => {
  try {
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(notes));
  } catch (error) {
    console.error('Error saving notes:', error);
  }
};

export const loadNotes = async () => {
  try {
    const json = await AsyncStorage.getItem(STORAGE_KEY);
    return json != null ? JSON.parse(json) : [];
  } catch (error) {
    console.error('Error loading notes:', error);
    return [];
  }
};

export const deleteNoteById = async (id) => {
  try {
    const notes = await loadNotes();
    const updated = notes.filter((note) => note.id !== id);
    await saveNotes(updated);
    return updated;
  } catch (error) {
    console.error('Error deleting note:', error);
  }
};
