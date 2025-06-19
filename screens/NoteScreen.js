
import { useNavigation, useRoute } from '@react-navigation/native';
import { Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { deleteNoteById } from '../utils/storage';

export default function NoteScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const { note } = route.params;

  const handleDelete = () => {
    Alert.alert(
      'Delete Note',
      'Are you sure you want to delete this note?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            await deleteNoteById(note.id);
            navigation.navigate('Dashboard');
          },
        },
      ]
    );
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'Important':
        return '#E63946';
      case 'Normal':
        return '#F4A261';
      case 'Reminder':
        return '#A8DADC';
      default:
        return '#ccc';
    }
  };

  return (
    <View style={styles.container}>
      <View style={[styles.noteCard, { borderLeftColor: getPriorityColor(note.priority) }]}>
        <Text style={styles.title}>{note.title}</Text>
        <Text style={styles.date}>{note.date}</Text>
        <Text style={styles.content}>{note.content}</Text>
      </View>

      <View style={styles.actions}>
        <TouchableOpacity
          style={[styles.button, styles.editButton]}
          onPress={() => navigation.navigate('Form', { note })}
        >
          <Text style={styles.buttonText}>Edit</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, styles.deleteButton]}
          onPress={handleDelete}
        >
          <Text style={styles.buttonText}>Delete</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#F1FAEE',
  },
  noteCard: {
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderLeftWidth: 6,
    borderRadius: 8,
  },
  title: {
    fontSize: 22,
    fontFamily: 'Montserrat_700Bold',
    marginBottom: 6,
    color: '#1D3557',
  },
  date: {
    fontSize: 14,
    fontFamily: 'Montserrat_400Regular',
    color: '#6C757D',
    marginBottom: 12,
  },
  content: {
    fontSize: 16,
    fontFamily: 'Montserrat_400Regular',
    color: '#343A40',
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 25,
  },
  button: {
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 8,
  },
  editButton: {
    backgroundColor: '#457B9D',
  },
  deleteButton: {
    backgroundColor: '#E63946',
  },
  buttonText: {
    color: '#fff',
    fontFamily: 'Montserrat_700Bold',
  },
});
