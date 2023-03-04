import logo from './logo.svg';
import './App.scss';
import {useState} from 'react';
import uuid from 'react-uuid'



function App() {
  const [mode, setMode] = useState('WELCOME')
  const [id, setId] = useState(null);

  let content=null;
  let contextControl=null;



  let dtopics = [
    {id: uuid(), title:"html", body:"html is ,,,"},
    {id: uuid(), title:"css", body:"css is ,,,"},
    {id: uuid(), title:"js", body:"js is ,,,"},
  ]
  const [topics, setTopic] =useState(dtopics);
  
  
  if(mode==='WELCOME'){
    content=<Article title="Welcome" body="Hello, WeB"></Article>
  }
  else if(mode==="READ"){
    topics.forEach((e)=>{
      if(e.id===id){
        content=<Article title={e.title} body={e.body}></Article>


        //update 정의
        contextControl=
        <>
          <li><a href={"/update/"+id} onClick={e=>{
          e.preventDefault();
          setMode("UPDATE");
          }}>Update</a></li>
          <li><a href={"/delete/"+id} onClick={e=>{
          e.preventDefault();
          setMode("DELETE");
          }}>Delete</a></li>
        </>

      }
    })
  }
  else if(mode==="CREATE"){

    //create 정의
    content=<Create onCreate={(title, body)=>{
      const inittopics=[...topics];
      inittopics.push({
        id:uuid(),
        title:title,
        body:body,
      })
      setTopic(inittopics);
      setId(inittopics[inittopics.length-1].id);
      setMode('READ');
    }
    }></Create>
  }
  else if(mode==="UPDATE"){
    content=<Update topics={topics} id={id} onUpdate={(title, body)=>{
      const inittopics=[...topics];
      inittopics.forEach(e=>{
        if(e.id===id){
          e.title=title;
          e.body=body;
        }
      })
      setTopic(inittopics);
      setMode('READ');
    }

    }>
    </Update>
  }
  else if(mode==="DELETE"){
    
    const inittopics=[...topics];
    const newtopics=inittopics.filter(e=>
      e.id!=id
    )
    const ask=confirm("정말 삭제하시겠습니까?");
    if(ask){
      console.log(newtopics);
      setTopic(newtopics);
      setMode('WELCOME');
    }
    else{
      setMode('READ');
    }

  }

  

  return (
    <>
    <html lang="en">
    <head>
    </head>
    <body>
      <Header title="WEB" onChangeMode={()=>{
          setMode('WELCOME');
      }}></Header>
      <Nav topics={topics} onChangeMode={(_id)=>{
          setId(_id);
          setMode('READ');
      }}></Nav>
      {content}

      <ul>
        <li><a href='/create' onClick={(e)=>{
        e.preventDefault();
        setMode('CREATE');
        }}>create</a></li>
        {contextControl}
      </ul>
      
    </body>
    </html>
    </>

  );
}

// Component
function Create(props){
  return <article>
    <h2>Create</h2>
    <form onSubmit={e=>{
      e.preventDefault();
      props.onCreate(e.target.title.value, e.target.body.value);
    }}>
      <p><input type="text" name='title' placeholder='title' required/></p>
      <p><textarea name='body' placeholder='body'/></p>
      <p><input type="submit" value="create" /></p>
    </form>
  </article>
}

function Update(props){
  const obj=props.topics.filter(e=>
    e.id===props.id
  )
  const [title, setTitle] = useState(obj[0].title);
  const [body, setBody] = useState(obj[0].body);
  
  return <article>
    
    <h2>Update</h2>
    <form onSubmit={e=>{
      e.preventDefault();
      props.onUpdate(e.target.title.value, e.target.body.value);
    }}>
    <p><input type="text" name='title' value={title} onChange={e=>{
      setTitle(e.target.value);
    }}/></p>
    <p><textarea name='body' value={body} onChange={e=>{
      setBody(e.target.value);
    }}/></p>
    <p><input type="submit" value="update" /></p>
    </form>
  </article>
}



function Header(props){
  return(
    <header>
    <h1><a href="/" onClick={e=>{
      e.preventDefault();
      props.onChangeMode();
    }}>{props.title}</a></h1>
    </header>
  )
}

function Nav(props){ 
    let lis=[];
    props.topics.forEach((e,i) => {
    lis.push(
      <li id={e.id}><a id={e.id} href={'/read/'+e.id} onClick={e=>{
        e.preventDefault();
        props.onChangeMode(e.target.id);
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

let Article=(props)=>{
  return(
    <article>
    <h2>{props.title}</h2>
    {props.body}
    </article>
  )
}

export default App;
