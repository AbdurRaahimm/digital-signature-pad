import React, { useEffect, useRef, useState } from 'react';

const SignaturePad = () => {
    const canvasRef = useRef(null);
    const displayRef = useRef(null);
    const [painting, setPainting] = useState(false);
    const [drawStart, setDrawStart] = useState(false);

    const startPosition = (e) => {
        setPainting(true);
        setDrawStart(true);
        draw(e);
    };

    const finishedPosition = () => {
        setPainting(false);
        const context = canvasRef.current.getContext("2d");
        context.beginPath();
        saveState();
    };

    const draw = (e) => {
        if (!painting) return;
        const canvas = canvasRef.current;
        const context = canvas.getContext("2d");
        let clientX, clientY;

        if (e.type.startsWith("touch")) {
            clientX = e.touches[0].clientX;
            clientY = e.touches[0].clientY;
        } else {
            clientX = e.clientX;
            clientY = e.clientY;
        }

        context.lineWidth = 2;
        context.lineCap = "round";
        context.lineJoin = "round";
        context.strokeStyle = "black";

        const x = clientX - canvas.offsetLeft;
        const y = clientY - canvas.offsetTop;

        if (painting) {
            context.lineTo(x, y);
            context.stroke();
            context.beginPath();
            context.moveTo(x, y);
        } else {
            context.moveTo(x, y);
        }
    };

    const saveState = () => {
        const canvas = canvasRef.current;
        localStorage.setItem("canvas", canvas.toDataURL());
    };

    const loadState = () => {
        const canvas = canvasRef.current;
        const context = canvas.getContext("2d");
        const savedData = localStorage.getItem("canvas");
        if (savedData) {
            const img = new Image();
            img.src = savedData;
            img.onload = () => {
                context.clearRect(0, 0, canvas.width, canvas.height);
                context.drawImage(img, 0, 0);
            };
        }
    };

    useEffect(() => {
        const canvas = canvasRef.current;
        canvas.addEventListener("mousedown", startPosition);
        canvas.addEventListener("mouseup", finishedPosition);
        canvas.addEventListener("mousemove", draw);

        canvas.addEventListener("touchstart", startPosition);
        canvas.addEventListener("touchend", finishedPosition);
        canvas.addEventListener("touchmove", draw);

        loadState();

        return () => {
            canvas.removeEventListener("mousedown", startPosition);
            canvas.removeEventListener("mouseup", finishedPosition);
            canvas.removeEventListener("mousemove", draw);

            canvas.removeEventListener("touchstart", startPosition);
            canvas.removeEventListener("touchend", finishedPosition);
            canvas.removeEventListener("touchmove", draw);
        };
    }, [painting]);

    const clearCanvas = () => {
        setDrawStart(false);
        const canvas = canvasRef.current;
        const context = canvas.getContext("2d");
        context.clearRect(0, 0, canvas.width, canvas.height);
        saveState();
        // displayRef.current.innerHTML = "";
    };

    const saveSignature = () => {
        if (drawStart) {
            const canvas = canvasRef.current;
            const dataURL = canvas.toDataURL();
            const img = document.createElement("img");
            img.setAttribute("class", "signature-img");
            img.src = dataURL;

            const a = document.createElement("a");
            a.href = dataURL;
            a.download = "signature.png";
            a.click(); // download the image file on click of the save button 
            const filenameTextNode = document.createTextNode("signature.png");
            a.appendChild(filenameTextNode);
            a.appendChild(img); 

            // displayRef.current.appendChild(img);
            // displayRef.current.appendChild(a);
        } else {
            //   displayRef.current.innerHTML = "<span class='error'>Please sign before saving</span>";
            alert("Please sign before saving");
        }
    };

    return (
        <div className='bg-gradient-to-r from-rose-400 to-red-500 h-screen flex flex-col items-center justify-center gap-5'>
            <h1 className='text-4xl text-white font-bold capitalize'> digital Signature Pad</h1>
            <div className="bg-white  w-[22rem] mx-auto rounded-md py-5 px-6">
                <h3 className='text-md font-bold text-center text-black/55 select-none'>Draw here</h3>
                <canvas
                    ref={canvasRef}
                    width={300}
                    height={200}
                    style={{
                        touchAction: "none",
                        cursor: "crosshair",
                    }}
                    className='border border-dashed border-rose-500 rounded-lg '
                ></canvas>              
                <div className="flex justify-center items-center gap-4 mt-5 ">
                    <button onClick={saveSignature} className='bg-gradient-to-r from-rose-400 to-red-500 text-white px-4 py-2 rounded-md capitalize font-bold'>save</button>
                    <button onClick={clearCanvas} className='bg-gradient-to-r from-red-500 to-orange-500 text-white px-4 py-2 rounded-md capitalize font-bold'>clear</button>
                </div>
                {/* <div ref={displayRef}></div> */}
            </div>

        </div>
    );
};

export default SignaturePad;
