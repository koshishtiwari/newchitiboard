import { doc, deleteDoc, updateDoc, getDoc } from 'firebase/firestore';
import { getDownloadURL, ref, uploadBytes, deleteObject } from "firebase/storage";

import { database, storage } from '../../firebase_config';
import { toast } from 'react-toastify';
import { useEffect, useState } from 'react';

import Loader  from './../loader';
import { IoPersonCircleOutline } from 'react-icons/io5';


function Cards({memberId, refreshTeam}) {

    const [isLoaded, setIsLoaded] = useState(false);
    const [isLoadingImg, setIsLoadingImg] = useState(false);

    const [teamMember, setTeamMember] = useState(
        {name:'', 
        nickname:'',
        pic:'',
        primaryLink: '',
        secondaryLink: '',
        title: '',
        desc: ''
    });
    


    const getTeamMember = ()=>{
        const thisMember = doc(database, 'team', memberId);
        getDoc(thisMember)
        .then((memberSnap)=>{
            const member = memberSnap.data();
            setTeamMember({
            name: member.name,
            nickname: member.nickname,
            pic: member.pic,
            primaryLink: member.primaryLink,
            secondaryLink: member.secondaryLink,
            title: member.title,
            desc: member.desc
            });

            setIsLoaded(true);

        })
        .catch((err)=>{
            toast(err.message);
        })
    }
    
    useEffect(()=>{
    getTeamMember();
    },[])

    const setImg = (e)=> {
        const memberUploadedPP = e.target.files[0];
        setTeamMember({...teamMember, pic:''});
        setIsLoadingImg(true);
        
        const memberPicRef = ref(storage, `images/team-${memberId}`);
        
        uploadBytes(memberPicRef, memberUploadedPP)
            .then((snapshot)=>{
                getDownloadURL(snapshot.ref)
                .then((url)=>{
                    setTeamMember({...teamMember, pic: url});
                    setIsLoadingImg(false);
                })
                .catch(err=>toast(err.message));
            })
            .catch(err=>toast(err.message));
      
    }

    const updateTeamMember =(e)=> {
        e.preventDefault();
        setIsLoaded(false);

        const thisMember = doc(database, 'team', memberId);
        updateDoc(thisMember, {
            name: teamMember.name,
            nickname: teamMember.nickname,
            pic: teamMember.pic,
            primaryLink: teamMember.primaryLink,
            secondaryLink: teamMember.secondaryLink,
            title: teamMember.title,
            desc: teamMember.desc
        })
        .then(()=>{
            setIsLoaded(true);
            refreshTeam();
        })
        .catch(err=>toast(err.message));
    }

    const delTeamMember = (e) =>{
        e.preventDefault();
        setIsLoaded(false);

        if(teamMember.pic!= ''){
            const memberPicRef = ref(storage, `images/team-${memberId}`);
            deleteObject(memberPicRef)
            .then(()=>{
                
            })
            .catch(err=>toast(err.message));
        }
        
        const thisMember = doc(database, 'team', memberId);
        deleteDoc(thisMember)
            .then(()=>{
                setIsLoaded(true);
                refreshTeam();
            })
            .catch(err=>toast(err.message));
    }

    return (
    <div className='cards lightOverlay'>
        <form className="updateTeam">
        
        
            <label htmlFor={`img-${memberId}`} id='memberPicInput'  className='profilePic' title='Click to change the picture'>
            
            {!teamMember.pic ? 
            (isLoadingImg)?(<Loader />):(<IoPersonCircleOutline />)
            :(<img alt="Profile Image" src={teamMember.pic}></img>)}
            
            </label>
            <input type={'file'} id={`img-${memberId}`} onChange={setImg} accept={'image/*'}></input>
     
        

     
            <label htmlFor={`name-${memberId}`}>Full Name</label>
            <input type={'text'} id={`name-${memberId}`} value={teamMember.name} onChange={e=>setTeamMember({...teamMember, name:e.target.value})}></input>
     

       
            <label htmlFor={`nName-${memberId}`}>Nickname</label>
            <input type={'text'} id={`nName-${memberId}`} value={teamMember.nickname} onChange={e=>setTeamMember({...teamMember, nickname:e.target.value})}></input>
      

        
            <label htmlFor={`title-${memberId}`}>Title/Pos</label>
            <input type={'text'} id={`img-${memberId}`} value={teamMember.title} onChange={e=>setTeamMember({...teamMember, title:e.target.value})}></input>
        

            <label htmlFor={`link1-${memberId}`}>Primary link</label>
            <input type={'text'} id={`link1-${memberId}`} value={teamMember.primaryLink} onChange={e=>setTeamMember({...teamMember, primaryLink:e.target.value})}></input>
       

        
            <label htmlFor={`link2-${memberId}`}>Secondary link</label>
            <input type={'text'} id={`link2-${memberId}`} value={teamMember.secondaryLink} onChange={e=>setTeamMember({...teamMember, secondaryLink:e.target.value})}></input>
      

        
            <label htmlFor={`desc-${memberId}`}>About</label>
            <textarea id={`desc-${memberId}`} value={teamMember.desc} onChange={e=>setTeamMember({...teamMember, desc:e.target.value})}></textarea>
      
        

        {!isLoaded ? 
        (<Loader />):
        (<div className='teamBtns'>
            <button onClick={updateTeamMember}>Update</button>
            <button className='btnDanger' onClick={delTeamMember}>Remove</button>
        </div>
        )}

        </form>
    </div>
    );

}
  
export default Cards;