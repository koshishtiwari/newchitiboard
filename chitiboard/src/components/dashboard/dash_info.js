
// dashboard main
function Info({user}) {
// console.log(user);
    return (
      <main className='dash-main' id='dash-info'>
        <section className='welcomeSection'>
          <h2 className="sectionHead">Welcome</h2>
          <p>Congratulations and welcome to the team! </p>
          <p>We believe that what a strong group of people can accomplish together is much larger, far greater, and will exceed what an individual can achieve alone.</p>
          <br></br>
          <p>All the things you are required to know are here.</p>

        </section>
        <section className='userSection lightOverlay'>
          <h3 className="sectionHead">User Info</h3>
          <p>You are logged in as <code>{user.displayName}</code></p>
          <p>with email : <code>{user.email}</code></p>
          <br></br>
          <p>Registered ID: <code>{user.uid}</code></p>
          <p>Last signed in: <code>{user.metadata.lastSignInTime}</code></p>
        </section>

        <section className='miscSection lightOverlay'>
          <h3 className="sectionHead">Probably useless</h3>
          <p>The information provided by [business entity name] (“we,” “us” or “our”) on [website name] (the “Site”) [and our mobile application] is for general informational purposes only. All information on the Site [and our mobile application] is provided in good faith, however we make no representation or warranty of any kind, express or implied, regarding the accuracy, adequacy, validity, reliability, availability or completeness of any information on the Site [or our mobile application].</p>
        </section>
        
      </main>
    );

  }
  
  export default Info;