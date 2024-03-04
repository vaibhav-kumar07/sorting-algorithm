"use client";
import React, { useState, useEffect } from "react";
import {
  mergeSort,
  bubbleSort,
  quickSort,
  heapSort,
} from "../utils/sortingAlgorithm";

interface BarProps {
  height: number;
}

const Bar: React.FC<BarProps> = ({ height }) => (
  <div
    style={{
      height: `${height}%`,
      width: "20px",
      backgroundColor: "teal",
      margin: "0 2px",
      display: "inline-block",
    }}
  />
);

const SortingVisualizer: React.FC = () => {
  const [array, setArray] = useState<number[]>([]);

  useEffect(() => {
    resetArray();
  }, []);

  const resetArray = () => {
    const arr = Array.from(
      { length: 50 },
      () => Math.floor(Math.random() * 100) + 5
    );
    setArray(arr);
  };

  const callBubbleSort = async () => {
    const arr = [...array];
    for (let i = arr.length; i > 0; i--) {
      for (let j = 0; j < i - 1; j++) {
        if (arr[j] > arr[j + 1]) {
          [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
          setArray([...arr]);
          await new Promise((resolve) => setTimeout(resolve, 100));
        }
      }
    }
  };
  const callMergeSort = () => {
    const arr = [...array];
    const sortedArray = mergeSort(arr);
    visualizeSortingProcess(sortedArray);
  };

  const callQuickSort = async () => {
    const arr = [...array];
    const sortedArray = quickSort(arr);
    visualizeSortingProcess(sortedArray);
  };

  const callHeapSort = async () => {
    const arr = [...array];
    const sortedArray = heapSort(arr);
    visualizeSortingProcess(sortedArray);
  };

  const visualizeSortingProcess = (sortedArray: number[]) => {
    sortedArray.forEach(async (value, i) => {
      await new Promise((resolve) => setTimeout(resolve, 10));
      setArray(sortedArray.slice(0, i + 1));
    });
  };

  return (
    <div>
      <div style={{ height: "500px", display: "flex", alignItems: "flex-end" }}>
        {array.map((value, idx) => (
          <Bar key={idx} height={value} />
        ))}
      </div>
      <div className="mt-4  mx-auto flex gap-2">
        <button
          onClick={resetArray}
          className="bg-gray-300 text-black px-4 py-2 rounded-md"
        >
          Generate New Array
        </button>
        <button
          onClick={callBubbleSort}
          className="bg-yellow-500 text-black px-4 py-2 rounded-md"
        >
          Bubble Sort
        </button>
        <button
          onClick={callMergeSort}
          className="bg-green-500 text-black px-4 py-2 rounded-md"
        >
          Merge Sort
        </button>
        <button
          onClick={callQuickSort}
          className="bg-blue-500 text-white px-4 py-2 rounded-md"
        >
          Quick Sort
        </button>
        <button
          onClick={callHeapSort}
          className="bg-purple-500 text-white px-4 py-2 rounded-md"
        >
          Heap Sort
        </button>
      </div>
    </div>
  );
};

export default SortingVisualizer;
