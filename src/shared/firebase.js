import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore, collection, query, where, getDocs, addDoc, deleteDoc } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

//파이어베이스 키 .env.local에  저장
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
  // measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID,
};

//파이어베이스 초기화
export const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
//파이어베이스 인스턴스 생성
const db = getFirestore(app);
//스토리지 생성
export const storage = getStorage(app);

export const getComments = async () => {
  const querySnapshot = await getDocs(collection(db, "comments"));
  const data = [];
  querySnapshot.forEach((doc) => {
    data.push({
      ...doc.data(),
      //날짜 타임스탬프를 날짜형으로 재변경
      createdAt: doc.data()['createdAt'].toDate(),
    });
  })
  return data;
}

export const addCommentStore = async (comment) => {
  await addDoc(collection(db, 'comments'), comment);
};

export const deleteCommentStore = async (id) => {
  //삭제할 다큐먼트 id말고 uuid로 부여한 id가 일치한 comment 삭제
  //await deleteDoc(doc(db,'comments',id));
  const deleted = query(collection(db, "comments"), where("id", '==', id));
  const data = await getDocs(deleted);
  return await deleteDoc(data.docs[0].ref);
}

export default db;
