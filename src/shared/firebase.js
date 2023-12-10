import {initializeApp} from 'firebase/app';
import {getAuth} from 'firebase/auth';
import {
  getFirestore,
  collection,
  doc,
  query,
  where,
  getDocs,
  getDoc,
  addDoc,
  deleteDoc,
  updateDoc,
} from 'firebase/firestore';
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
    const createdAt = doc.data()['createdAt'];
    const formattedCreatedAt = createdAt ? createdAt.toDate().toLocaleString('ko-KR', {timeZone: 'Asia/Seoul'}) : null;

    data.push({
      ...doc.data(),
      createdAt: formattedCreatedAt,
    });
  });
  return data;
};

//일반 로그인한 경우 파이어스토어에서 유저 닉네임,이미지 가져오기
export const getUserInfo = async uid => {
  const userRef = doc(db, 'users', uid);
  const userSnap = await getDoc(userRef);
  let data;
  if (userSnap.exists()) {
    const {avatar, nickname, region, difficulty} = userSnap.data();
    data = {displayName: nickname, photoURL: avatar, region, difficulty};
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

export const updateCommentStore = async (id, text) => {
  //동일한 댓글 id만 업데이트 하도록 설정
  const updated = query(collection(db, 'comments'), where('id', '==', id));
  const data = await getDocs(updated);
  return await updateDoc(data.docs[0].ref, {
    comment: text,
  });
};

export default db;
