import { Button, TextField } from '@material-ui/core'
import React, {useState,useEffect} from 'react'
 import { storage,db } from '../Firebase'
 import firebase from 'firebase/compat/app';
 import { initializeApp } from 'firebase/app';
 import { getFirestore } from 'firebase/firestore';
// import "firebase/compact/firestore";
import 'firebase/compat/storage'

const Addpost = ( {username}) => {
  const[caption,setCaption] =useState('')
  const[progress,setProgress] =useState(0)
  const [image,setImage]=useState(null)

  const handleChange = (event) =>{
    if(event.target.files[0])
    {
      setImage(event.target.files[0])
    }
  }

//   const handleUpload = () => {
//     const uploadTask = storage.ref(`images/${image.name}`).put(image);
//     uploadTask.on(
//         "state_changed",
//         (snapshot) => {
//             const progress = Math.round(
//                 (snapshot.bytesTransferred / snapshot.totalBytes) * 100
//             );
//             setProgress(progress);
//         },
//         (error) => {
//             console.log(error);
//             alert(error.message);
//         },
//         () => {
//             storage
//                 .ref("images")
//                 .child(image.name)
//                 .getDownloadURL()
//                 .then(url => {
//                     db.collection("posts").add({
//                         timestamp: firebase.firestore.FieldValue.serverTimestamp(),
//                         caption: caption,
//                         imageURL: url,
//                         userName: username
//                     });
//                 })

//         }
//     )
//     setCaption('')
//     setImage(null)
//     setProgress(0)
// }
const handleUpload = () => {
  const uploadTask = storage.ref(`images/${image.name}`).put(image);

  uploadTask.on(
    "state_changed",
    (snapshot) => {
      const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
      setProgress(progress);
    },
    (error) => {
      console.log(error);
      alert(error.message);
    },
    () => {
      storage
        .ref("images")
        .child(image.name)
        .getDownloadURL()
        .then((url) => {
          db.collection("posts").add({
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            caption: caption,
            imageURL: url,
            userName: username
          });

          // Reset the state after successful upload
          setCaption('');
          setImage(null);
          setProgress(0);
        })
        .catch((error) => {
          console.error("Error getting download URL:", error);
          alert("Error getting download URL. Please try again.");
        });
    }
  );
};


  return (
    <div className='imagesupload'>
      <h2 style={{textAlign:'center',margin: '15px'}}> Add New post</h2>
      <input className='file-input' type="file" onChange={handleChange}
      />

      <TextField id='filled-basic' label='caption Here' variant='filled' onChange={(e)=>{setCaption(e.target.value)}} value={caption}
      />

      <progress className='progress'value={progress} max='100' />

      {/* <Button variant='contained' color='primary'onClick={handleUpload}>Add Post</Button> */}
      <Button variant='contained' color='primary' onClick={handleUpload}>Add Post</Button>

    </div>
  )
}

export default Addpost