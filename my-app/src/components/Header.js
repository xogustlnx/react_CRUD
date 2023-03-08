export default function Header({title,onChangeMode}){
    return(
      <header>
      <h1><a href="/" onClick={e=>{
        e.preventDefault();
        onChangeMode();
      }}>{title}</a></h1>
      </header>
    )
  }