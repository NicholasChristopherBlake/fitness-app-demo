"use client";
import AddExerciseForm from "@/components/workout/AddExerciseForm";
import ExerciseList from "@/components/workout/ExerciseList";
import Calendar from "@/features/Calendar";
import { getInfo } from "@/features/GetInfoFromDb";
import React, { useEffect, useState } from "react";

interface IExercise {
  exercise: string;
  weight: number;
  sets: number;
  reps: number;
}

export default function Page() {
  const [exerciseList, setExerciseList] = useState<IExercise[]>([]);
  const addExercise = (formData: IExercise) => {
    console.log(formData);
    setExerciseList([...exerciseList, formData]);
    console.log(exerciseList);
  };

  const [data, setData] = useState([]);

  const fetchData = async () => {
    const data2 = await getInfo();
    setData(data2[0]);
    console.log(data);
  };

  return (
    <>
      <div className="text-center mx-auto">
        <h1>Create new program</h1>
        <ExerciseList list={exerciseList} />
        <AddExerciseForm onSubmit={addExercise} />
      </div>
      <div>
        <button onClick={() => fetchData()}>fetch data</button>
        {data && (
          <div>
            {data.map((el) => (
              <div key={el.id}>
                {el.id}. {el.username} - {el.password}
              </div>
            ))}
          </div>
        )}
      </div>
      <Calendar />
    </>
  );
}
