import {useState} from 'react';
import uuid from 'react-uuid'

export default function Create({onCreate}){
    return <article>
      <h2>Create</h2>
      <form onSubmit={e=>{
        e.preventDefault();
        onCreate(e.target.title.value, e.target.body.value);
      }}>
        <p><input type="text" name='title' placeholder='title' required/></p>
        <p><textarea name='body' placeholder='body'/></p>
        <p><input type="submit" value="create" /></p>
      </form>
    </article>
  }
