"use client"

import { useState, useRef, useEffect, ChangeEvent } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export default function Countdown() {
    // State to manage the duration input
    const [duration, setDuration] = useState<number | string>("");
    // State to manage the countdown timer value
    const [timeLeft, setTimeLeft] = useState<number>(0);
    // State to track if the timer is active
    const [isActive, setIsActive] = useState<boolean>(false);
    // State to track if the timer is paused
    const [isPaused, setIsPaused] = useState<boolean>(false);
    // Reference to store the timer ID
    const timerRef = useRef<NodeJS.Timeout | null>(null);
  
    // Function to handle setting the duration of the countdown
    const handleSetDuration = (): void => {
      if (typeof duration === "number" && duration > 0) {
        setTimeLeft(duration); // Set the countdown timer
        setIsActive(false); // Reset active state
        setIsPaused(false); // Reset paused state
        // Clear any existing timer
        if (timerRef.current) {
          clearInterval(timerRef.current);
        }
      }
    };
  
    // Function to start the countdown timer
    const handleStart = (): void => {
        if (timeLeft > 0) {
            setIsActive(true); // Set the timer as active
            setIsPaused(false); // Unpause the timer if it was paused
          }
        };
      
        // Function to pause the countdown timer
        const handlePause = (): void => {
          if (isActive) {
            setIsPaused(true); // Set the timer as paused
            setIsActive(false); // Set the timer as inactive
            // Clear any existing timer
            if (timerRef.current) {
              clearInterval(timerRef.current);
            }
          }
        };
      
        // Function to reset the countdown timer
        const handleReset = (): void => {
          setIsActive(false); // Set the timer as inactive
          setIsPaused(false); // Set the timer as not paused
          setTimeLeft(typeof duration === "number" ? duration : 0); // Reset the timer to the original duration
          // Clear any existing timer
          if (timerRef.current) {
            clearInterval(timerRef.current);
        }
    };
  
    // useEffect hook to manage the countdown interval
    useEffect(() => {
      // If the timer is active and not paused
      if (isActive && !isPaused) {
        // Set an interval to decrease the time left
        timerRef.current = setInterval(() => {
          setTimeLeft((prevTime) => {
            // If time is up, clear the interval
            if (prevTime <= 1) {
              clearInterval(timerRef.current!);
              return 0;
            }
            // Decrease the time left by one second
            return prevTime - 1;
          });
        }, 1000); // Interval of 1 second
      }
      // Cleanup function to clear the interval
      return () => {
        if (timerRef.current) {
            clearInterval(timerRef.current);
        }
      };
    }, [isActive, isPaused]); // Dependencies array to rerun the effect
  
    // Function to format the time left into mm:ss format
    const formatTime = (time: number): string => {
      const minutes = Math.floor(time / 60); // Calculate minutes
      const seconds = time % 60; // Calculate seconds
      // Return the formatted string
      return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(
        2,
        "0"
      )}`;
    };
  
    // Function to handle changes in the duration input field
    const handleDurationChange = (e: ChangeEvent<HTMLInputElement>): void => {
      setDuration(Number(e.target.value) || ""); // Update the duration state
    };
  
    // JSX return statement rendering the Countdown UI
    return (
        // Container div for centering the content
        <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-br from-purple-300 to-pink-300">
          {/* Timer box container */}
          <div className="bg-pink-300 dark:bg-pink-400 border shadow-lg rounded-lg p-8 w-full max-w-md">
            {/* Title of the countdown timer */}
            <h1 className="text-3xl font-bold mb-4 text-pink-800 dark:text-gray-200 text-center">
              Countdown Timer
            </h1>
            {/* Input and set button container */}
            <div className="flex items-center mb-6">
              <Input
                type="number"
                id="duration"
                placeholder="Enter duration in seconds"
                value={duration}
                onChange={handleDurationChange}
                className="flex-1 mr-4 rounded-md border-pink-600"
                />
                <Button
                  onClick={handleSetDuration}
                  variant="outline"
                  className="px-6 py-4 text-xl font-semibold text-center text-white transition duration-300 rounded-lg hover:from-purple-600 hover:to-pink-600 ease bg-gradient-to-br from-purple-500 to-pink-500 md:w-auto"
                >
                  Set
                </Button>
              </div>
              {/* Display the formatted time left */}
              <div className="text-6xl font-bold text-pink-800 dark:text-gray-200 mb-8 text-center">
                {formatTime(timeLeft)}
              </div>
              {/* Buttons to start, pause, and reset the timer */}
              <div className="flex justify-center gap-4">
                <Button
                  onClick={handleStart}
                  variant="outline"
                  className="px-6 py-4 text-xl font-semibold text-center text-white transition duration-300 rounded-lg hover:from-purple-600 hover:to-pink-600 ease bg-gradient-to-br from-purple-500 to-pink-500 md:w-auto"
                >
 {isPaused ? "Resume" : "Start"}
          </Button>
          <Button
            onClick={handlePause}
            variant="outline"
            className="px-6 py-4 text-xl font-semibold text-center text-white transition duration-300 rounded-lg hover:from-purple-600 hover:to-pink-600 ease bg-gradient-to-br from-purple-500 to-pink-500 md:w-auto"
          >
            Pause
          </Button>
          <Button
            onClick={handleReset}
            variant="outline"
            className="px-6 py-4 text-xl font-semibold text-center text-white transition duration-300 rounded-lg hover:from-purple-600 hover:to-pink-600 ease bg-gradient-to-br from-purple-500 to-pink-500 md:w-auto"
          >
            Reset
          </Button>
        </div>
      </div>
 </div>
);
}                      