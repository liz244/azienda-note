
import { useNavigation, useRoute } from '@react-navigation/native';
import { useState } from 'react';
import {
  Alert,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { v4 as uuidv4 } from 'uuid';
import { loadNotes, saveNotes } from '../utils/storage';

export default function FormScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const editingNote = route.params?.note;

  const [title, setTitle] = useState(editingNote?.title || '');
  const [content, setContent] = useState(editingNote?.content || '');
  const [priority, setPriority] = useState(editingNote?.priority || 'Normal');

  const handleSave = async () => {
    if (!title.trim() || !content.trim()) {
      Alert.alert('Missing info', 'Title and content are required.');
      return;
    }

    const notes = await loadNotes();

    const newNote = {
      id: editingNote ? editingNote.id : uuidv4(),
      title,
      content,
      date: editingNote ? editingNote.date : new Date().toISOString().split('T')[0],
      priority,
    };

    const updatedNotes = editingNote
      ? notes.map((n) => (n.id === editingNote.id ? newNote : n))
      : [newNote, ...notes];

    await saveNotes(updatedNotes);
    navigation.navigate('Dashboard');
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Title"
        value={title}
        onChangeText={setTitle}
        style={styles.input}
        placeholderTextColor="#6C757D"
      />

      <TextInput
        placeholder="Content"
        value={content}
        onChangeText={setContent}
        style={[styles.input, styles.textArea]}
        multiline
        numberOfLines={5}
        placeholderTextColor="#6C757D"
      />

      <Text style={styles.label}>Priority:</Text>
      <View style={styles.priorityContainer}>
        {['Important', 'Normal', 'Reminder'].map((level) => (
          <TouchableOpacity
            key={level}
            style={[styles.priorityButton, priority === level && styles.selectedPriority]}
            onPress={() => setPriority(level)}
          >
            <Text style={styles.priorityText}>{level}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
        <Text style={styles.saveButtonText}>Save</Text>
      </TouchableOpacity>
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
    backgroundColor: '#FFFFFF',
    padding: 12,
    marginBottom: 15,
    borderRadius: 8,
    fontFamily: 'Montserrat_400Regular',
    fontSize: 16,
    color: '#343A40',
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  label: {
    fontFamily: 'Montserrat_700Bold',
    fontSize: 16,
    marginBottom: 8,
    color: '#1D3557',
  },
  priorityContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  priorityButton: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    backgroundColor: '#D3D3D3',
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
  saveButton: {
    backgroundColor: '#1D3557',
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 16,
    fontFamily: 'Montserrat_700Bold',
  },
});