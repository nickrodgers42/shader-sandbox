import React, { useEffect, useRef, useState } from 'react';
import './App.css';
import ShaderCanvas from './ShaderCanvas';


function App() {
  const [fragShader, setFragShader] = useState<string>("")
  const [vertShader, setVertShader] = useState<string>("")

  const fetchFile = async (path: string, callback: Function) => {
      const response = await fetch(path)
      const text = await response.text()
      callback(text)
  }

  useEffect(() => {
    fetchFile('./shaders/shader.frag', setFragShader)
    fetchFile('./shaders/shader.vert', setVertShader)
  })

  return (
    <div>
      {fragShader !== "" && vertShader !== "" ?
        <ShaderCanvas fragShader={fragShader} vertShader={vertShader}/> : <div /> }
    </div>
  );
}

export default App;
