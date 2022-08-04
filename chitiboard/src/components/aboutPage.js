import Site_Header from "./header";
import Site_Footer from "./footer";


// the about us page component
function About() {
    return (
      <>
    <Site_Header />
    
    <div className="wrapper">
    <section id="aboutBody">
      <h1>this is About</h1>
    </section>
    </div>
    

    <Site_Footer />
    </>
    );
  }
  
  export default About;