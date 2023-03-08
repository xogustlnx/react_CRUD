export default function Nav({topics,onChangeMode}){ 
    let lis=[];
    topics&&topics.map((e) => {
    lis.push(
      <li id={e.id}><a id={e.id} href={'/read/'+e.id} onClick={e=>{
        e.preventDefault();
       onChangeMode(e.target.id);
      }}>{e.title}</a></li>
    )
  });

  return(
    <nav>
    <ol>
      {lis}
    </ol>
    </nav>
  )
}