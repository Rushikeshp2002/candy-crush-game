/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useState, useRef } from "react";
import "./App.css";
import { useAppDispatch, useAppSelector } from "./store/hooks";
import { moveBelow, updateBoard } from "./store";
import { createBoard } from "./utils/createBoard";
import Board from "./components/Board";
import {
  checkForRowOfFour,
  checkForRowOfThree,
  isColumnOfFour,
  isColumnOfThree,
} from "./utils/moveCheckLogic";
import { formulasForColumn, generateInvalidMoves } from "./utils/formulas";
import { formulasForThree } from "./utils/formulas";
import GameLogo from "./assets/png-clipart-candy-crush-saga-logo-candy-crush-saga-logo-icons-logos-emojis-tech-companies.png";
import CandyAudio from "./assets/wrapped-candy-created1-101soundboards.mp3";
import backgroundMusicFile from "./assets/loop-bg.mp3";

function App() {
 
  const [playSound, setPlaySound] = useState(false);
  
  const dispatch = useAppDispatch();
  const candysound = new Audio(CandyAudio);
  candysound.preload = "auto";
  const board = useAppSelector(({ candyCrush: { board } }) => board);
  const boardSize = useAppSelector(
    ({ candyCrush: { boardSize } }) => boardSize
  );
  // bg music 
  const audioRef = useRef<HTMLAudioElement | null>(null);
  useEffect(() => {
    const audio = new Audio(backgroundMusicFile);
    audioRef.current = audio;

    audio.addEventListener('ended', () => {
      audio.currentTime = 0;
      audio.play();
    });

    audio.play().catch((error) => {
      console.error('Failed to play background music:', error);
    });

    return () => {
      audio.removeEventListener('ended', () => {});
      audio.pause();
    };
  }, []);

  useEffect(() => {
    if (playSound) {
      candysound.play();
      setPlaySound(false);
    }
  }, [playSound]);

  useEffect(() => {
    dispatch(updateBoard(createBoard(boardSize)));
  }, [boardSize, dispatch]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      const newBoard = [...board];
      // isColumnOfFour(newBoard, boardSize,formulasForColumn(boardSize));
      // isColumnOfThree(newBoard, boardSize,formulasForThree(boardSize));
      // checkForRowOfFour(newBoard,boardSize,generateInvalidMoves(boardSize,true));
      // checkForRowOfThree(newBoard,boardSize,generateInvalidMoves(boardSize));
      // dispatch(updateBoard(newBoard));
      // dispatch(moveBelow());
      const columnOfFour = isColumnOfFour(
        newBoard,
        boardSize,
        formulasForColumn(boardSize)
      );
      const columnOfThree = isColumnOfThree(
        newBoard,
        boardSize,
        formulasForThree(boardSize)
      );
      const rowOfFour = checkForRowOfFour(
        newBoard,
        boardSize,
        generateInvalidMoves(boardSize, true)
      );
      const rowOfThree = checkForRowOfThree(
        newBoard,
        boardSize,
        generateInvalidMoves(boardSize)
      );
      dispatch(moveBelow());

      if (columnOfFour || columnOfThree || rowOfFour || rowOfThree) {
        dispatch(updateBoard(newBoard));
        setPlaySound(true);
      }
    }, 200);
    return () => clearInterval(timeout);
  }, [board, boardSize, dispatch]);

 
 
  return (
    <div className="flex items-center h-screen justify-center flex-col">
      <img
        src={GameLogo}
        alt=""
        className="lg:w-52 md:32 sm:32 top-6 left-2 absolute"
        style={{
          ...(window.innerWidth < 400 && {
            width: "10rem",
            position: "relative",
            margin: "0px",
            marginBottom: "-2rem",
            marginTop: "-4.6rem",
          }),
          ...(window.innerWidth < 1000 && {
            width: "10rem",
            position: "relative",
            margin: "0px",
            marginBottom: "-2rem",
            marginTop: "-4.6rem",
          }),
        }}
      />
      <Board />
      <h1 className="text-black rounded-sm lg:p-2   absolute top-0 bg-white right-0  text-sm">Made with 💖 Rushikesh Patil</h1>
      <h1 className="text-white rounded-lg p-2 font-bold  absolute bottom-20 bg-red-500  text-lg" style={{
          ...(window.innerWidth > 400 && {
            display: "none"
          }),
        }}>Only playable on desktop!!!</h1>
    </div>
  );
}

export default App;
