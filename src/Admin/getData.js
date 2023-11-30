import firestore from '@react-native-firebase/firestore';
import Toast from 'react-native-toast-message';

export async function getData() {
  try {
    const bookingsCollectionRef = firestore().collection('Bookings');
    const querySnapshot = await bookingsCollectionRef.get();
    const bookings = querySnapshot.docs.map(doc =>
      Object.assign(doc.data(), {
        id: doc.id
      })
    );
    const EmployeeCollectionRef = firestore().collection('Users').where('isEmployee', '==', true);
    const EmployeeQuerySnapshot = await EmployeeCollectionRef.get();
    const Employee = EmployeeQuerySnapshot.docs.map(doc => {
      return {
        label: doc.data().displayName,
        value: doc.data().uid
      };
    });
    setAllBookingData(bookings);
    setAllEmployeeData(Employee);
    setLoading(false);
  } catch (error) {
    Toast.show({
      type: 'error',
      text1: `Error fetching documents`,
      text2: error,
      visibilityTime: 5000,
      style: {
        backgroundColor: 'red'
      }
    });
    throw error;
  }
}
