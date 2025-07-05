//Componente é responsável por exibir o tempo restante e controlar a contagem do tempo.

import { useEffect, useState, useRef  } from "react";

//Alarme quando zerar a contagem regressiva zerar
import alarmSound from "../assets/alarme.mp3";

import imagemFoco from '../assets/foco.jpg';
import imagemDescanco from '../assets/descanso.jpg';
import imagemInicio from '../assets/inicio.jpg'

const PomodoroTimer = () => {
    const [minutes, setMinutes] = useState(0);
    const [seconds, setSeconds] = useState(0);

    //controla se o pomodoro está ativo ou não
    const [isActive, setIsActive] = useState(false);

    //esse é o tempo que o usuário vai inserir no input
    const [userTime, setUserTime] = useState(0);

    const [msgTempoFinalizado, setMsgTempoFinalizado] = useState("")

    const [msgModo, setMsgModo] = useState("")

  
    //variável para referenciar o áudio, utilizando o useRef
    const audioRef = useRef(null);
 
    //o usuário define o tempo
    const handleTimeChange = (e) => {
        setUserTime(e.target.value);
        setMinutes(e.target.value);
        setSeconds(0)
    }

    //ativa ou desativa o pomodoro 
    const toggleTimer = () => { 
        setIsActive(!isActive)
        if(userTime > 15){
            setMsgModo("Foco")
        } else {
            setMsgModo("Descanso")
        }
    }
  
    //reinicia o pomodoro, o desativa e volta ao minuto definido pelo usuário anteriormente
    const reiniciar = () => {
        setIsActive(false)
        setMinutes(userTime)
        setSeconds(0)
    }

     // useEffect controla a contagem regressiva
    useEffect(() => {
    let interval;

    if (isActive) {
      interval = setInterval(() => {
        // Se ainda há segundos, apenas decrementa
        if (seconds > 0) {
          setSeconds((prevSeconds) => prevSeconds - 1);
        } 
        // Se segundos chegaram a 0 e ainda tem minutos, diminui minuto e segundos vai pra 59
        else if (minutes > 0) {
          setMinutes((prevMinutes) => prevMinutes - 1);
          setSeconds(59);
        } 
        // Se minutos e segundos acabaram, para o timer
        else {
          setIsActive(false);
          setMsgTempoFinalizado("Tempo Finalizado")
          setMsgModo("")
          audioRef.current.play(); // Toca o som quando o tempo zera

           // Limpa a mensagem após 10 segundos
          setTimeout(() => {
            setMsgTempoFinalizado(""); // Limpa a mensagem
          }, 13000); // 13 segundos
          
        }
      }, 1000); // Executa a cada 1000ms = 1s
    }

    // Limpa o intervalo quando o timer é pausado ou o componente desmontado
    return () => clearInterval(interval);
  }, [isActive, seconds, minutes]); // Reexecuta quando esses valores mudam


  const estilos = {
  container: {
    backgroundColor: "#FFFDE7", // fundo amarelo bebê
    minHeight: "100vh",
    paddingTop: "40px",
    textAlign: "center",
    fontFamily: "Arial, sans-serif",
    color: "#333",
  },

  h1: {
    fontSize: "3rem"
  },
  timer: {
    fontSize: "64px",
    fontWeight: "bold",
    margin: "20px 0",
  },
  input: {
    padding: "10px",
    fontSize: "16px",
    border: "1px solid #ccc",
    borderRadius: "8px",
    marginRight: "10px",
    textAlign: "center",
    marginTop: "30px"
  },
  iniciar: {
    backgroundColor: "#FDD835",
    color: "#333",
    border: "none",
    padding: "10px 20px",
    fontSize: "16px",
    borderRadius: "8px",
    cursor: "pointer",
    marginRight: "10px",
  },
  pausar: {
    backgroundColor: "#EF5350",
    color: "white",
    border: "none",
    padding: "10px 20px",
    fontSize: "16px",
    borderRadius: "8px",
    cursor: "pointer",
    marginRight: "10px",
  },
  reiniciar: {
    backgroundColor: "#FFF59D",
    color: "#333",
    border: "1px solid #ccc",
    padding: "10px 20px",
    fontSize: "16px",
    borderRadius: "8px",
    cursor: "pointer",
    marginLeft: "20px",
  },
  mensagem: {
    color: "#D84315",
    fontSize: "20px",
    margin: "10px 0",
  },
  label: {
    marginRight: "20px",
    fontWeight: "bold",
  },
  botoes: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginTop: "20px"
  },
  p: {
    textAlign: "left",
    marginLeft: "50px",
    fontWeight: "bold",
    marginTop: "30px",
    fontSize: "22px",
    color: "white", textShadow: "2px 2px 8px #000"
  },
};


  return (
    <div
      style={{...estilos.container,
      backgroundImage: `url(${msgModo === "Foco" ? imagemFoco : msgModo === "Descanso" ? imagemDescanco :imagemInicio })`,
      backgroundSize: "cover",
      backgroundPosition: "center"
    }}>
      <audio ref={audioRef} src={alarmSound} preload="auto" />
      <h1 style={{...estilos.h1, color: msgModo === "Foco" ? "green" : "white"}}>Pomodoro</h1>
      {msgModo && (
        <h2 style={{ color: msgModo === "Foco" ? "green" : "white" }}>Modo: {msgModo}</h2>
      )}
        <p 
          style={estilos.p}>
          Definir modo descanso, até 15 min!
        </p>
        {msgTempoFinalizado && (
            <p style={estilos.mensagem}>{msgTempoFinalizado}</p>
        )} <br />
        <div 
          style={{...estilos.timer,
          color: msgModo === "Foco" ? "green" : "black"
        }}>
             {/* Abaixo formatação dos minutos e segundos para ficarem com um zero a esquerda quando tiver apenas um número. Ex: 08:02 */}
            {String(minutes).padStart(2, "0")} : {String(seconds).padStart(2, "0")}
        </div>
      <div>
        <label 
          style={{...estilos.label, 
          color: msgModo === "Foco" ? "green" : "black"}} 
          >Definir Tempo (minutos)
        </label>
        <input 
            type="number" 
            min="1"
            value={userTime} 
            onChange={handleTimeChange} 
            style={estilos.input} 
        />
        <div style={estilos.botoes}>
            <button 
                onClick={toggleTimer} 
                style={isActive ? estilos.pausar : estilos.iniciar} >
                {isActive ? "Pausar" : "Iniciar"}
            </button>
            <button onClick={reiniciar} style={estilos.reiniciar}>Reiniciar</button>
        </div>   
      </div>  
    </div>
  );
};

export default PomodoroTimer;

