import {initializeApp} from 'firebase/app';
import {getAuth} from 'firebase/auth';
import {getFirestore, collection, doc, query, where, getDocs, getDoc, addDoc, deleteDoc} from 'firebase/firestore';
import {getStorage} from 'firebase/storage';

//파이어베이스 키 .env.local에  저장
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
  measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID,
};

//파이어베이스 초기화
export const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
//파이어베이스 인스턴스 생성
const db = getFirestore(app);
//스토리지 생성
export const storage = getStorage(app);

export const getComments = async () => {
  const querySnapshot = await getDocs(collection(db, 'comments'));
  const data = [];
  querySnapshot.forEach(doc => {
    data.push({
      ...doc.data(),
      //날짜 타임스탬프를 날짜형으로 재변경
      createdAt: doc.data()['createdAt'].toDate(),
    });
  });
  return data;
};

//구글 외에 로그인한 경우 user 파이어스토에서 닉네임 가져오기
export const getUserInfo = async uid => {
  const userRef = doc(db, 'users', uid);
  const userSnap = await getDoc(userRef);
  let data;
  if (userSnap.exists()) {
    const {avatar, nickname} = userSnap.data();
    data = {displayName: nickname, photoURL: avatar};
    return data;
  }
  return null;
};

export const addCommentStore = async comment => {
  await addDoc(collection(db, 'comments'), comment);
};

export const deleteCommentStore = async id => {
  const deleted = query(collection(db, 'comments'), where('id', '==', id));
  const data = await getDocs(deleted);
  return await deleteDoc(data.docs[0].ref);
};

export default db;
