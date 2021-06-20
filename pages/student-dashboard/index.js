import React, { useEffect, useState } from "react";
/**
 *
 * @createdBy Aurosmruti Das
 * @email aurosmruti.das@gmail.com
 * @description index.js
 * @createdOn 13/06/21 10:08 PM
 */
import MyAppBar from "./components/my_app_bar";

const StudentDashboard = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    console.log("sstudent dashboard page :", currentIndex);
  }, []);

  return (
    <>
      <MyAppBar currentIndex={currentIndex} onChanged={setCurrentIndex} />
    </>
  );
};

export default StudentDashboard;
