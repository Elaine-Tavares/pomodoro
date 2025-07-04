

export default function ImagemDeFundo({imagem}) {
    const estilos = {
        img: {
            width: "400px",
            height: "200px"
        },
    }
    
  return (
    <div>
        <img style={estilos.img} src={imagem} alt="" />
    </div>
  )
}
