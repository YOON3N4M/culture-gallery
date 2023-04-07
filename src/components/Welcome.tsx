import { doc, getDoc, setDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { dbService } from "../fBase";

interface DummyT {
  book?: any;
  internationalMovie?: any;
  tv?: any;
}

function Welcome() {
  const [dummy, setDummy] = useState<DummyT>();
  const [chosenContents, setChosenContents] = useState();

  async function getDummyData() {
    const dummyRef = doc(dbService, "user", "2iq902jOUIXtIi7OdljMw66DX1x1");
    const docSnap = await getDoc(dummyRef);
    if (docSnap.exists() && docSnap.data() !== undefined) {
      setDummy(docSnap.data());
    }
  }

  useEffect(() => {
    getDummyData();
  }, []);
  useEffect(() => {
    if (dummy !== undefined) {
      setChosenContents(dummy.internationalMovie);
    }
  }, [dummy]);

  return <></>;
}
export default Welcome;
