import { doc, getDoc } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { database } from '../firebase_config';




function Site_Footer() {
  const [footerContent, setFooterContent] = useState('');

  useEffect(()=>{
    getDoc(doc(database, 'site-vitals', 'footer'))
    .then((snapshot)=>{
      setFooterContent(snapshot.data().content);
    })
    .catch(err=>toast(err.message));

  },[])


  return (
    <footer id="site-footer">
      <div>{footerContent}</div>
    </footer>
  );
}
    
export default Site_Footer;