import { doc, addDoc, deleteDoc, updateDoc, getDoc } from 'firebase/firestore';
import { database } from '../../chiti_firebase';
import { toast } from 'react-toastify';
import { useEffect, useState } from 'react';

import { IoPersonCircleOutline } from 'react-icons/io5';
import Loader from '../loader';

function Cards({memberId}) {

    const [isLoaded, setIsLoaded] = useState(false);

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

    const updateTeamMember =(e)=> {
        e.prevenetDefault();

    }

    return (
    <div className='cards'>
        <form className="updateTeam">
        
        <div className='formElement'>
            <label htmlFor="memeberPic" id='memberPicInput' title='Click to change the picture'>
            
            {teamMember.pic ?(<img alt="Profile Image" src={teamMember.pic}></img>)
            :(<IoPersonCircleOutline />)}
            
            </label>
            <input type={'file'} id='memberPic' ></input>
        </div>
        

        <div className='formElement'>
            <label htmlFor="memberName">Full Name</label>
            <input type={'text'} id='memberName' value={teamMember.name} onChange={e=>setTeamMember({...teamMember, name:e.target.value})}></input>
        </div>

        <div className='formElement'>
            <label htmlFor="memeberNickname">Nickname</label>
            <input type={'text'} id='memberNickname' value={teamMember.nickname} onChange={e=>setTeamMember({...teamMember, nickname:e.target.value})}></input>
        </div>

        <div className='formElement'>
            <label htmlFor="memberTitle">Title/Pos</label>
            <input type={'text'} id='memberTitle' value={teamMember.title} onChange={e=>setTeamMember({...teamMember, title:e.target.value})}></input>
        </div>

        <div className='formElement'>
            <label htmlFor="memberLink1">Primary link</label>
            <input type={'text'} id='memberLink1' value={teamMember.primaryLink} onChange={e=>setTeamMember({...teamMember, primaryLink:e.target.value})}></input>
        </div>

        <div className='formElement'>
            <label htmlFor="memberLink2">Secondary link</label>
            <input type={'text'} id='memberLink2' value={teamMember.secondaryLink} onChange={e=>setTeamMember({...teamMember, secondaryLink:e.target.value})}></input>
        </div>

        <div className='formElement'>
            <label htmlFor="memberDesc">About</label>
            <textarea id='memberDessc' value={teamMember.desc} onChange={e=>setTeamMember({...teamMember, desc:e.target.value})}></textarea>
        </div>
        

        {!isLoaded ? 
        (<p>Updating...</p>):
        (<div className='teamBtns'>
            <button onClick={updateTeamMember}>Update</button>
            <button className='btnDanger'>Remove</button>
        </div>
        )}

        </form>
    </div>
    );

}
  
export default Cards;