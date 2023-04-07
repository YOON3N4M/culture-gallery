import { doc, getDoc, setDoc } from "firebase/firestore";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { dbService } from "../fBase";

function Welcome() {
  async function getDummyData() {
    const dummyRef = doc(dbService, "user", "dummy");
    const docSnap = await getDoc(dummyRef);
    console.log(docSnap.data());
  }

  useEffect(() => {
    getDummyData();
  }, []);

  return <></>;
}
export default Welcome;
