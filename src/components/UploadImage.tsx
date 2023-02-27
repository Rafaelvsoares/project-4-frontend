import { useEffect, useRef } from 'react';
import * as cloudinaryCore from 'cloudinary-core';

function UploadImage() {
  const cloudinaryRef = useRef<any>()
  const widgetRef = useRef<any>()
  useEffect(()=> {
    cloudinaryRef.current= window.cloudinary
    widgetRef.current = cloudinaryRef.current.createUploadWidget({
      cloudName: 'dzjjvjjk2',
      uploadPreset: 'images'
    }, function(error: any, result: any){
      console.log(result)
    })
  },[])
  return(
    <button onClick={() => widgetRef.current.open() }>Upload</button>
  )
}

export default UploadImage;