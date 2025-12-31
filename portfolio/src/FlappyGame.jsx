import React, { useState, useEffect, useRef } from 'react';
import { X, Trophy } from 'lucide-react';
import { initializeApp } from "firebase/app";
import { getDatabase, ref, onValue, set } from "firebase/database";

// --- FIREBASE CONFIG ---
const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: import.meta.env.VITE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_PROJECT_ID,
  databaseURL: import.meta.env.VITE_DATABASE_URL,
  storageBucket: import.meta.env.VITE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_APP_ID,
};

// Initialize Firebase
let db;
try {
  const app = initializeApp(firebaseConfig);
  db = getDatabase(app);
} catch (error) {
  console.error("Firebase init error:", error);
  // Handle offline mode or mock DB if necessary
}

// --- CONFIGURATION ---
const GAME_HEIGHT = 600; 
const GAME_WIDTH = 450; 
const GRAVITY = 0.4; 
const JUMP_STRENGTH = -7.5;
const PIPE_SPEED = 3; 
const PIPE_SPAWN_RATE = 1500; // ms
const PIPE_GAP = 160; 
const BIRD_SIZE = 30; // Define a constant size for the square bird

const FlappyGame = ({ onClose }) => {
  const [gameState, setGameState] = useState('START'); 
  const [birdPos, setBirdPos] = useState(GAME_HEIGHT / 2);
  const [score, setScore] = useState(0);
  const [globalHighScore, setGlobalHighScore] = useState(0);
  const [pipes, setPipes] = useState([]);
  
  // Refs for high-performance mutable state
  const birdVelocity = useRef(0);
  const lastPipeSpawn = useRef(0);
  const gameLoopFrame = useRef(null);

  // 1. Fetch Global High Score
  useEffect(() => {
    if (!db) return;
    const scoreRef = ref(db, 'highscore');
    const unsubscribe = onValue(scoreRef, (snapshot) => {
      const data = snapshot.val();
      if (data) setGlobalHighScore(data);
    });
    return () => unsubscribe();
  }, []);

  // 2. Update Global High Score
  const checkHighScore = (newScore) => {
    if (newScore > globalHighScore) {
      setGlobalHighScore(newScore);
      if (db) set(ref(db, 'highscore'), newScore);
    }
  };

  const spawnPipe = (offset = 0) => {
    const minPipe = 50;
    const maxPipe = GAME_HEIGHT - PIPE_GAP - minPipe;
    const height = Math.random() * (maxPipe - minPipe) + minPipe;
    
    return { x: GAME_WIDTH + offset, height, passed: false };
  };

  const startGame = () => {
    setGameState('PLAYING');
    setBirdPos(GAME_HEIGHT / 2);
    setScore(0);
    birdVelocity.current = 0;
    lastPipeSpawn.current = Date.now();
    
    setPipes([spawnPipe(0)]); 
  };

  const jump = () => {
    if (gameState === 'PLAYING') {
      birdVelocity.current = JUMP_STRENGTH;
    } else if (gameState !== 'PLAYING') {
      startGame();
    }
  };

  // --- MAIN GAME LOOP ---
  useEffect(() => {
    if (gameState !== 'PLAYING') {
      if (gameLoopFrame.current) cancelAnimationFrame(gameLoopFrame.current);
      return;
    }

    const loop = () => {
      const now = Date.now();

      // 1. Update Physics
      birdVelocity.current += GRAVITY;
      
      setBirdPos((prevPos) => {
        const newPos = prevPos + birdVelocity.current;
        // Floor/Ceiling Collision (adjusted for new square size)
        if (newPos > GAME_HEIGHT - BIRD_SIZE || newPos < 0) {
          handleGameOver();
          return prevPos;
        }
        return newPos;
      });

      // 2. Update Pipes
      setPipes((prevPipes) => {
        const newPipes = prevPipes
          .map((pipe) => ({ ...pipe, x: pipe.x - PIPE_SPEED }))
          .filter((pipe) => pipe.x > -60); 

        return newPipes;
      });

      // 3. Spawn New Pipes
      if (now - lastPipeSpawn.current > PIPE_SPAWN_RATE) {
        setPipes((prev) => [...prev, spawnPipe()]);
        lastPipeSpawn.current = now;
      }

      gameLoopFrame.current = requestAnimationFrame(loop);
    };

    loop();

    return () => {
        if (gameLoopFrame.current) cancelAnimationFrame(gameLoopFrame.current);
    }
  }, [gameState]);

  // --- COLLISION & SCORING ---
  useEffect(() => {
    if (gameState !== 'PLAYING') return;

    pipes.forEach((pipe) => {
      // Bird Collision Box
      const birdLeft = 60; 
      const birdRight = birdLeft + BIRD_SIZE;
      // Tighter collision bounds for the square
      const birdTop = birdPos + 2; 
      const birdBottom = birdPos + BIRD_SIZE - 2;

      // Pipe Collision Box
      const pipeLeft = pipe.x;
      const pipeRight = pipe.x + 50;
      const topPipeBottom = pipe.height;
      const bottomPipeTop = pipe.height + PIPE_GAP;

      // Collision Detection
      if (birdRight > pipeLeft && birdLeft < pipeRight) {
        if (birdTop < topPipeBottom || birdBottom > bottomPipeTop) {
          handleGameOver();
        }
      }

      // Score Update
      if (pipeLeft + 50 < birdLeft && !pipe.passed) {
        setScore((s) => s + 1);
        pipe.passed = true;
      }
    });
  }, [birdPos, pipes, gameState]);

  const handleGameOver = () => {
    if (gameState === 'GAMEOVER') return; 
    setGameState('GAMEOVER');
    checkHighScore(score);
  };

  // Keyboard
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.code === 'Space') {
        e.preventDefault();
        jump();
      }
    };
    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [gameState]);

  return (
    <div className="fixed inset-0 bg-black/60 z-[100] flex items-center justify-center backdrop-blur-sm p-4" onClick={onClose}>
      <div 
        className="relative bg-[#f0ece6] border-4 border-[#3e2c26] rounded-xl overflow-hidden shadow-2xl select-none" 
        style={{ width: GAME_WIDTH, height: GAME_HEIGHT, maxWidth: '100%' }}
        onClick={(e) => { e.stopPropagation(); jump(); }}
      >
        {/* Header UI */}
        <button onClick={onClose} className="absolute top-4 right-4 z-20 text-[#3e2c26] hover:bg-[#3e2c26]/10 p-1 rounded-full">
          <X size={24} />
        </button>
        <div className="absolute top-4 left-4 z-20 flex items-center gap-2 bg-[#3e2c26]/10 px-3 py-1 rounded-full border border-[#3e2c26]/20">
          <Trophy size={16} className="text-[#8c6b5d]" />
          <span className="text-[#3e2c26] font-bold text-sm">High Score: {globalHighScore}</span>
        </div>
        <div className="absolute top-12 w-full text-center z-10 pointer-events-none">
          <span className="text-6xl font-black text-[#3e2c26] opacity-10">{score}</span>
        </div>

        {/* Game Area */}
        <div className="w-full h-full relative">
          
          {/* Bird (Now a solid brown square) */}
          <div 
            className="absolute bg-[#3e2c26] shadow-sm rounded-md"
            style={{ 
              left: 60, 
              top: birdPos, 
              width: BIRD_SIZE, 
              height: BIRD_SIZE,
            }} 
          >
            {/* Inner highlight div removed */}
          </div>

          {/* Pipes */}
          {pipes.map((pipe, i) => (
            <React.Fragment key={i}>
              {/* Top Pipe - Rounded bottom, no border strip */}
              <div 
                className="absolute bg-[#8c6b5d] rounded-b-sm"
                style={{ 
                  left: pipe.x, 
                  top: 0, 
                  width: 50, 
                  height: pipe.height 
                }} 
              />
              {/* Bottom Pipe - Rounded top, no border strip */}
              <div 
                className="absolute bg-[#8c6b5d] rounded-t-sm"
                style={{ 
                  left: pipe.x, 
                  top: pipe.height + PIPE_GAP, 
                  width: 50, 
                  height: GAME_HEIGHT - (pipe.height + PIPE_GAP) 
                }} 
              />
            </React.Fragment>
          ))}

          {/* Menus */}
          {gameState === 'START' && (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#f0ece6]/40 backdrop-blur-[2px]">
              <div className="text-[#3e2c26] text-xl font-bold animate-bounce">PRESS SPACE TO JUMP</div>
            </div>
          )}
          {gameState === 'GAMEOVER' && (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#f0ece6]/90 z-30">
              <h2 className="text-4xl font-black text-[#3e2c26] mb-2">GAME OVER</h2>
              <div className="text-xl text-[#5c4239] mb-6">Score: {score}</div>
              <button 
                onClick={(e) => { e.stopPropagation(); startGame(); }}
                className="px-6 py-2 bg-[#3e2c26] text-[#f0ece6] font-bold rounded-lg hover:bg-[#5c4239] shadow-lg transform active:scale-95 transition-all"
              >
                RETRY
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FlappyGame;