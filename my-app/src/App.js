import logo from './logo.svg';
import './App.scss';
import {useState} from 'react';
import uuid from 'react-uuid'
import Create from './components/Create';
import Update from './components/Update';
import Header from './components/Header';
import Nav from './components/Nav';
import Article from './components/Article';


function App() {
  const [mode, setMode] = useState('WELCOME')
  const [id, setId] = useState(null);

  let content=null;
  let contextControl=null;


  const onCreate=(title, body)=>{
      const topic={
        id:uuid(),
        title:title,
        body:body,
		focused: true
      }
      setTopic([...topics,topic]);
      setId(topic.id);
      setMode('READ');
    }

  const onUpdate=(title, body)=>{
    setTopic(topics&&topics.map((topic)=>
      topic.id===id ? {...topic,title:title,body:body}:topic))
    setMode('READ');
  }
  



  
  const [topics, setTopic] =useState([
    {id: uuid(), title:"html", body:"html is ,,,", focused: false},
    {id: uuid(), title:"css", body:"css is ,,,", focused: false},
    {id: uuid(), title:"js", body:"js is ,,,", focused: false},
  ]);


  
  
  if(mode==='WELCOME'){
    content=<Article title="Welcome" body="Hello, WeB"></Article>
  }
  else if(mode==="READ"){

    topics && topics.map((e)=>{
      if(e.id===id){
        const title=e.title;
        const body=e.body;
        content=<Article title={title} body={body} key={e.id}></Article>


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
    content=<Create onCreate={onCreate}></Create>
  }
  else if(mode==="UPDATE"){
    content=<Update topics={topics} id={id} onUpdate={onUpdate}></Update>
  }
  else if(mode==="DELETE"){
    const ask=window.confirm("정말 삭제하시겠습니까?");
    if(ask){
      setTopic(topics&&topics.filter(e=>e.id!==id));
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
      <Header title="WEB" onChangeMode={()=>{setMode('WELCOME');}}></Header>
      <Nav topics={topics} id={id} onChangeMode={(id)=>{
				setId(id); 
				setTopic(topics&&topics.map((topic)=>
				topic.id===id ? {...topic,focused:true}:{...topic,focused:false}))
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
export default App;
