import { useNavigation, useRoute } from '@react-navigation/native';
import React from 'react';
import { Alert, Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { deleteNoteById } from '../utils/storage';

export default function NoteScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const { note } = route.params;

  const handleDelete = () => {
    if (Platform.OS === 'web') {
      
      const confirmed = window.confirm('Êtes-vous sûr de vouloir supprimer cette note ?');
      if (confirmed) {
        deleteNote();
      }
    } else {
      Alert.alert(
        'Supprimer la note',
        'Êtes-vous sûr de vouloir supprimer cette note ?',
        [
          { text: 'Annuler', style: 'cancel' },
          { text: 'Supprimer', style: 'destructive', onPress: deleteNote },
        ]
      );
    }
  };

  const deleteNote = async () => {
    try {
      await deleteNoteById(note.id);
      navigation.navigate('Dashboard'); 
    } catch (error) {
      console.error('Erreur lors de la suppression :', error);
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'Important':
        return '#F45B69';
      case 'Normal':
        return '#114B5F';
      case 'Reminder':
        return '#7EE4EC';
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
    padding: 15,
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
    backgroundColor: '#114B5F',
  },
  deleteButton: {
    backgroundColor: '#F45B69',
  },
  buttonText: {
    color: '#fff',
    fontFamily: 'Montserrat_700Bold',
  },
});
