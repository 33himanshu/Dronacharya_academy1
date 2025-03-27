// "use client"

// import type React from "react"

// import { useState, useRef, useEffect } from "react"
// import { motion, AnimatePresence } from "framer-motion"
// import { Button } from "@/components/ui/button"
// import { Card } from "@/components/ui/card"
// import { Loader2, RefreshCw, ChevronDown, ChevronUp, Maximize2 } from "lucide-react"
// import { FullScreenMathSolver } from "./full-screen-math-solver"

// export function MathSolver() {
//   const [equation, setEquation] = useState("")
//   const [solution, setSolution] = useState<string | null>(null)
//   const [steps, setSteps] = useState<string[]>([])
//   const [showSteps, setShowSteps] = useState(false)
//   const [isLoading, setIsLoading] = useState(false)
//   const canvasRef = useRef<HTMLCanvasElement>(null)
//   const [isDrawing, setIsDrawing] = useState(false)
//   const [lastX, setLastX] = useState(0)
//   const [lastY, setLastY] = useState(0)
//   const [isFullScreen, setIsFullScreen] = useState(false)

//   useEffect(() => {
//     const canvas = canvasRef.current
//     if (!canvas) return

//     const ctx = canvas.getContext("2d")
//     if (!ctx) return

//     // Set canvas size
//     canvas.width = canvas.offsetWidth
//     canvas.height = canvas.offsetHeight

//     // Set canvas styles
//     ctx.lineJoin = "round"
//     ctx.lineCap = "round"
//     ctx.lineWidth = 3
//     ctx.strokeStyle = "#000"

//     // Clear canvas
//     ctx.fillStyle = "#fff"
//     ctx.fillRect(0, 0, canvas.width, canvas.height)
//   }, [])

//   const startDrawing = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
//     setIsDrawing(true)

//     let clientX, clientY

//     if ("touches" in e) {
//       clientX = e.touches[0].clientX
//       clientY = e.touches[0].clientY
//     } else {
//       clientX = e.clientX
//       clientY = e.clientY
//     }

//     const canvas = canvasRef.current
//     if (!canvas) return

//     const rect = canvas.getBoundingClientRect()
//     const x = clientX - rect.left
//     const y = clientY - rect.top

//     setLastX(x)
//     setLastY(y)
//   }

//   const draw = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
//     if (!isDrawing) return

//     let clientX, clientY

//     if ("touches" in e) {
//       clientX = e.touches[0].clientX
//       clientY = e.touches[0].clientY
//     } else {
//       clientX = e.clientX
//       clientY = e.clientY
//     }

//     const canvas = canvasRef.current
//     if (!canvas) return

//     const ctx = canvas.getContext("2d")
//     if (!ctx) return

//     const rect = canvas.getBoundingClientRect()
//     const x = clientX - rect.left
//     const y = clientY - rect.top

//     ctx.beginPath()
//     ctx.moveTo(lastX, lastY)
//     ctx.lineTo(x, y)
//     ctx.stroke()

//     setLastX(x)
//     setLastY(y)
//   }

//   const stopDrawing = () => {
//     setIsDrawing(false)
//   }

//   const clearCanvas = () => {
//     const canvas = canvasRef.current
//     if (!canvas) return

//     const ctx = canvas.getContext("2d")
//     if (!ctx) return

//     ctx.fillStyle = "#fff"
//     ctx.fillRect(0, 0, canvas.width, canvas.height)

//     setSolution(null)
//     setSteps([])
//     setEquation("")
//   }

//   const solveEquation = async () => {
//     // In a real app, you would:
//     // 1. Convert the canvas drawing to an image
//     // 2. Send it to a handwriting recognition API
//     // 3. Get the equation text
//     // 4. Send the equation to your math solver API

//     setIsLoading(true)

//     try {
//       // For demo purposes, we'll use a mock equation
//       const recognizedEquation = "2x + 5 = 15"
//       setEquation(recognizedEquation)

//       // Call the API
//       const response = await fetch("/api/math-solver", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ equation: recognizedEquation }),
//       })

//       if (!response.ok) {
//         throw new Error("Failed to solve equation")
//       }

//       const data = await response.json()
//       setSolution(data.solution)
//       setSteps(data.steps)
//     } catch (error) {
//       console.error("Error solving equation:", error)
//     } finally {
//       setIsLoading(false)
//     }
//   }

//   const enterFullScreen = () => {
//     setIsFullScreen(true)
//   }

//   if (isFullScreen) {
//     return (
//       <FullScreenMathSolver
//         onExit={() => setIsFullScreen(false)}
//         initialEquation={equation}
//         initialSolution={solution}
//         initialSteps={steps}
//       />
//     )
//   }

//   return (
//     <div className="space-y-6">
//       <Card className="p-6">
//         <div className="flex justify-between items-center mb-4">
//           <h2 className="text-xl font-semibold">Draw Your Equation</h2>
//           <Button variant="ghost" size="icon" onClick={enterFullScreen}>
//             <Maximize2 className="h-5 w-5" />
//           </Button>
//         </div>
//         <div className="border rounded-md overflow-hidden bg-white dark:bg-gray-800 mb-4">
//           <canvas
//             ref={canvasRef}
//             className="w-full h-64 touch-none"
//             onMouseDown={startDrawing}
//             onMouseMove={draw}
//             onMouseUp={stopDrawing}
//             onMouseLeave={stopDrawing}
//             onTouchStart={startDrawing}
//             onTouchMove={draw}
//             onTouchEnd={stopDrawing}
//           />
//         </div>
//         <div className="flex flex-wrap gap-3">
//           <Button onClick={solveEquation} disabled={isLoading}>
//             {isLoading ? (
//               <>
//                 <Loader2 className="mr-2 h-4 w-4 animate-spin" />
//                 Solving...
//               </>
//             ) : (
//               "Solve Equation"
//             )}
//           </Button>
//           <Button variant="outline" onClick={clearCanvas}>
//             <RefreshCw className="mr-2 h-4 w-4" />
//             Clear
//           </Button>
//         </div>
//       </Card>

//       {solution && (
//         <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
//           <Card className="p-6">
//             <h2 className="text-xl font-semibold mb-2">Equation</h2>
//             <p className="text-lg font-mono">{equation}</p>
//           </Card>

//           <Card className="p-6">
//             <h2 className="text-xl font-semibold mb-2">Solution</h2>
//             <p className="text-lg font-mono">{solution}</p>

//             <div className="mt-4">
//               <Button variant="outline" onClick={() => setShowSteps(!showSteps)} className="flex items-center">
//                 {showSteps ? (
//                   <>
//                     <ChevronUp className="mr-2 h-4 w-4" />
//                     Hide Steps
//                   </>
//                 ) : (
//                   <>
//                     <ChevronDown className="mr-2 h-4 w-4" />
//                     Show Steps
//                   </>
//                 )}
//               </Button>

//               <AnimatePresence>
//                 {showSteps && (
//                   <motion.div
//                     initial={{ opacity: 0, height: 0 }}
//                     animate={{ opacity: 1, height: "auto" }}
//                     exit={{ opacity: 0, height: 0 }}
//                     className="mt-4 space-y-2 overflow-hidden"
//                   >
//                     {steps.map((step, index) => (
//                       <motion.div
//                         key={index}
//                         initial={{ opacity: 0, x: -10 }}
//                         animate={{ opacity: 1, x: 0 }}
//                         transition={{ delay: index * 0.1 }}
//                         className="p-3 border rounded-md bg-muted"
//                       >
//                         {step}
//                       </motion.div>
//                     ))}
//                   </motion.div>
//                 )}
//               </AnimatePresence>
//             </div>
//           </Card>
//         </motion.div>
//       )}
//     </div>
//   )
// }



"use client"; // Add this line at the top of the file


import type React from "react";
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Loader2, RefreshCw, ChevronDown, ChevronUp, Maximize2 } from "lucide-react";
import { FullScreenMathSolver } from "./full-screen-math-solver";

export function MathSolver() {
  const [equation, setEquation] = useState("");
  const [solution, setSolution] = useState<string | null>(null);
  const [steps, setSteps] = useState<string[]>([]);
  const [showSteps, setShowSteps] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [lastX, setLastX] = useState(0);
  const [lastY, setLastY] = useState(0);
  const [isFullScreen, setIsFullScreen] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set canvas size
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    // Set canvas styles
    ctx.lineJoin = "round";
    ctx.lineCap = "round";
    ctx.lineWidth = 3;
    ctx.strokeStyle = "#000";

    // Clear canvas
    ctx.fillStyle = "#fff";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }, []);

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    setIsDrawing(true);

    let clientX, clientY;

    if ("touches" in e) {
      clientX = e.touches[0].clientX;
      clientY = e.touches[0].clientY;
    } else {
      clientX = e.clientX;
      clientY = e.clientY;
    }

    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const x = clientX - rect.left;
    const y = clientY - rect.top;

    setLastX(x);
    setLastY(y);
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;

    let clientX, clientY;

    if ("touches" in e) {
      clientX = e.touches[0].clientX;
      clientY = e.touches[0].clientY;
    } else {
      clientX = e.clientX;
      clientY = e.clientY;
    }

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const x = clientX - rect.left;
    const y = clientY - rect.top;

    ctx.beginPath();
    ctx.moveTo(lastX, lastY);
    ctx.lineTo(x, y);
    ctx.stroke();

    setLastX(x);
    setLastY(y);
  };

  const stopDrawing = () => {
    setIsDrawing(false);
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.fillStyle = "#fff";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    setSolution(null);
    setSteps([]);
    setEquation("");
  };

  const solveEquation = async () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    setIsLoading(true);

    try {
      // Convert canvas drawing to an image (PNG)
      const image = canvas.toDataURL("image/png");

      // Send the image to the server at port 8900
      const response = await fetch("http://localhost:8900/calculate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ image }),
      });

      if (!response.ok) {
        throw new Error("Failed to solve equation");
      }

      const data = await response.json();

      // Update state with the response
      setEquation(data.equation);
      setSolution(data.solution);
      setSteps(data.steps);
    } catch (error) {
      console.error("Error solving equation:", error);
      alert("An error occurred while solving the equation. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const enterFullScreen = () => {
    setIsFullScreen(true);
  };

  if (isFullScreen) {
    return (
      <FullScreenMathSolver
        onExit={() => setIsFullScreen(false)}
        initialEquation={equation}
        initialSolution={solution}
        initialSteps={steps}
      />
    );
  }

  return (
    <div className="space-y-6">
      <Card className="p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Draw Your Equation</h2>
          <Button variant="ghost" size="icon" onClick={enterFullScreen}>
            <Maximize2 className="h-5 w-5" />
          </Button>
        </div>
        <div className="border rounded-md overflow-hidden bg-white dark:bg-gray-800 mb-4">
          <canvas
            ref={canvasRef}
            className="w-full h-64 touch-none"
            onMouseDown={startDrawing}
            onMouseMove={draw}
            onMouseUp={stopDrawing}
            onMouseLeave={stopDrawing}
            onTouchStart={startDrawing}
            onTouchMove={draw}
            onTouchEnd={stopDrawing}
          />
        </div>
        <div className="flex flex-wrap gap-3">
          <Button onClick={solveEquation} disabled={isLoading}>
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Solving...
              </>
            ) : (
              "Solve Equation"
            )}
          </Button>
          <Button variant="outline" onClick={clearCanvas}>
            <RefreshCw className="mr-2 h-4 w-4" />
            Clear
          </Button>
        </div>
      </Card>

      {solution && (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-2">Equation</h2>
            <p className="text-lg font-mono">{equation}</p>
          </Card>

          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-2">Solution</h2>
            <p className="text-lg font-mono">{solution}</p>

            <div className="mt-4">
              <Button variant="outline" onClick={() => setShowSteps(!showSteps)} className="flex items-center">
                {showSteps ? (
                  <>
                    <ChevronUp className="mr-2 h-4 w-4" />
                    Hide Steps
                  </>
                ) : (
                  <>
                    <ChevronDown className="mr-2 h-4 w-4" />
                    Show Steps
                  </>
                )}
              </Button>

              <AnimatePresence>
                {showSteps && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="mt-4 space-y-2 overflow-hidden"
                  >
                    {steps.map((step, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="p-3 border rounded-md bg-muted"
                      >
                        {step}
                      </motion.div>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </Card>
        </motion.div>
      )}
    </div>
  );
}