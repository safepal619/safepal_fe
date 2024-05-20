
import { initializeApp } from "firebase/app";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAT_m_q-w7zsAcutkSsgbuss7_PkL1kirU",
  authDomain: "safepal-c6061.firebaseapp.com",
  projectId: "safepal-c6061",
  storageBucket: "safepal-c6061.appspot.com",
  messagingSenderId: "674403115859",
  appId: "1:674403115859:web:1c676e59479334335477a6"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

const storage = getStorage(firebaseApp);

// Create a storage reference from our storage service


export const UploadImage = async(image) => {

  const timestamp = Date.now();
        const uniqueFileName = `${timestamp}-${image.name}`;

        // Upload image to Firebase Storage
        const storageRef = ref(storage, uniqueFileName);
        await uploadBytes(storageRef, image);

        // Get download URL of the uploaded image
        const downloadURL = await getDownloadURL(storageRef);

        return downloadURL

}



