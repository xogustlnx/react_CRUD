import {useState} from 'react';
export default function Update({topics, id, onUpdate}){
    const obj= topics && topics.filter(e=>
      e.id===id
    )
    const [title, setTitle] = useState(obj[0].title);
    const [body, setBody] = useState(obj[0].body);
    
    return <article>
      
      <h2>Update</h2>
      <form onSubmit={e=>{
        e.preventDefault();
        onUpdate(e.target.title.value, e.target.body.value);
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