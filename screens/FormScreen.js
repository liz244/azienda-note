import { useNavigation, useRoute } from '@react-navigation/native';
import { useState } from 'react';
import {
  Alert,
  Button,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { generateId } from '../utils/generateId';

import { loadNotes, saveNotes } from '../utils/storage';

export default function FormScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const editingNote = route.params?.note;

  const [title, setTitle] = useState(editingNote?.title || '');
  const [content, setContent] = useState(editingNote?.content || '');
  const [priority, setPriority] = useState(editingNote?.priority || 'Normal');

  const handleSave = async () => {
    console.log('Save pressed');

    if (!title.trim() || !content.trim()) {
      Alert.alert('Missing info', 'Title and content are required.');
      return;
    }

    try {
      const notes = await loadNotes();

      const newNote = {
       id: editingNote ? editingNote.id : generateId(),

        title,
        content,
        date: editingNote ? editingNote.date : new Date().toISOString().split('T')[0],
        priority,
      };

      const updatedNotes = editingNote
        ? notes.map((n) => (n.id === editingNote.id ? newNote : n))
        : [newNote, ...notes];

      console.log('Saving note:', newNote);
      await saveNotes(updatedNotes);
      console.log('Saved successfully');

      navigation.navigate('Dashboard');
    } catch (e) {
      console.error('Error saving note:', e);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Title"
        value={title}
        onChangeText={setTitle}
        style={styles.input}
      />
      <TextInput
        placeholder="Content"
        value={content}
        onChangeText={setContent}
        style={[styles.input, styles.textArea]}
        multiline
        numberOfLines={5}
      />
      <Text style={styles.label}>Priority:</Text>
      <View style={styles.priorityContainer}>
        {['Important', 'Normal', 'Reminder'].map((level) => (
          <TouchableOpacity
            key={level}
            style={[
              styles.priorityButton,
              priority === level && styles.selectedPriority,
            ]}
            onPress={() => setPriority(level)}
          >
            <Text style={styles.priorityText}>{level}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <Button title="Save" onPress={handleSave} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#F1FAEE',
  },
  input: {
    backgroundColor: '#eee',
    padding: 12,
    marginBottom: 15,
    borderRadius: 8,
    fontFamily: 'Montserrat_400Regular',
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  label: {
    fontWeight: 'bold',
    marginBottom: 5,
    fontFamily: 'Montserrat_700Bold',
  },
  priorityContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  priorityButton: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    backgroundColor: '#ddd',
    borderRadius: 8,
    marginRight: 10,
  },
  selectedPriority: {
    backgroundColor: '#457B9D',
  },
  priorityText: {
    color: '#fff',
    fontFamily: 'Montserrat_700Bold',
  },
});
